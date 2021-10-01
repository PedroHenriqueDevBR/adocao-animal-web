import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { PersonModel } from 'src/app/shared/models/person-model';
import { StateModel } from 'src/app/shared/models/state-model';
import { AccountService } from 'src/app/shared/services/account.service';
import { LocalstorageService } from 'src/app/shared/services/localstorage.service';
import { LocationService } from 'src/app/shared/services/location.service';

@Component({
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.less']
})
export class ProfilePageComponent implements OnInit {
  modalRef?: BsModalRef;
  imageSrc: string = '/assets/images/avatar.png';
  file: any;
  person: PersonModel = new PersonModel();
  formPerson: FormGroup;
  locations: StateModel[] = [];
  selectedState: StateModel = new StateModel();

  constructor(
    private modalService: BsModalService,
    private router: Router,
    private storage: LocalstorageService,
    private accountService: AccountService,
    private locationService: LocationService,
    private toast: ToastrService,
  ) {
    this.getLocations();
    this.getPersonData();
    this.formPerson = this.createFormPersonData();
  }

  ngOnInit(): void {
    this.verifyLogedUser();
  }

  verifyLogedUser(): void {
    if (!this.storage.userIsLogged()) {
      this.router.navigateByUrl('/account/login');
      return;
    }
    this.getPersonData();
  }

  getLocations() {
    this.locationService.getLocations().subscribe(
      (data: StateModel[]) => {
        this.locations = data;
        if (data.length > 0) this.selectedState = data[0];
      },
      errors => {
        if (errors.status > 500) {
          this.toast.error('Erro ao carregar as localizações');
          this.toast.error('Servidor indisponível');
        } else {
          this.toast.error('Erro interno');
        }
      }
    );
  }

  getPersonData() {
    this.accountService.getLoggedPersonData().subscribe(
      (data: PersonModel) => {
        this.person = data;
      },
      errors => {
        if (errors.status >= 500) {
          this.toast.error('Servidor indisponível')
        } else {
          this.toast.error('Erro ao carregar os dados')
        }
      }
    );
  }

  createFormPersonData(): FormGroup {
    return new FormGroup({
      name: new FormControl(this.person.username, [Validators.required, Validators.minLength(3)]),
      username: new FormControl(this.person.username, [Validators.required, Validators.minLength(5)]),
      contact: new FormControl(this.person.contact, [Validators.required, Validators.minLength(11)]),
      password: new FormControl(this.person.password, [Validators.required, Validators.minLength(8)]),
      repeatPassword: new FormControl(this.person.password, [Validators.required, Validators.minLength(8)]),
      cityId: new FormControl(this.person.cityId, [Validators.required]),
    });
  }

  get formIsValid(): boolean {
    return this.formPerson.valid;
  }

  get imageIsValid(): boolean {
    if (this.imageSrc.includes('/assets')) return false;
    return true;
  }

  get getProfileImage() {
    if (this.person.image == null || this.person.image == '') {
      return '/assets/images/avatar.png';
    }
    return `/server${this.person.image}`;
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template)
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
      form.append('image', this.file.target.files[0]);
      this.accountService.updateImage(form).subscribe(
        (data: PersonModel) => {
          this.toast.success('Imagem atualizada');
          this.person.image = data.image;
          this.modalRef?.hide();
        },
        errors => {
          if (errors.status >= 500) this.toast.error('Servidor indisponível');
          console.log(errors);
        }
      );
    }
  }

  removerImage() {
    if (this.person.image != null) {
      this.accountService.removeImage().subscribe(
        data => {
          this.toast.success('Imagem removida');
          this.person.image = '';
          this.modalRef?.hide();
        },
        errors => {
          if (errors.status >= 500) {
            this.toast.error('Servidor indiponível');
          } else {
            this.toast.error('Erro interno');
          }
          this.modalRef?.hide();
        }
      );
    }
  }

  // TODO: implement
  updateProfileData(){

  }

}
