import { state } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CityModel } from 'src/app/shared/models/city-model';
import { PersonModel } from 'src/app/shared/models/person-model';
import { StateModel } from 'src/app/shared/models/state-model';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.less']
})
export class PersonListComponent implements OnInit {

  locations: StateModel[] = [];
  selectedLocation?: StateModel;
  allPersons: PersonModel[] = [];
  @Input() persons: PersonModel[] = [];
  @Output() personEmit = new EventEmitter();

  search: string = '';

  constructor() { }

  ngOnInit(): void {
    this.allPersons = this.persons.slice();
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

  selectPerson(person: PersonModel) {
    this.personEmit.emit(person);
  }

  profileImage(person: PersonModel) {
    if (person == null) {
      return '/assets/images/avatar.png';
    } else if (person.image == null || person.image == '') {
      return '/assets/images/avatar.png';
    }
    return person.image;
  }

  searchKeyword(keyword: string): void {
    if (keyword == '') {
      this.persons = this.allPersons.slice();
    } else {
      this.persons = this.allPersons.filter(el => el.name.includes(keyword));
    }
  }

  selectState(event: any) {
    const id = event.target.value;
    let stateIndex = this.locations.findIndex(el => el.id == id);
    if (stateIndex == -1) {
      this.selectedLocation = undefined;
      return;
    }
    this.selectedLocation = this.locations[stateIndex];

  }

}
