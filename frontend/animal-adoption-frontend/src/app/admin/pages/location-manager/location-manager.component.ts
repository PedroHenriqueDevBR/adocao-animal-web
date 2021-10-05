import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CityModel } from 'src/app/shared/models/city-model';
import { StateModel } from 'src/app/shared/models/state-model';

@Component({
  templateUrl: './location-manager.component.html',
  styleUrls: ['./location-manager.component.less']
})
export class LocationManagerComponent implements OnInit {
  locations: StateModel[] = [];
  selectedState?: StateModel;
  selectedCity?: CityModel;
  modalRef?: BsModalRef;

  constructor(
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.getStates();
  }

  getStates(): void {
    for (let i = 0; i < 3; i++) {
      let state = new StateModel()
      state.id = i + 1;
      state.name = `Estado ${i + 1}`;
      for (let j = 0; j < 3; j++) {
        let city = new CityModel()
        city.id = j + 1;
        city.name = `Cidade ${i * j}`;
        state.cities.push(city);
      }
      this.locations.push(state);
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  editOrCreateStateModal(template: TemplateRef<any>, stateReference?: StateModel) {
    this.selectedState = stateReference;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  editOrCreateCityModal(template: TemplateRef<any>, cityReference?: CityModel) {
    this.selectedCity = cityReference;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef?.hide();
  }
 
  decline(): void {
    this.modalRef?.hide();
  }


}
