import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdoptionReceivedModel } from '../models/adoption-received-model';
import { AnimalModel } from '../models/animal-model';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class AdoptionService {
  private BASE_URL: string = '/server';

  constructor(private http: HttpClient, private storage: LocalstorageService) {}

  public loggedPersonAdoptionsCreated(): Observable<AdoptionReceivedModel[]> {
    return this.http.get<AdoptionReceivedModel[]>(
      `${this.BASE_URL}/adoption/`,
      { headers: this.storage.getHeader() }
    );
  }

  public getAdoptionsFromAnimal(animal: AnimalModel): Observable<AdoptionReceivedModel[]> {
    return this.http.get<AdoptionReceivedModel[]>(
      `${this.BASE_URL}/adoption/${animal.id}`,
      { headers: this.storage.getHeader() }
    );
  }

  public createAdoptionRequest(animal: AnimalModel): Observable<AdoptionReceivedModel> {
    return this.http.post<AdoptionReceivedModel>(
      `${this.BASE_URL}/adoption/${animal.id}`,
      {},
      { headers: this.storage.getHeader() }
    );
  }

  public acceptAdoptionRequest(animal: AnimalModel, adoption: AdoptionReceivedModel): Observable<AdoptionReceivedModel> {
    return this.http.put<AdoptionReceivedModel>(
      `${this.BASE_URL}/adoption/${animal.id}/accept/${adoption.id}`,
      {},
      { headers: this.storage.getHeader() }
    );
  }

  public rejectAdoptionRequest(animal: AnimalModel, adoption: AdoptionReceivedModel): Observable<AdoptionReceivedModel> {
    return this.http.put<AdoptionReceivedModel>(
      `${this.BASE_URL}/adoption/${animal.id}/reject/${adoption.id}`,
      {},
      { headers: this.storage.getHeader() }
    );
  }

  public deleteAdoptionRequest(animal: AnimalModel, adoption: AdoptionReceivedModel): Observable<AdoptionReceivedModel> {
    return this.http.delete<AdoptionReceivedModel>(
      `${this.BASE_URL}/adoption/${animal.id}/delete/${adoption.id}`,
      { headers: this.storage.getHeader() }
    );
  }

}
