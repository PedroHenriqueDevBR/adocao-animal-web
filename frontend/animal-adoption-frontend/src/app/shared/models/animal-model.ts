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
    createAt: Date = new Date(Date.now());
    owner: number = 0;
    type: string = '';

    photos: PhotoModel[] = [];
    vaccines: VaccineModel[] = [];
    blockReasons: BlockReasonModel[] = [];
    adoptionReceived: AdoptionReceivedModel[] = [];

}
