import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AnimalModel } from 'src/app/shared/models/animal-model';
import { PhotoModel } from 'src/app/shared/models/photo-model';
import { AnimalService } from 'src/app/shared/services/animal.service';

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
  selectedPhoto: PhotoModel | undefined;

  @Input()
  animal: AnimalModel | undefined;

  @Output()
  editAnimal = new EventEmitter();

  @Output()
  deleteAnimal = new EventEmitter();

  constructor(
    private modalService: BsModalService,
    private toast: ToastrService,
    private animalService: AnimalService,
  ) { }

  ngOnInit(): void {}

  profileImage(): string {
    if (this.animal?.owner.image == null) {
      return '/assets/images/avatar.png';
    }
    return '/server' + this.animal?.owner.image;
  }

  formatImage(image: string): string {
    return '/server' + image; 
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

  deleteEmit() {
    this.deleteAnimal.emit(true);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { id: 1, class: 'modal-lg modal-dialog modal-dialog-scrollable' });
  }

  openImageModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { id: 2, class: 'modal-lg modal-dialog modal-dialog-scrollable' });
  }

  decline(): void {
    this.modalRef?.hide();
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
