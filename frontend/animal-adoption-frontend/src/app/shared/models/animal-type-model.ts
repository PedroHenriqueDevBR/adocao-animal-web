import { AnimalModel } from "./animal-model";

export class AnimalTypeModel {
    id?: number;
    name: string;
    animals: AnimalModel[] = [];

    constructor() {
        this.id = undefined;
        this.name = '';
    }

    start(
        id: number | undefined,
        name: string
    ) {
        this.id = id;
        this.name = name;
    }

    addAnimal(animal: AnimalModel) {
        this.animals.push(animal);
    }
}
