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

    animals: AnimalModel[] = [];

    constructor() {
        this.id = undefined;
        this.username = '';
        this.name = '';
        this.image = '';
        this.contact = '';
        this.latitude = '';
        this.longitude = '';
        this.isModerator = false;
        this.isActive = false;
    }

    start(
        id: number | undefined,
        username: string,
        name: string,
        image: string,
        contact: string,
        latitude: string,
        longitude: string,
        isModerator: boolean,
        isActive: boolean,
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
    }
}
