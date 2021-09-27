import { AnimalModel } from "./animal-model";

export class CityModel {
    id?: number;
    name: string;
    animals: AnimalModel[] = [];

    constructor(){
        this.id = undefined;
        this.name = '';
        this.animals = [];
    }

    start(
        id: number | undefined,
        name: string,
        animals: AnimalModel[],
    ) {
        this.id = id;
        this.name = name;
        this.animals = animals;
    }
}
