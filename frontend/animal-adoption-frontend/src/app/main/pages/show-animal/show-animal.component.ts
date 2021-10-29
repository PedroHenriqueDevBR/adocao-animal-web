import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AdoptionReceivedModel } from 'src/app/shared/models/adoption-received-model';
import { AnimalModel } from 'src/app/shared/models/animal-model';
import { AccountService } from 'src/app/shared/services/account.service';
import { AdoptionService } from 'src/app/shared/services/adoption.service';
import { AnimalService } from 'src/app/shared/services/animal.service';
import { LocalstorageService } from 'src/app/shared/services/localstorage.service';

@Component({
  templateUrl: './show-animal.component.html',
  styleUrls: ['./show-animal.component.less']
})
export class ShowAnimalComponent implements OnInit {

  @Input() animal: AnimalModel | undefined;
  animalShow: AnimalModel = new AnimalModel();
  modalRef?: BsModalRef;
  selectedPhoto: string = '';
  loggedPerson: boolean = false;
  adotionRequestCreated: AdoptionReceivedModel | undefined;

  constructor(
    private route: ActivatedRoute,
    private routerService: Router,
    private storage: LocalstorageService,
    private animalService: AnimalService,
    private adoptionService: AdoptionService,
    private toast: ToastrService,
    private modalService: BsModalService,
  ) {}
  
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
      this.verifyLoggedPerson();
    }
  }

  getAnimalFromDatabase(id: number) {
    this.animalService.getAimalsByID(id).subscribe(
      (data: AnimalModel) => {
        this.animalShow = data;
        this.verifyLoggedPerson();
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

  verifyLoggedPerson() {
    if (this.storage.userIsLogged()) {
      this.loggedPerson = true;
      this.verifyAdoptionRequestCreated();
    }
  }

  verifyAdoptionRequestCreated() {
    this.adoptionService.loggedPersonAdoptionsCreated().subscribe(
      (data: AdoptionReceivedModel[]) => {
       for (const adoptionRequest of data)  {
         console.log(`${adoptionRequest.animal} == ${this.animalShow.id}`);
         if (adoptionRequest.animal == this.animalShow.id) {
           this.adotionRequestCreated = adoptionRequest;
           break;
         }
       }
      },
      error => this.verifyStatusError(error),
    );
  }

  requestAdoption() {
    if (!this.loggedPerson) {
      this.routerService.navigateByUrl('/account/login');
      return;
    }
    this.adoptionService.createAdoptionRequest(this.animalShow).subscribe(
      (data: AdoptionReceivedModel) => {
        this.adotionRequestCreated = data;
        this.toast.success('Solicitação enviada');
      },
      error => this.verifyStatusError(error),
    );
  }

  cancelAdoption() {
    this.adoptionService.deleteAdoptionRequest(this.animalShow, this.adotionRequestCreated!).subscribe(
      data => {
        this.adotionRequestCreated = undefined;
        this.toast.success('Solicitação cancelada');
      },
      error => this.verifyStatusError(error),
    );
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
