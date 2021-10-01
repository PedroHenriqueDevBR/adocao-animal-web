import { CityModel } from "./city-model";

export class StateModel {
    id?: number;
    name: string = '';
    
    cities: CityModel[] = [];

    toCreate() {
        return {
            name: this.name,
        }
    }
}
