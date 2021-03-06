import { AnimalModel } from "./animal-model";
import { CityModel } from "./city-model";

export class PersonModel {
    id?: number;
    username: string = '';
    password: string = '';
    name: string = '';
    image: string = '';
    contact: string = '';
    latitude: string = '';
    longitude: string = '';
    is_moderator: boolean = false;
    is_active: boolean = false;
    is_admin: boolean = false;
    city: CityModel = new CityModel();

    animals: AnimalModel[] = [];

    public toLogin() {
        return {
            username: this.username,
            password: this.password,
        };
    }

    public toRegister() {
        return {
            name: this.name,
            username: this.username,
            password: this.password,
            contact: this.contact,
            city: this.city?.id,
        };
    }
}