import { CityModel } from "./city-model";

export class StateModel {
    id?: number;
    name: string;
    
    cities: CityModel[] = [];

    constructor(
        id: number | undefined = undefined,
        name: string = '',
    ) {
        this.id = id;
        this.name = name;
    }
}
