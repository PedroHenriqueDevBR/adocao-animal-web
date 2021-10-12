import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AnimalModel } from 'src/app/shared/models/animal-model';

@Component({
  templateUrl: './my-animals.component.html',
  styleUrls: ['./my-animals.component.less']
})
export class MyAnimalsComponent implements OnInit {
  animals: AnimalModel[] = []
  modalRef?: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private toast: ToastrService
  ) { }

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

  animalEditModal(template: TemplateRef<any>, animalReference?: AnimalModel) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  decline(): void {
    this.modalRef?.hide();
  }

}
