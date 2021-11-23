import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AdoptionReceivedModel } from 'src/app/shared/models/adoption-received-model';
import { AnimalModel } from 'src/app/shared/models/animal-model';
import { PhotoModel } from 'src/app/shared/models/photo-model';
import { VaccineModel } from 'src/app/shared/models/vaccine-model';
import { AdoptionService } from 'src/app/shared/services/adoption.service';
import { AnimalService } from 'src/app/shared/services/animal.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-animal-card',
  templateUrl: './edit-animal-card.component.html',
  styleUrls: ['./edit-animal-card.component.less']
})
export class EditAnimalCardComponent implements OnInit {
  modalRef?: BsModalRef;
  imageSrc: string = '/assets/images/cat-dog.png';
  file: any;
  photoModel: PhotoModel = new PhotoModel;
  selectedVaccine: VaccineModel | undefined;

  @Input()
  animal: AnimalModel | undefined;

  @Output()
  editAnimal = new EventEmitter();

  @Output()
  deleteAnimal = new EventEmitter();

  @Output()
  blockAnimal = new EventEmitter();

  adoptionRequests: Array<AdoptionReceivedModel> = [];

  constructor(
    private modalService: BsModalService,
    private toast: ToastrService,
    private animalService: AnimalService,
    private adoptionService: AdoptionService,
  ) { }

  ngOnInit(): void {
    this.getAdoptionRequests();
  }

  profileImage(): string {
    if (this.animal?.owner.image == null) {
      return '/assets/images/avatar.png';
    }
    return `${environment.API}` + this.animal?.owner.image;
  }

  getAdoptionRequests() {
    this.adoptionService.getAdoptionsFromAnimal(this.animal!).subscribe(
      (data: Array<AdoptionReceivedModel>) => {
        this.adoptionRequests = data;
      }, 
      error => this.verifyStatusError(error),
    );
  }

  formatImage(image: string): string {
    return `${environment.API}` + image; 
  }

  animalImage(): string {
    if (this.animal!.all_photos.length == 0) {
      if (this.animal?.type == 'Cachorro') {
        return '/assets/images/adopt-dog.png';
      } else if (this.animal?.type == 'Gato') {
        return '/assets/images/adopt-cat.png';
      }
    }
    return `${environment.API}` + this.animal!.all_photos[0].photo;
  }

  get imageIsValid(): boolean {
    if (this.imageSrc.includes('/assets')) return false;
    return true;
  }

  updateImage(event: any): void {
    if (event === undefined) return;
    if (event.target === undefined) return;
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.type.match(/image\/*/) == null) {
        this.toast.warning('Upload somente de imagens');
        return;
      } else if (file.size > 2000000) {
        this.toast.warning('O limite da imagem deve ser de 2 Megasbytes');
        return;
      }
      this.file = event;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = e => this.imageSrc = reader.result as string;
    }
  }

  confirmImageChange() {
    if (this.file.target.files && this.file.target.files[0]) {
      let form = new FormData();
      form.append('photo', this.file.target.files[0]);
      form.append('animal', this.animal!.id!.toString());
      this.animalService.addImage(form).subscribe(
        (data: PhotoModel) => {
          this.animal?.all_photos.push(data);
          this.toast.success('Imagem adicionada');
          this.decline();
        },
        error => this.verifyStatusError(error),
      );
    }
  }

  removeImage(photo: PhotoModel) {
    this.animalService.removeImage(photo).subscribe(
      data => {
        const photoIndex = this.animal!.all_photos.indexOf(photo);
        this.animal!.all_photos.splice(photoIndex, 1);
      }
    );
  }

  editEmit() {
    this.editAnimal.emit(true);
  }

  blockEmit() {
    this.blockAnimal.emit(true);
  }

  deleteEmit() {
    this.deleteAnimal.emit(true);
  }

  confirmAdoptionRequest(adoption: AdoptionReceivedModel) {
    if (this.animal != undefined){
      if (this.animal.adopted) {
        this.toast.warning('Animal já adotado');
      } else {
        this.adoptionService.acceptAdoptionRequest(this.animal, adoption).subscribe(
          data => {
            this.animal!.adopted = true;
            adoption.is_acepted = true;
            this.toast.success('Solicitação aceita')
          },
          error => this.verifyStatusError(error),
        );
      }
    }
  }

  rejectAdoptionRequest(adoption: AdoptionReceivedModel) {
    if (this.animal != undefined){
      if (this.animal.adopted) {
        this.toast.warning('Animal já adotado');
      } else {
        this.adoptionService.rejectAdoptionRequest(this.animal, adoption).subscribe(
          data => {
            this.animal!.adopted = false;
            adoption.is_acepted = false;
            this.toast.success('Solicitação rejeitada')
          },
          error => this.verifyStatusError(error),
        );
      }
    }
  }

  deleteAdoptionRequest(adoption: AdoptionReceivedModel) {
    if (this.animal != undefined){
      this.adoptionService.deleteAdoptionRequest(this.animal, adoption).subscribe(
        data => {
          if (adoption.is_acepted == true) this.animal!.adopted = false;
          const adoptionIndex = this.adoptionRequests.indexOf(adoption);
          this.adoptionRequests.splice(adoptionIndex, 1);
          this.toast.success('Solicitação deletada');
        },
        error => this.verifyStatusError(error),
      );
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { id: 1, class: 'modal-lg modal-dialog modal-dialog-scrollable' });
  }

  openModalConfirmDeleteVaccine(template: TemplateRef<any>, vaccine: VaccineModel) {
    this.selectedVaccine = vaccine;
    this.modalRef = this.modalService.show(template, { id: 1, class: 'modal-sm modal-dialog modal-dialog-scrollable' });
  }

  openImageModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { id: 2, class: 'modal-lg modal-dialog modal-dialog-scrollable' });
  }

  decline(): void {
    this.modalRef?.hide();
    this.selectedVaccine = undefined;
  }

  showAdoptButtons(adoption: AdoptionReceivedModel) {
    return this.animal?.adopted == false && adoption.is_acepted == undefined;
  }

  showDeleteAdoptButton(adoption: AdoptionReceivedModel) {
    return adoption.is_acepted != undefined;
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
    }
  }

}
