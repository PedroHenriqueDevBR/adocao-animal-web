import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CityModel } from 'src/app/shared/models/city-model';
import { PersonModel } from 'src/app/shared/models/person-model';
import { StateModel } from 'src/app/shared/models/state-model';
import { AccountService } from 'src/app/shared/services/account.service';
import { LocationService } from 'src/app/shared/services/location.service';

@Component({
  templateUrl: './person-manager.component.html',
  styleUrls: ['./person-manager.component.less'],
})
export class PersonManagerComponent implements OnInit {
  selectedLocation?: StateModel;
  persons: PersonModel[] = [];
  selectedPerson?: PersonModel;

  constructor(
    private toast: ToastrService,
    private accountService: AccountService,
    private locationService: LocationService
  ) {
    this.getPersons();
  }

  ngOnInit(): void {}

  getPersons(): void {
    this.accountService.allPersons().subscribe(
      (data: PersonModel[]) => (this.persons = data),
      (error) => this.verifyStatusError(error)
    );
  }

  profileImage(): string {
    if (this.selectedPerson == null) {
      return '/assets/images/avatar.png';
    } else if (
      this.selectedPerson.image == null ||
      this.selectedPerson.image == ''
    ) {
      return '/assets/images/avatar.png';
    }
    return '/server' + this.selectedPerson.image;
  }

  selectPerson(person: PersonModel) {
    this.selectedPerson = person;
  }

  changeModeratorPerson() {
    if (this.selectedPerson != null) {
      if (this.selectedPerson.is_moderator) {
        this.accountService.disableModerator(this.selectedPerson).subscribe(
          (data) => {
            this.toast.success('Moderador desabilitado');
            this.selectedPerson!.is_moderator = false;
          },
          (error) => this.verifyStatusError(error)
        );
      } else {
        this.accountService.enableModerator(this.selectedPerson).subscribe(
          (data) => {
            this.toast.success('Moderador habilitado');
            this.selectedPerson!.is_moderator = true;
          },
          (error) => this.verifyStatusError(error)
        );
      }
    }
  }

  changeBlockPerson() {
    if (this.selectedPerson != null) {
      if (this.selectedPerson.is_active) {
        this.accountService.blockPerson(this.selectedPerson).subscribe(
          (data) => {
            this.toast.success('Perfil bloqueado');
            this.selectedPerson!.is_active = false;
          },
          (error) => this.verifyStatusError(error)
        );
      } else {
        this.accountService.unlockPerson(this.selectedPerson).subscribe(
          (data) => {
            this.toast.success('Perfil desbloqueado');
            this.selectedPerson!.is_active = true;
          },
          (error) => this.verifyStatusError(error)
        );
      }
    }
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
