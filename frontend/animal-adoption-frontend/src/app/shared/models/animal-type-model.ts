import { AnimalModel } from "./animal-model";

export class AnimalTypeModel {
    id?: number;
    name: string;
    
    animals: AnimalModel[] = [];

    constructor(
        id: number | undefined = undefined,
        name: string = '',
    ) {
        this.id = id;
        this.name = name;
    }

    addAnimal(animal: AnimalModel) {
        this.animals.push(animal);
    }
}
