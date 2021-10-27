import { Injectable } from '@angular/core';
import { PersonModel } from '../models/person-model';
import { JWTResponseModel } from './models/jwt-response-model';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  private JWT_KEY: string = 'jwt';
  private PROFILE_DATA: string = 'profile-data';

  constructor() {}

  public saveJWT(jwt: JWTResponseModel): void {
    localStorage.setItem(this.JWT_KEY, jwt.access);
  }

  public userIsLogged(): boolean {
    return localStorage.getItem(this.JWT_KEY) != null;
  }

  public logout(): void {
    localStorage.removeItem(this.JWT_KEY);
    localStorage.removeItem(this.PROFILE_DATA);
  }

  public getHeader() {
    return { Authorization: this.getJWTKey() };
  }

  private getJWTKey(): string {
    return 'Bearer ' + localStorage.getItem(this.JWT_KEY) || '';
  }

  public saveLoggedData(person: PersonModel): void {
    localStorage.setItem(
      this.PROFILE_DATA,
      JSON.stringify({
        id: person.id,
        image: person.image,
        name: person.name,
        username: person.username,
        is_moderator: person.is_moderator,
        is_active: person.is_active,
      })
    );
  }

  public getLoggedPersonData() {
    const data = localStorage.getItem(this.PROFILE_DATA) || '{}';
    return JSON.parse(data);
  }
}
