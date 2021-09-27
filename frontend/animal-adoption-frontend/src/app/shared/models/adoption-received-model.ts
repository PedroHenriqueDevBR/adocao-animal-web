import { PersonModel } from "./person-model";

export class AdoptionReceivedModel {
    id?: number;
    createAt: Date;
    isAcepted?: boolean;
    requester: PersonModel;

    constructor(){
        this.id = undefined;
        this.createAt = new Date(Date.now());
        this.isAcepted = undefined;
        this.requester = new PersonModel();
    }

    start(
        id: number | undefined,
        createAt: Date,
        isAcepted: boolean | undefined,
        requester: PersonModel,
    ) {
        this.id = id;
        this.createAt = createAt;
        this.isAcepted = isAcepted;
        this.requester = requester;
    }
}
