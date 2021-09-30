import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CityModel } from 'src/app/shared/models/city-model';
import { PersonModel } from 'src/app/shared/models/person-model';
import { StateModel } from 'src/app/shared/models/state-model';

@Component({
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.less']
})
export class AdminPageComponent implements OnInit {
  locations: StateModel[] = [];
  selectedLocation?: StateModel;
  persons: PersonModel[] = [];
  selectedPerson?: PersonModel;
  modalRef?: BsModalRef;

  constructor(
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.getPersons();
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

  getPersons(): void {
    for (let i = 0; i < 10; i++) {
      const person = new PersonModel();
      person.id = i + 1;
      person.name = `Person ${i + 1}`;
      person.username = `username${i + 1}`;
      person.contact = '(86) 91234-5678';
      person.image = 'https://images.pexels.com/photos/3569409/pexels-photo-3569409.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';
      this.persons.push(person);
    }
  }

  profileImage(): string {
    if (this.selectedPerson == null) {
      return '/assets/images/avatar.png';
    } else if (this.selectedPerson.image == null || this.selectedPerson.image == '') {
      return '/assets/images/avatar.png';
    }
    return this.selectedPerson.image;
  }

  selectPerson(person: PersonModel) {
    this.selectedPerson = person;
  }

  changeBlockPerson() {
    if (this.selectedPerson != null) {
      this.selectedPerson.isActive = !this.selectedPerson.isActive;
    }
  }

  changeModeratorPerson() {
    if (this.selectedPerson != null) {
      this.selectedPerson.isModerator = !this.selectedPerson.isModerator;
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' }),
    );
  }

  selectState(state: StateModel) {
    this.selectedLocation = state;
  }
}
