import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnimalModel } from '../models/animal-model';
import { AnimalTypeModel } from '../models/animal-type-model';
import { PhotoModel } from '../models/photo-model';
import { VaccineModel } from '../models/vaccine-model';
import { LocalstorageService } from './localstorage.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  private BASE_URL: string = environment.API;

  constructor(private http: HttpClient, private storage: LocalstorageService) { }

  public getAnimalTypes(): Observable<AnimalTypeModel[]> {
    return this.http.get<AnimalTypeModel[]>(
      `${this.BASE_URL}/animal/all_types`
    );
  }

  public getAllAimalsForAdoption(): Observable<AnimalModel[]> {
    return this.http.get<AnimalModel[]>(`${this.BASE_URL}/animal/`);
  }

  public filterAnimals(data: any) {
    return this.http.patch<AnimalModel[]>(
      `${this.BASE_URL}/animal/filter/`,
      data,
    );
  }

  public getAnimalsFromOwner(ownerName: String): Observable<AnimalModel[]> {
    return this.http.get<AnimalModel[]>(`${this.BASE_URL}/animal/owner/${ownerName}`);
  }

  public getAimalsFromMyLocation(): Observable<AnimalModel[]> {
    return this.http.get<AnimalModel[]>(`${this.BASE_URL}/animal/location/`, {
      headers: this.storage.getHeader(),
    });
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
    return this.http.get<AnimalModel>(`${this.BASE_URL}/animal/${id}`);
  }

  public updateAnimal(animal: AnimalModel): Observable<AnimalModel> {
    return this.http.put<AnimalModel>(
      `${this.BASE_URL}/animal/my/${animal.id}`,
      {
        name: animal.name,
        breed: animal.breed,
        age: animal.age,
        sex: animal.sex,
        animal_type: animal.animal_type,
      },
      { headers: this.storage.getHeader() }
    );
  }

  public deleteAnimal(animal: AnimalModel): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/animal/my/${animal.id}`, {
      headers: this.storage.getHeader(),
    });
  }

  public addImage(data: FormData): Observable<PhotoModel> {
    return this.http.post<PhotoModel>(`${this.BASE_URL}/animal/photo`, data, {
      headers: this.storage.getHeader(),
    });
  }

  public removeImage(photo: PhotoModel): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/animal/photo/${photo.id}`, {
      headers: this.storage.getHeader(),
    });
  }

  public addVaccine(
    animal: AnimalModel,
    vaccine: VaccineModel
  ): Observable<VaccineModel> {
    return this.http.post<VaccineModel>(
      `${this.BASE_URL}/animal/vaccine`,
      {
        vaccine_name: vaccine.vaccine_name,
        animal: animal.id,
      },
      { headers: this.storage.getHeader() }
    );
  }

  public updateVaccine(
    animal: AnimalModel,
    vaccine: VaccineModel
  ): Observable<VaccineModel> {
    return this.http.put<VaccineModel>(
      `${this.BASE_URL}/animal/vaccine/${vaccine.id}`,
      {
        vaccine_name: vaccine.vaccine_name,
        animal: animal.id,
      },
      { headers: this.storage.getHeader() }
    );
  }

  public removeVaccine(vaccine: VaccineModel): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/animal/vaccine/${vaccine.id}`, {
      headers: this.storage.getHeader(),
    });
  }

  public blockAnimal(animal: AnimalModel, reason: String = ''): Observable<any> {
    return this.http.patch(`${this.BASE_URL}/animal/${animal.id}/block`,
      { reason: reason },
      { headers: this.storage.getHeader() });
  }

  public unlockAnimal(animal: AnimalModel): Observable<any> {
    return this.http.patch(`${this.BASE_URL}/animal/${animal.id}/unlock`,
      {},
      { headers: this.storage.getHeader() });
  }
}
