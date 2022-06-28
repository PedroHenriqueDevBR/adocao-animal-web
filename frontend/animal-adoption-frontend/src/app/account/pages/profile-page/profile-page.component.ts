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
import { environment } from 'src/environments/environment';

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
  selectedCityID: number = 0;

  constructor(
    private modalService: BsModalService,
    private router: Router,
    private storage: LocalstorageService,
    private accountService: AccountService,
    private locationService: LocationService,
    private toast: ToastrService,
  ) {
    this.verifyLogedUser();
    this.formPerson = this.createFormPersonData();
  }

  ngOnInit() {
    this.getCurrentLocation();
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          this.accountService.updateLocation({
            "latitude": position.coords.latitude,
            "longitude": position.coords.longitude,
          }).subscribe(
            data => console.log('Localização atualizada'),
            error => console.log(error),
          );
        }
      );
    }
  }

  verifyLogedUser() {
    if (!this.storage.userIsLogged()) {
      this.router.navigateByUrl('/account/login', { replaceUrl: true });
      return;
    }
    this.getPersonData();
    this.getLocations();
  }

  getLocations() {
    this.locationService.getLocations().subscribe(
      (data: StateModel[]) => {
        this.locations = data;
        for (let location of data) {
          if (location.id == this.person.city.state) {
            this.selectedState = location;
            for (let city of location.cities) {
              if (city.id == this.person.city.id) {
                this.selectedCityID = city.id!;
                break;
              }
            }
            break;
          }
        }
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
        return;
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
      name: new FormControl(this.person.name, [Validators.required, Validators.minLength(3)]),
      contact: new FormControl(this.person.contact, [Validators.required, Validators.minLength(11)]),
      password: new FormControl(this.person.password, [Validators.required, Validators.minLength(8)]),
      stateId: new FormControl(this.person.city?.state),
    });
  }

  selectState(event: any) {
    const stateId = event.target.value;
    const state = this.locations.find(el => el.id == stateId);
    if (state!.cities.length > 0) this.selectedCityID = state!.cities[0].id!;
    this.selectedState = state!;
  }

  selectCity(event: any) {
    const cityId = event.target.value;
    this.selectedCityID = cityId!;
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
    return `${environment.API}${this.person.image}`;
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

  compareUpdateData(): Object {
    const name = this.formPerson.get('name')?.value;
    const contact = this.formPerson.get('contact')?.value;
    const password = this.formPerson.get('password')?.value;

    let formatedData: { [key: string]: any } = {};
    if (name != '') formatedData['name'] = name;
    if (password != '') formatedData['password'] = password;
    if (contact != '') formatedData['contact'] = contact;
    if (this.selectedCityID != this.person.city.id && this.selectedCityID != 0) formatedData['city'] = this.selectedCityID;

    return formatedData;
  }

  validateUpdateData(data: Object): boolean {
    if (Object.keys(data).length === 0 && data.constructor === Object) {
      this.toast.warning('Nenhuma dado alterado');
      return false
    };
    if (this.selectedCityID == 0) {
      this.toast.warning('Nenhuma cidade selecionada');
      return false;
    }
    return true;
  }

  updateProfileData() {
    const formData = this.compareUpdateData();
    if (this.validateUpdateData(formData)) {
      this.accountService.updateData(formData).subscribe(
        data => {
          this.toast.success('Dados atualizados');
          this.getPersonData();
        },
        errors => {
          if (errors.status >= 500) {
            this.toast.error('Servidor indisponível');
          } else if (errors.status == 406) {
            for (let error of errors.error.errors) {
              this.toast.error(error);
            }
          }
        }
      );
    }
  }

  logout() {
    this.accountService.logout();
    this.verifyLogedUser();
  }

}
