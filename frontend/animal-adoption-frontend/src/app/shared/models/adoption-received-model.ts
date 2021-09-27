import { PersonModel } from "./person-model";

export class AdoptionReceivedModel {
    id?: number;
    createAt: Date;
    isAcepted?: boolean;
    requester: PersonModel;

    constructor(
        id: number | undefined = undefined,
        createAt: Date = new Date(Date.now()),
        isAcepted: boolean | undefined = undefined,
        requester: PersonModel = new PersonModel(),
    ){
        this.id = id;
        this.createAt = createAt;
        this.isAcepted = isAcepted;
        this.requester = requester;
    }
}
