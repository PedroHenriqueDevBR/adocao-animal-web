import { Component, Input, OnInit } from '@angular/core';
import { AnimalModel } from 'src/app/shared/models/animal-model';

@Component({
  selector: 'app-edit-animal-card',
  templateUrl: './edit-animal-card.component.html',
  styleUrls: ['./edit-animal-card.component.less']
})
export class EditAnimalCardComponent implements OnInit {
  @Input()
  animal: AnimalModel | undefined;

  constructor() { }

  ngOnInit(): void {}

}
