import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnimalModel } from '../models/animal-model';
import { AnimalTypeModel } from '../models/animal-type-model';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  private BASE_URL: string = '/server';

  constructor(private http: HttpClient, private storage: LocalstorageService) {}

  public getAnimalTypes(): Observable<AnimalTypeModel[]> {
    return this.http.get<AnimalTypeModel[]>(`${this.BASE_URL}/animal/all_types`);
  }

  public getAllAimalsForAdoption(): Observable<AnimalModel[]> {
    return this.http.get<AnimalModel[]>(`${this.BASE_URL}/animal/`);
  }

  public getMyAnimals(): Observable<AnimalModel[]> {
    return this.http.get<AnimalModel[]>(`${this.BASE_URL}/animal/my`, {
      headers: this.storage.getHeader(),
    });
  }

  public createAnimal(animal: AnimalModel): Observable<AnimalModel> {
    return this.http.post<AnimalModel>(
      `${this.BASE_URL}/animal/my`,
      animal.toCreate(),
      { headers: this.storage.getHeader() }
    );
  }

  public getAimalsByID(id: number): Observable<AnimalModel> {
    return this.http.get<AnimalModel>(`${this.BASE_URL}/animal/my/${id}`, {
      headers: this.storage.getHeader(),
    });
  }

  public updateAnimal(animal: AnimalModel): Observable<AnimalModel> {
    return this.http.put<AnimalModel>(
      `${this.BASE_URL}/animal/my/${animal.id}`,
      {
        name: animal.name,
        breed: animal.breed,
        age: animal.age,
        sex: animal.sex,
        type: animal.type,
      },
      { headers: this.storage.getHeader() }
    );
  }

  public deleteAnimal(animal: AnimalModel): Observable<any> {
    return this.http.delete(`${this.BASE_URL}//animal/my/${animal.id}`, {
      headers: this.storage.getHeader(),
    });
  }
}