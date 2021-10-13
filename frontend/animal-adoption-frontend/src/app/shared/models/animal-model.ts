import { AdoptionReceivedModel } from "./adoption-received-model";
import { BlockReasonModel } from "./block-reason-model";
import { PhotoModel } from "./photo-model";
import { VaccineModel } from "./vaccine-model";

export class AnimalModel {
    id?: number;
    name: string = '';
    breed: string = '';
    age: number = 0;
    adopted: boolean = false;
    sex: string = '';
    blocked: boolean = false;
    create_at: Date = new Date(Date.now());
    owner: any;
    type: any;

    all_photos: PhotoModel[] = [];
    all_vaccines: VaccineModel[] = [];
    blockReasons: BlockReasonModel[] = [];
    all_adoption_received: AdoptionReceivedModel[] = [];

    toCreate() {
        return {
            name: this.name,
            breed: this.breed,
            age: this.age,
            sex: this.sex,
            type: this.type,
        };
    }

}
