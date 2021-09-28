import { Component, Input, OnInit } from '@angular/core';
import { AnimalModel } from 'src/app/shared/models/animal-model';

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.less']
})
export class AnimalListComponent implements OnInit {

  @Input()
  animals: AnimalModel[] = []

  constructor() { }

  ngOnInit(): void {}

}
