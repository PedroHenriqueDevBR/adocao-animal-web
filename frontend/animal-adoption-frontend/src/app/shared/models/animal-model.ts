import { AdoptionReceivedModel } from "./adoption-received-model";
import { BlockReasonModel } from "./block-reason-model";
import { PhotoModel } from "./photo-model";
import { VaccineModel } from "./vaccine-model";

export class AnimalModel {
    id?: number;
    name: string;
    breed: string;
    age: number;
    adopted: boolean;
    sex: string;
    blocked: boolean;
    createAt: Date;
    owner: number;
    type: string;

    photos: PhotoModel[] = [];
    vaccines: VaccineModel[] = [];
    blockReasons: BlockReasonModel[] = [];
    adoptionReceived: AdoptionReceivedModel[] = [];

    constructor(){
        this.id = undefined;
        this.name = '';
        this.breed = '';
        this.age = 0;
        this.adopted = false;
        this.sex = '';
        this.blocked = false;
        this.createAt = new Date(Date.now());
        this.owner = 0;
        this.type = '';
    }

    start(
        id: number | undefined,
        name: string,
        breed: string,
        age: number,
        adopted: boolean,
        sex: string,
        blocked: boolean,
        createAt: Date,
        owner: number,
        type: string,
    ) {
        this.id = id;
        this.name = name;
        this.breed = breed;
        this.age = age;
        this.adopted = adopted;
        this.sex = sex;
        this.blocked = blocked;
        this.createAt = createAt;
        this.owner = owner;
        this.type = type;
    }

}
