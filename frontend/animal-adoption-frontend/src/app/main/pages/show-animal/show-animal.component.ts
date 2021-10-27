import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AnimalModel } from 'src/app/shared/models/animal-model';
import { AnimalService } from 'src/app/shared/services/animal.service';

@Component({
  templateUrl: './show-animal.component.html',
  styleUrls: ['./show-animal.component.less']
})
export class ShowAnimalComponent implements OnInit {

  @Input() animal: AnimalModel | undefined;
  animalShow: AnimalModel = new AnimalModel();
  modalRef?: BsModalRef;
  selectedPhoto: string = '';

  constructor(
    private route: ActivatedRoute,
    private routerService: Router,
    private animalService: AnimalService,
    private toast: ToastrService,
    private modalService: BsModalService,
  ) {
  }
  
  ngOnInit(): void {
    if (this.animal == undefined) {
      const id = this.route.snapshot.paramMap.get('id');
      if (id != null && isNaN(Number.parseInt(id)) == false) {
        const animalId = Number.parseInt(id);
        this.getAnimalFromDatabase(animalId);
      } else {
        this.notFoundRedirect();
      }
    } else {
      this.animalShow = this.animal;
    }
  }

  getAnimalFromDatabase(id: number) {
    this.animalService.getAimalsByID(id).subscribe(
      (data: AnimalModel) => {
        this.animalShow = data;
      },
      error => this.verifyStatusError(error),
    );
  }

  animalImage(): string {
    if (this.animalShow!.all_photos.length == 0) {
      if (this.animalShow?.type == 'Cachorro') {
        return '/assets/images/adopt-dog.png';
      } else if (this.animalShow?.type == 'Gato') {
        return '/assets/images/adopt-cat.png';
      } else {
        return '/assets/images/cat-dog.png';
      }
    }
    return '/server' + this.animalShow!.all_photos[0].photo;
  }

  notFoundRedirect() {
    this.routerService.navigateByUrl('/app');
  }

  serverPhoto(photo: string): string {
    return `/server${photo}`;
  }

  showAnimal(photo: string, template: TemplateRef<any>) {
    this.selectedPhoto = this.serverPhoto(photo);
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  decline(): void {
    this.modalRef?.hide();
  }

  verifyStatusError(errors: any) {
    if (errors.status >= 500) {
      this.toast.error('Servidor indisponível');
    } else if (errors.status == 404) {
      this.notFoundRedirect();
    } else if (errors.status == 406) {
      if (errors.error.errors) {
        for (let error of errors.error.errors) {
          this.toast.error(error);
        }
      }
    } else if (errors.status == 403) {
      this.toast.error('Sem permissão');
    } else {
      this.toast.error('Erro interno');
      console.log(errors);
    }
  }

}
