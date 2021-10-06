import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CityModel } from 'src/app/shared/models/city-model';
import { StateModel } from 'src/app/shared/models/state-model';
import { LocationService } from 'src/app/shared/services/location.service';

@Component({
  templateUrl: './location-manager.component.html',
  styleUrls: ['./location-manager.component.less'],
})
export class LocationManagerComponent implements OnInit {
  locations: StateModel[] = [];
  selectedState?: StateModel;
  selectedCity?: CityModel;
  modalRef?: BsModalRef;
  stateForm: FormGroup;
  cityForm: FormGroup;

  constructor(
    private modalService: BsModalService,
    private locationService: LocationService,
    private toast: ToastrService
  ) {
    this.stateForm = this.createStateForm();
    this.cityForm = this.createCityForm();
  }

  ngOnInit(): void {
    this.getLocations();
  }

  createStateForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
  }

  createCityForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      state: new FormControl(0, [Validators.required]),
    });
  }

  getLocations(): void {
    this.locationService.getLocations().subscribe(
      (data: StateModel[]) => {
        this.locations = data;
      },
      (error) => {
        if (error.status >= 500) {
          this.toast.error('Servidor indisponível');
        } else {
          this.toast.error('Erro interno');
          console.log(error);
        }
      }
    );
  }

  stateEditModal(template: TemplateRef<any>, stateReference?: StateModel) {
    this.selectedState = stateReference;
    this.stateForm.get('name')?.setValue(stateReference?.name);
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  cityEditModal(
    template: TemplateRef<any>,
    cityReference?: CityModel,
    stateReferenceID?: number
  ) {
    this.cityForm.get('state')?.setValue(stateReferenceID);
    if (cityReference != null) {
      this.cityForm.get('name')?.setValue(cityReference!.name);
    } else {
      this.cityForm.get('name')?.setValue('');
    }
    this.selectedCity = cityReference;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  stateDeleteConfirmModal(template: TemplateRef<any>, state: StateModel) {
    this.selectedState = state;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  cityDeleteConfirmModal(template: TemplateRef<any>, city: CityModel) {
    this.selectedCity = city;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  stateUpdate() {
    const name = this.stateForm.get('name')?.value!;
    if (this.selectedState != null) {
      const stateUpdate = this.selectedState!;
      stateUpdate.name = name;
      this.locationService.modifyState(stateUpdate).subscribe(
        (data) => this.toast.success('Dados atualizados!'),
        (errors) => this.verifyStatusError(errors)
      );
    } else {
      const state = new StateModel();
      state.name = name;
      this.locationService.createState(state).subscribe(
        (data: StateModel) => {
          this.toast.success('Estado criado com sucesso!');
          this.locations.push(data);
        },
        (errors) => this.verifyStatusError(errors)
      );
    }
    this.decline();
  }

  cityUpdate() {
    const name = this.cityForm.get('name')?.value!;
    const state = this.cityForm.get('state')?.value!;
    if (this.selectedCity != null) {
      const cityUpdate = this.selectedCity!;
      cityUpdate.name = name;
      cityUpdate.state = state;
      this.locationService.modifyCity(cityUpdate).subscribe(
        (data: CityModel) => {
          this.toast.success('Dados atualizados!');
          this.getLocations();
        },
        (errors) => this.verifyStatusError(errors)
      );
    } else {
      const city = new CityModel();
      city.name = name;
      city.state = state;
      this.locationService.createCity(city).subscribe(
        (data: CityModel) => {
          this.toast.success('Cidade criada com sucesso!');
          const stateIndex = this.locations.findIndex((el) => el.id == state);
          this.locations[stateIndex].cities.push(data);
        },
        (errors) => this.verifyStatusError(errors)
      );
    }
    this.decline();
  }

  deleteState() {
    if (this.selectedState != undefined) {
      this.locationService.deleteState(this.selectedState).subscribe(
        (data) => {
          this.toast.success('Estado deletado');
          this.getLocations();
        },
        (errors) => this.verifyStatusError(errors)
      );
    }
    this.decline();
  }

  deleteCity() {
    if (this.selectedCity != undefined) {
      this.locationService.deleteCity(this.selectedCity).subscribe(
        (data) => {
          this.toast.success('Cidade deletada');
          this.getLocations();
        },
        (errors) => this.verifyStatusError(errors)
      );
    }
    this.decline();
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

  decline(): void {
    this.selectedState = undefined;
    this.selectedCity = undefined;
    this.modalRef?.hide();
  }
}
