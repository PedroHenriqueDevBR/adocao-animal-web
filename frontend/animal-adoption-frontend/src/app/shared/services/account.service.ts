import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PersonModel } from '../models/person-model';
import { Observable } from 'rxjs';
import { JWTResponseModel } from './models/jwt-response-model';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private BASE_URL: string = '/server';

  constructor(
    private http: HttpClient,
    private storage: LocalstorageService,
  ) { }

  public loginUser(person: PersonModel): Observable<JWTResponseModel> {
    return this.http.post<JWTResponseModel>(`${this.BASE_URL}/user/login/`, person.toLogin());
  }

  public registerUser(person: PersonModel): Observable<any> {
    return this.http.post(`${this.BASE_URL}/user/register`, person.toRegister());
  }

  public getLoggedPersonData(): Observable<PersonModel> {
    return this.http.get<PersonModel>(
      `${this.BASE_URL}/user/`,
      { headers: this.storage.getHeader() },
    );
  }

  public updateImage(data: FormData): Observable<PersonModel> {
    return this.http.put<PersonModel>(
      `${this.BASE_URL}/user/image/`,
      data,
      { headers: this.storage.getHeader() },
    );
  }

  public removeImage(): Observable<any> {
    return this.http.delete(
      `${this.BASE_URL}/user/image/`,
      { headers: this.storage.getHeader() },
    );
  }
}
