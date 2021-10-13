import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AnimalModel } from 'src/app/shared/models/animal-model';
import { AnimalService } from 'src/app/shared/services/animal.service';

@Component({
  templateUrl: './my-animals.component.html',
  styleUrls: ['./my-animals.component.less']
})
export class MyAnimalsComponent implements OnInit {
  animals: AnimalModel[] = []
  modalRef?: BsModalRef;

  constructor(
    private animalService: AnimalService,
    private modalService: BsModalService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAnimals();
  }

  getAnimals(): void {
    this.animalService.getMyAnimals().subscribe(
      (data: AnimalModel[]) => {
        this.animals = data;
      },
      error => this.verifyStatusError(error),
    );
  }

  verifyStatusError(errors: any) {
    if (errors.status >= 500) {
      this.toast.error('Servidor indisponível');
    } else if (errors.status == 406) {
      if (errors.error.errors) {
        for (let error of errors.error.errors) {
          this.toast.error(error);
        }
      }
    } else if (errors.status == 403) {
      this.toast.error("Sem permissão");
    } else {
      this.toast.error('Erro interno');
      console.log(errors);
    }
  }

  animalEditModal(template: TemplateRef<any>, animalReference?: AnimalModel) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  decline(): void {
    this.modalRef?.hide();
  }

}
