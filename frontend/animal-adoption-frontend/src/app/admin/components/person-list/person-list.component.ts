import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PersonModel } from 'src/app/shared/models/person-model';
import { StateModel } from 'src/app/shared/models/state-model';
import { AccountService } from 'src/app/shared/services/account.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.less'],
})
export class PersonListComponent implements OnInit {
  selectedLocation?: StateModel;
  @Input() allPersons: PersonModel[] = [];
  @Input() persons: PersonModel[] = [];
  @Output() personEmit = new EventEmitter();

  search: string = '';

  constructor(
    private toast: ToastrService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {}

  selectPerson(person: PersonModel) {
    this.personEmit.emit(person);
  }

  profileImage(person: PersonModel) {
    if (person == null) {
      return '/assets/images/avatar.png';
    } else if (person.image == null || person.image == '') {
      return '/assets/images/avatar.png';
    }
    return '/server/' + person.image;
  }

  searchKeyword(keyword: string): void {
    if (keyword == '') {
      this.persons = this.allPersons.slice();
    } else {
      this.persons = this.allPersons.filter((el) => el.name.includes(keyword));
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
