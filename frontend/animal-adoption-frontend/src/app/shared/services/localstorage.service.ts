import { Injectable } from '@angular/core';
import { JWTResponseModel } from './models/jwt-response-model';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  private JWT_KEY: string = 'jwt';
  private PROFILE_DATA: string = 'profile-data';

  constructor() { }

  public saveJWT(jwt: JWTResponseModel): void {
    localStorage.setItem(this.JWT_KEY, jwt.access);
  }

  public userIsLogged(): boolean {
    return localStorage.getItem(this.JWT_KEY) != null;
  }

  public logout(): void {
    localStorage.removeItem(this.JWT_KEY);
  }
}
