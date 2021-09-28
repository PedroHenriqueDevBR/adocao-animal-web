import { Component, OnInit } from '@angular/core';
import { AnimalModel } from 'src/app/shared/models/animal-model';

@Component({
  selector: 'app-animals-for-adoption',
  templateUrl: './animals-for-adoption.component.html',
  styleUrls: ['./animals-for-adoption.component.less']
})
export class AnimalsForAdoptionComponent implements OnInit {

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
