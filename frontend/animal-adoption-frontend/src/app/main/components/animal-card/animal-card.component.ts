import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AnimalModel } from 'src/app/shared/models/animal-model';

@Component({
  selector: 'app-animal-card',
  templateUrl: './animal-card.component.html',
  styleUrls: ['./animal-card.component.less']
})
export class AnimalCardComponent implements OnInit {

  @Input() animal: AnimalModel | undefined;
  @Input() showButton: boolean = false;
  @Output() ownerEmitter = new EventEmitter();

  constructor() { }

  ngOnInit(): void {}

  profileImage(): string {
    if (this.animal?.owner.image == null) {
      return '/assets/images/avatar.png';
    }
    return '/server' + this.animal?.owner.image;
  }

  animalImage(): string {
    if (this.animal!.all_photos.length == 0) {
      if (this.animal?.type == 'Cachorro') {
        return '/assets/images/adopt-dog.png';
      } else if (this.animal?.type == 'Gato') {
        return '/assets/images/adopt-cat.png';
      }
    }
    return '/server' + this.animal!.all_photos[0].photo;
  }

  showAnimalString(): string {
    return `/app/detalhes/${this.animal!.id}`;
  }

  selectOwner(): void {
    this.ownerEmitter.emit(this.animal?.owner.username);
  }
}
