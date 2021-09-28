import { Component, OnInit } from '@angular/core';
import { AnimalModel } from 'src/app/shared/models/animal-model';

@Component({
  selector: 'app-location-animals',
  templateUrl: './location-animals.component.html',
  styleUrls: ['./location-animals.component.less']
})
export class LocationAnimalsComponent implements OnInit {

  animals: AnimalModel[] = []

  constructor() { }

  ngOnInit(): void {
    this.getAnimals();
  }

  getAnimals(): void {
    for (let i = 0; i < 20; i++) {
      const animal = new AnimalModel();
      animal.name = `Animal ${i+1}`;
      animal.breed = 'Vira-lata';
      animal.age = 1;
      this.animals.push(animal);
    }
  }

}
