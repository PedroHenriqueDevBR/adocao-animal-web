import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PersonModel } from 'src/app/shared/models/person-model';
import { AccountService } from 'src/app/shared/services/account.service';
import { LocalstorageService } from 'src/app/shared/services/localstorage.service';
import { JWTResponseModel } from 'src/app/shared/services/models/jwt-response-model';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.less']
})
export class LoginPageComponent implements OnInit {
  formLogin: FormGroup;
  person: PersonModel = new PersonModel();

  constructor(
    private storage: LocalstorageService,
    private router: Router,
    private toast: ToastrService,
    private accountService: AccountService,
  ) {
    this.formLogin = this.createFormLogin();
  }

  ngOnInit(): void {
    this.verifyLogedUser();
  }

  verifyLogedUser(): void {
    if (this.storage.userIsLogged()) {
      this.router.navigateByUrl('/account', {replaceUrl:true});
    }
  }

  createFormLogin(): FormGroup {
    return new FormGroup({
      username: new FormControl(this.person.username, [Validators.required, Validators.minLength(5)]),
      password: new FormControl(this.person.password, [Validators.required, Validators.minLength(8)]),
    });
  }

  get formIsValid(): boolean {
    return this.formLogin.valid;
  }

  loginSuccess(data: JWTResponseModel): void {
    this.storage.saveJWT(data);
    this.accountService.getLoggedPersonData().subscribe(
      (data: PersonModel) => {
        this.storage.saveLoggedData(data);
        this.router.navigateByUrl('/app');
      },
      error => {
        this.storage.logout();
        this.verifyStatusError(error);
      }
    );
  }

  submit(): void {
    this.person.username = this.formLogin.get('username')?.value;
    this.person.password = this.formLogin.get('password')?.value;
    this.accountService.loginUser(this.person).subscribe(
      (data: JWTResponseModel) => {
        this.loginSuccess(data);
      },
      errors => {
        if (errors.status == 404 || errors.status > 500) this.toast.error('Servidor indisponível');
        else if (errors.status == 401) this.toast.error('Username ou senha inválidos');
        else {
          console.log(errors);
          this.toast.error('Erro interno');
        } 
      }
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

}
