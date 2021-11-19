import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AnimalTypeModel } from 'src/app/shared/models/animal-type-model';
import { CityModel } from 'src/app/shared/models/city-model';
import { AnimalService } from 'src/app/shared/services/animal.service';
import { LocationService } from 'src/app/shared/services/location.service';

@Component({
  selector: 'app-animal-filter',
  templateUrl: './animal-filter.component.html',
  styleUrls: ['./animal-filter.component.less']
})
export class AnimalFilterComponent implements OnInit {

  types: Array<AnimalTypeModel> = [];
  selectedType: AnimalTypeModel | undefined;
  selectedSex: String | undefined;
  
  @Output() addPropEmiter = new EventEmitter();
  @Output() removePropEmiter = new EventEmitter();
  @Output() searchButton = new EventEmitter();

  selected?: string;
  cities: CityModel[] = [];

  get citiesStr(): String[] {
    return this.cities.map(value => value.name);
  }

  constructor(
    private animalService: AnimalService,
    private locationService: LocationService,
    private toast: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getTypes();
    this.getCities();
  }

  selectLocation() {
    let responses = this.cities.filter(e => e.name == this.selected!);
    let city = undefined;
    if (responses.length > 0) {
      city = responses[0];
      this.addPropEmiter.emit({key: 'city', value: city.id});
    }
  }

  selectType(typeModel?: AnimalTypeModel) {
    this.selectedType = typeModel;
    if (typeModel == undefined) {
      this.removePropEmiter.emit('type');
    } else {
      this.addPropEmiter.emit({key: 'type', value: typeModel.id});
    }
  }

  selectSex(sex?: String) {
    this.selectedSex = sex;
    if (sex == undefined) {
      this.removePropEmiter.emit('sex');
    } else {
      this.addPropEmiter.emit({key: 'sex', value: sex});
    }
  }

  search() {
    this.selectLocation();
    this.searchButton.emit(true);
  }

  getCities() {
    this.locationService.getCities().subscribe(
      (data: CityModel[]) => this.cities = data,
      error => this.verifyStatusError(error),
    );
  }

  getTypes() {
    this.animalService.getAnimalTypes().subscribe(
      (data: AnimalTypeModel[]) => this.types = data,
      error => this.verifyStatusError(error),
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
      this.toast.error("Sem permissão");
    } else {
      this.toast.error('Erro interno');
      console.log(errors);
    }
  }

}
