import { Component, Input, OnInit } from '@angular/core';
import { AnimalModel } from 'src/app/shared/models/animal-model';

@Component({
  selector: 'app-animal-card',
  templateUrl: './animal-card.component.html',
  styleUrls: ['./animal-card.component.less']
})
export class AnimalCardComponent implements OnInit {

  @Input()
  animal: AnimalModel | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  

}
