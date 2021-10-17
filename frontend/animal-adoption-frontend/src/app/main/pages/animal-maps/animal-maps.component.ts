import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AnimalModel } from 'src/app/shared/models/animal-model';
import { AnimalService } from 'src/app/shared/services/animal.service';

import Map from 'ol/Map';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';

@Component({
  templateUrl: './animal-maps.component.html',
  styleUrls: ['./animal-maps.component.less'],
})
export class AnimalMapsComponent implements OnInit {
  animals: AnimalModel[] = [];

  map: Map | undefined;
  lat: number = -5.090104;
  long: number = -42.810530;

  constructor(
    private animalService: AnimalService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAnimals();
    this.startMap();
  }
  
  startMap() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          console.log('Pegoua posição')
          this.createMap(position.coords.latitude, position.coords.longitude, 14);
        }
      );
    } else {
      this.createMap(this.lat, this.long);
    }


  }
  
  createMap(lat: number, long: number, zoom?: number) {
    if (zoom == undefined) {
      zoom = 5;
    }
    this.map = new Map({
      target: 'ol-map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: olProj.fromLonLat([long, lat]),
        zoom: zoom,
      }),
    });  
  }

  getAnimals(): void {
    this.animalService.getAllAimalsForAdoption().subscribe(
      (data: AnimalModel[]) => {
        this.animals = data;
      },
      (error) => this.verifyStatusError(error)
    );
  }

  verifyStatusError(errors: any) {
    if (errors.status >= 500) {
      this.toast.error('Servidor indisponível');
    } else if (errors.status == 406) {
      if (errors.error.errors) {
        for (let error of errors.error.errors) {
          this.toast.error(error);
        }
      }
    } else if (errors.status == 403) {
      this.toast.error('Sem permissão');
    } else {
      this.toast.error('Erro interno');
      console.log(errors);
    }
  }
}
