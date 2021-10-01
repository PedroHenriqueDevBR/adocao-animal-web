import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PersonModel } from 'src/app/shared/models/person-model';
import { StateModel } from 'src/app/shared/models/state-model';
import { AccountService } from 'src/app/shared/services/account.service';
import { LocalstorageService } from 'src/app/shared/services/localstorage.service';
import { LocationService } from 'src/app/shared/services/location.service';

@Component({
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.less']
})
export class RegisterPageComponent implements OnInit {
  formRegisterPerson: FormGroup;
  person: PersonModel = new PersonModel();
  locations: StateModel[] = [];
  selectedState: StateModel = new StateModel();

  constructor(
    private storage: LocalstorageService,
    private router: Router,
    private toast: ToastrService,
    private accountService: AccountService,
    private locationService: LocationService,
  ) {
    this.formRegisterPerson = this.createFormRegisterPerson();
  }

  ngOnInit(): void {
    this.getLocations();
  }

  // TODO: Verify logged user
  verifyLogedUser(): void {
    if (this.storage.userIsLogged()) {
      this.router.navigateByUrl('/account');
    }
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

  selectState(event: any) {
    const stateId = event.target.value;
    const state = this.locations.find(el => el.id == stateId);
    this.selectedState = state!;
  }

  createFormRegisterPerson(): FormGroup {
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
    return this.formRegisterPerson.valid;
  }

  registerSuccess(): void {
    this.toast.success('Faça o login com as suas credenciais');
    this.toast.success('Usuário criado com sucesso');
    this.router.navigateByUrl('/account/login');
  }

  validateFormData(): boolean {
    let valid = true;
    const password = this.formRegisterPerson.get('password')?.value;
    const repeatPassword = this.formRegisterPerson.get('repeatPassword')?.value;
    const city = this.formRegisterPerson.get('cityId')?.value;

    if (password != repeatPassword) {
      this.toast.warning('As senhas não conferem');
      valid = false;
    }
    if (city == 0) {
      this.toast.warning('Selecione uma cidade válida');
      valid = false;
    }
    return valid;
  }

  formatPersonData() {
    this.person.name = this.formRegisterPerson.get('name')?.value;
      this.person.username = this.formRegisterPerson.get('username')?.value;
      this.person.password = this.formRegisterPerson.get('password')?.value;
      this.person.contact = this.formRegisterPerson.get('contact')?.value;
      this.person.cityId = this.formRegisterPerson.get('cityId')?.value;
  }

  submit(): void {
    if (this.validateFormData()) {
      this.formatPersonData();
      this.accountService.registerUser(this.person).subscribe(
        data => {
          this.registerSuccess();
        },
        errors => {
          if (errors.status > 500) this.toast.error('Servidor indisponível');
          else {
            console.log(errors);
            this.toast.error('Erro interno');
          } 
        }
      );
    }
  }
}
