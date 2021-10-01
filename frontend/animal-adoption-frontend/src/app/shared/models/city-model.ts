import { AnimalModel } from "./animal-model";

export class CityModel {
    id?: number;
    name: string = '';
    stateId: number = 0;
    animals: AnimalModel[] = [];

    toCreate() {
        return {
            name: this.name,
            state: this.stateId,
        }
    }
}
