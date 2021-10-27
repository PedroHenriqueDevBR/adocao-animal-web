import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  constructor(
    private storage: LocalstorageService,
  ) { }

  ngOnInit(): void {
  }

  profileImage(): string {
    const loggedPersonData = this.storage.getLoggedPersonData();
    if ('image' in loggedPersonData && loggedPersonData['image'] != undefined) {
      return `/server${loggedPersonData['image']}`;
    }
    return '/assets/images/person.png';
  }

}
