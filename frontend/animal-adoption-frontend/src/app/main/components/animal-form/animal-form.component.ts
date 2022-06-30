import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AnimalModel } from 'src/app/shared/models/animal-model';
import { AnimalTypeModel } from 'src/app/shared/models/animal-type-model';
import { AnimalService } from 'src/app/shared/services/animal.service';

@Component({
  selector: 'app-animal-form',
  templateUrl: './animal-form.component.html',
  styleUrls: ['./animal-form.component.less']
})
export class AnimalFormComponent implements OnInit {

  formAnimal: FormGroup;
  animalFormData: AnimalModel = new AnimalModel();
  animal_types: AnimalTypeModel[] = [];

  @Input()
  animal: AnimalModel | undefined;

  @Output()
  animalOutput = new EventEmitter();

  constructor(
    private toast: ToastrService,
    private animalService: AnimalService,
  ) {
    this.formAnimal = this.createFormRegisterAnimal();
  }

  ngOnInit(): void {
    this.getAnimalTypes();
  }

  setAnimalData() {
    if (this.animal != undefined) {
      this.formAnimal.get('name')?.setValue(this.animal.name);
      this.formAnimal.get('breed')?.setValue(this.animal.breed);
      this.formAnimal.get('age')?.setValue(this.animal.age);
      this.formAnimal.get('sex')?.setValue(this.animal.sex);

      for (const type of this.animal_types) {
        if (type.name == this.animal.animal_type.name) {
          this.formAnimal.get('animal_type')?.setValue(type.id);
          break;
        }
      }
    }
  }

  createFormRegisterAnimal(): FormGroup {
    return new FormGroup({
      name: new FormControl(this.animalFormData.name, [Validators.required, Validators.minLength(3)],),
      breed: new FormControl(this.animalFormData.breed, [Validators.required]),
      age: new FormControl(this.animalFormData.age, [Validators.required]),
      sex: new FormControl(this.animalFormData.sex, [Validators.required]),
      animal_type: new FormControl(this.animalFormData.animal_type, [Validators.required]),
    });
  }

  getAnimalTypes() {
    this.animalService.getAnimalTypes().subscribe(
      (data: AnimalTypeModel[]) => {
        this.animal_types = data;
        this.setAnimalData();
      },
      error => this.verifyStatusError(error),
    );
  }

  get formIsValid(): boolean {
    return this.formAnimal.valid;
  }

  submit() {
    const name = this.formAnimal.get('name')?.value;
    const breed = this.formAnimal.get('breed')?.value;
    const age = this.formAnimal.get('age')?.value;
    const sex = this.formAnimal.get('sex')?.value;
    const animal_type = this.formAnimal.get('animal_type')?.value;

    const animal: AnimalModel = new AnimalModel();
    animal.name = name;
    animal.breed = breed;
    animal.age = age;
    animal.sex = sex;
    animal.animal_type = animal_type;

    if (this.animal == undefined) {
      this.animalService.createAnimal(animal).subscribe(
        (data: AnimalModel) => {
          this.toast.success('Animal registrado');
          this.animalOutput.emit(data);
        },
        error => this.verifyStatusError(error),
      )
    } else {
      animal.id = this.animal.id;
      this.animalService.updateAnimal(animal).subscribe(
        (data: AnimalModel) => {
          this.toast.success('Dados atualizados');
          this.animalOutput.emit(data);
        },
        error => this.verifyStatusError(error),
      )
    }

  }

  verifyStatusError(errors: any) {
    if (errors.status >= 500) {
      this.toast.error('Servidor indisponível');
    } else if (errors.status == 406) {
      if (errors.error.errors) {
        for (let error of errors.error.errors) {
          this.toast.error(error);
        }
      }
    } else if (errors.status == 403) {
      this.toast.error("Sem permissão");
    } else {
      this.toast.error('Erro interno');
    }
  }

}
