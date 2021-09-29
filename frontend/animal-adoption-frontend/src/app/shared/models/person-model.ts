import { AnimalModel } from "./animal-model";

export class PersonModel {
    id?: number;
    username: string = '';
    name: string = '';
    image: string = '';
    contact: string = '';
    latitude: string = '';
    longitude: string = '';
    isModerator: boolean = false;
    isActive: boolean = false;
    cityId: number = 0;
    
    animals: AnimalModel[] = [];


}