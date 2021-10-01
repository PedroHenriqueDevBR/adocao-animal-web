import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PersonModel } from '../models/person-model';
import { Observable } from 'rxjs';
import { JWTResponseModel } from './models/jwt-response-model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private BASE_URL: string = '/server';

  constructor(
    private http: HttpClient,
  ) { }

  public loginUser(person: PersonModel): Observable<JWTResponseModel> {
    return this.http.post<JWTResponseModel>(`${this.BASE_URL}/user/login/`, person.toLogin());
  }

  public registerUser(person: PersonModel): Observable<any> {
    return this.http.post(`${this.BASE_URL}/user/register`, person.toRegister());
  }



}
