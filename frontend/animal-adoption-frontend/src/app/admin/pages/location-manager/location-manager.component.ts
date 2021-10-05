import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CityModel } from 'src/app/shared/models/city-model';
import { StateModel } from 'src/app/shared/models/state-model';
import { LocationService } from 'src/app/shared/services/location.service';

@Component({
  templateUrl: './location-manager.component.html',
  styleUrls: ['./location-manager.component.less']
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
    private toast: ToastrService,
  ) {
    this.stateForm = this.createStateForm();
    this.cityForm = this.createCityForm();
  }

  ngOnInit(): void {
    this.getStates();
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

  getStates(): void {
    this.locationService.getLocations().subscribe(
      (data: StateModel[]) => {
        this.locations = data;
      },
      error => {
        if (error.status >= 500) {
          this.toast.error('Servidor indisponível');
        } else {
          this.toast.error('Erro interno');
          console.log(error);
        }
      }
    );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  editOrCreateStateModal(template: TemplateRef<any>, stateReference?: StateModel) {
    this.selectedState = stateReference;
    this.stateForm.get('name')?.setValue(stateReference?.name);
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  editOrCreateCityModal(template: TemplateRef<any>, cityReference?: CityModel) {
    this.selectedCity = cityReference;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  createOrUpdateState(){
    const name = this.stateForm.get('name')?.value!;
    if (this.selectedState != null) {
      this.toast.warning('Não implementado');
      // TODO: update state
    } else {
      const state = new StateModel()
      state.name = name;
      this.locationService.createState(state).subscribe(
        (data: StateModel) => {
          this.toast.success('Estado criado com sucesso!');
          this.locations.push(data);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  confirm(): void {
    this.modalRef?.hide();
  }
 
  decline(): void {
    this.modalRef?.hide();
  }


}
