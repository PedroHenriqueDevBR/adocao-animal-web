import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService } from '../shared/services/localstorage.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less'],
})
export class AdminComponent implements OnInit {
  constructor(private storage: LocalstorageService, private router: Router) {
    this.userNotIsAdmin();
  }

  ngOnInit(): void {}

  userNotIsAdmin() {
    const userData = this.storage.getLoggedPersonData();
    if (userData.is_admin == undefined || userData.is_admin == false) {
      this.router.navigateByUrl('/404', {
        replaceUrl: true,
      });
    }
  }
}
