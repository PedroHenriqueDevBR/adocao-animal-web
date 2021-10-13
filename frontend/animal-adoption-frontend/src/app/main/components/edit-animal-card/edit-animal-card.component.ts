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

  profileImage(): string {
    if (this.animal?.owner.image == null) {
      return '/assets/images/avatar.png';
    }
    return '/server' + this.animal?.owner.image;
  }

  animalImage(): string {
    if (this.animal?.all_photos.length == 0) {
      if (this.animal?.type == 'Cachorro') {
        return '/assets/images/adopt-dog.png';
      } else if (this.animal?.type == 'Gato') {
        return '/assets/images/adopt-cat.png';
      }
    }
    return '/server' + this.animal?.all_photos[0];
  }

}
