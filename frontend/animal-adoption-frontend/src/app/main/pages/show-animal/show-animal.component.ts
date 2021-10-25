import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimalModel } from 'src/app/shared/models/animal-model';

@Component({
  templateUrl: './show-animal.component.html',
  styleUrls: ['./show-animal.component.less']
})
export class ShowAnimalComponent implements OnInit {

  @Input() animal: AnimalModel | undefined;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap.get('id'));
  }

}
