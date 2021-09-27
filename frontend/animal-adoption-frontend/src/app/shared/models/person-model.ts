import { AnimalModel } from "./animal-model";

export class PersonModel {
    id?: number;
    username: string;
    name: string;
    image: string;
    contact: string;
    latitude: string;
    longitude: string;
    isModerator: boolean;
    isActive: boolean;
    
    animals: AnimalModel[];

    constructor(
        id: number | undefined = undefined,
        username: string = '',
        name: string = '',
        image: string = '',
        contact: string = '',
        latitude: string = '',
        longitude: string = '',
        isModerator: boolean = false,
        isActive: boolean = false,
        animals: AnimalModel[] = [],
    ){
        this.id = id;
        this.username = username;
        this.name = name;
        this.image = image;
        this.contact = contact;
        this.latitude = latitude;
        this.longitude = longitude;
        this.isModerator = isModerator;
        this.isActive = isActive;
        this.animals = animals;
    }
}
