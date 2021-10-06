import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CityModel } from '../models/city-model';
import { StateModel } from '../models/state-model';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private BASE_URL: string = '/server';

  constructor(private http: HttpClient, private storage: LocalstorageService) {}

  public getLocations(): Observable<StateModel[]> {
    return this.http.get<StateModel[]>(`${this.BASE_URL}/location/`);
  }

  public createState(state: StateModel): Observable<StateModel> {
    return this.http.post<StateModel>(
      `${this.BASE_URL}/location/state`,
      state.toCreate(),
      { headers: this.storage.getHeader() }
    );
  }

  public modifyState(state: StateModel): Observable<StateModel> {
    return this.http.put<StateModel>(
      `${this.BASE_URL}/location/state/${state.id}`,
      { name: state.name },
      { headers: this.storage.getHeader() }
    );
  }

  public deleteState(state: StateModel): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/location/state/${state.id}`, {
      headers: this.storage.getHeader(),
    });
  }

  public createCity(city: CityModel): Observable<any> {
    return this.http.post(`${this.BASE_URL}/location/city`, city.toCreate(), {
      headers: this.storage.getHeader(),
    });
  }

  public modifyCity(city: CityModel): Observable<any> {
    return this.http.put(
      `${this.BASE_URL}/location/city/${city.id}`,
      {
        name: city.name,
        state: city.state,
      },
      { headers: this.storage.getHeader() }
    );
  }

  public deleteCity(city: CityModel): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/location/city/${city.id}`, {
      headers: this.storage.getHeader(),
    });
  }
}
