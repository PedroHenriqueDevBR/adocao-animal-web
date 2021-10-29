import { PersonModel } from "./person-model";

export class AdoptionReceivedModel {
    id?: number;
    create_at: Date = new Date();
    is_acepted?: boolean;
    requester: any;
    animal: number = 0;
}
