import { PersonModel } from "./person-model";

export class BlockReasonModel {
    id?: number;
    createAt: Date;
    reason: string;
    personRequester: PersonModel;

    constructor(){
        this.id = undefined;
        this.createAt = new Date(Date.now());
        this.reason = '';
        this.personRequester = new PersonModel();
    }

    start(
        id: number | undefined,
        createAt: Date,
        reason: string,
        personRequester: PersonModel,
    ) {
        this.id = id;
        this.createAt = createAt;
        this.reason = reason;
        this.personRequester = personRequester;
    }
}
