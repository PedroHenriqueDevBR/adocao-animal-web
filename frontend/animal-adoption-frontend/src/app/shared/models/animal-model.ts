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

    photos: PhotoModel[];
    vaccines: VaccineModel[];
    blockReasons: BlockReasonModel[];
    adoptionReceived: AdoptionReceivedModel[];


    constructor(
        id: number | undefined = undefined,
        name: string = '',
        breed: string = '',
        age: number = 0,
        adopted: boolean = false,
        sex: string = '',
        blocked: boolean = false,
        createAt: Date = new Date(Date.now()),
        owner: number = 0,
        type: string = '',
        photos: PhotoModel[] = [],
        vaccines: VaccineModel[] = [],
        blockReasons: BlockReasonModel[] = [],
        adoptionReceived: AdoptionReceivedModel[] = [],
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
        this.photos = photos;
        this.vaccines = vaccines;
        this.blockReasons = blockReasons;
        this.adoptionReceived = adoptionReceived;
    }

}
