import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AnimalModel } from 'src/app/shared/models/animal-model';
import { AnimalService } from 'src/app/shared/services/animal.service';

@Component({
  selector: 'app-animals-for-adoption',
  templateUrl: './animals-for-adoption.component.html',
  styleUrls: ['./animals-for-adoption.component.less'],
})
export class AnimalsForAdoptionComponent implements OnInit {
  animals: AnimalModel[] = [];
  filterProps: Record<string, any> = {};

  constructor(
    private animalService: AnimalService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllAnimals();
  }

  getAllAnimals(): void {
    this.animalService.getAllAimalsForAdoption().subscribe(
      (data: AnimalModel[]) => {
        this.animals = data;
      },
      (error) => this.verifyStatusError(error)
    );
  }

  getAnimalsByFilters(): void {
    this.animalService.filterAnimals(this.filterProps).subscribe(
      (data: AnimalModel[]) => {
        this.animals = data;
      },
      (error) => this.verifyStatusError(error)
    );
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
      this.toast.error('Sem permissão');
    } else {
      this.toast.error('Erro interno');
      console.log(errors);
    }
  }

  hasFilter(): boolean {
    return Object.keys(this.filterProps).length > 0;
  }

  addFilterProp(data: any) {
    this.filterProps[data.key] = data.value;
    console.log(this.filterProps);
  }
  
  removerFilterProp(keyProp: string) {
    delete this.filterProps[keyProp];
    console.log(this.filterProps);
  }

  applyFilters() {
    if (this.hasFilter()) {
      this.getAnimalsByFilters();
    } else {
      this.getAllAnimals();
    }
  }
}
