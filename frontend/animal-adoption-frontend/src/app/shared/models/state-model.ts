import { CityModel } from "./city-model";

export class StateModel {
    id?: number;
    name: string;
    cities: CityModel[] = [];

    constructor(){
        this.id = undefined;
        this.name = '';
    }

    start(
        id: number | undefined,
        name: string,
    ) {
        this.id = id;
        this.name = name;
    }
}
