import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AnimalModel } from 'src/app/shared/models/animal-model';
import { AnimalService } from 'src/app/shared/services/animal.service';

import Map from 'ol/Map';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import { Feature } from 'ol';
import Geometry from 'ol/geom/Geometry';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import { LocalstorageService } from 'src/app/shared/services/localstorage.service';

@Component({
  templateUrl: './animal-maps.component.html',
  styleUrls: ['./animal-maps.component.less'],
})
export class AnimalMapsComponent implements OnInit {
  animals: AnimalModel[] = [];

  lat: number = -5.090104;
  long: number = -42.81053;
  map: Map | undefined;
  points: Array<Feature<Geometry>> = [];
  vectorSource: VectorSource<Geometry> | undefined;
  vectorLayer: VectorLayer<VectorSource<Geometry>> | undefined;
  selectedAnimal: AnimalModel | undefined;

  constructor(
    private animalService: AnimalService,
    private storage: LocalstorageService,
    private toast: ToastrService
  ) {}

  async ngOnInit() {
    this.getAnimals();
  }

  async createPoints(): Promise<void> {
    for (const animal of this.animals) {
      const long = animal.owner.longitude;
      const lat = animal.owner.latitude;
      this.points.push(
        new Feature({
          geometry: new Point(olProj.fromLonLat([long, lat])),
        }),
      );
    }

    for (let point of this.points) {
      const style = new Style({
        image: new Icon({
          color: '#8959A8',
          crossOrigin: 'anonymous',
          src: 'assets/images/marker.svg',
          imgSize: [20, 20],
        }),
      });

      point.setStyle(style);
    }

    this.vectorSource = new VectorSource({
      features: this.points,
    });

    this.vectorLayer = new VectorLayer({
      source: this.vectorSource!,
    });

    this.startMap();
  }

  startMap() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          this.lat = position.coords.latitude;
          this.long = position.coords.longitude;
          this.createMap(
            position.coords.latitude,
            position.coords.longitude,
            14
          );
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

    if (this.map == undefined) {
      this.map = new Map({
        target: 'ol-map',
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          this.vectorLayer!,
        ],
        view: new View({
          center: olProj.fromLonLat([long, lat]),
          zoom: zoom,
        }),
      });
    } else {
      const view = new View({
        center: olProj.fromLonLat([long, lat]),
        zoom: zoom,
      });
      this.map.setView(view);
    }
  }

  getAnimals(): void {
    if (this.storage.userIsLogged()) {
      this.animalService.getAimalsFromMyLocation().subscribe(
        (data: AnimalModel[]) => {
          this.animals = data;
          this.createPoints();
        },
        (error) => this.verifyStatusError(error)
      );
    } else {
      this.animalService.getAllAimalsForAdoption().subscribe(
        (data: AnimalModel[]) => {
          this.animals = data;
          this.createPoints();
        },
        (error) => this.verifyStatusError(error)
      );
    }
  }

  selectAnimal(animal: AnimalModel) {
    if (this.selectedAnimal == animal) {
      this.createMap(this.lat, this.long, 14);
      this.selectedAnimal = undefined;
    } else {
      const long = animal.owner.longitude;
      const lat = animal.owner.latitude;
      this.createMap(lat, long, 17);
      this.selectedAnimal = animal;
    }
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
