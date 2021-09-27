import { AnimalModel } from "./animal-model";

export class CityModel {
    id?: number;
    name: string;
    
    animals: AnimalModel[];

    constructor(
        id: number | undefined = undefined,
        name: string = '',
        animals: AnimalModel[] = [],
    ) {
        this.id = id;
        this.name = name;
        this.animals = animals;
    }
}
