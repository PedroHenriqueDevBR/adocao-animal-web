import { PersonModel } from "./person-model";

export class BlockReasonModel {
    id?: number;
    createAt: Date;
    reason: string;
    personRequester: PersonModel;

    constructor(
        id: number | undefined = undefined,
        createAt: Date = new Date(Date.now()),
        reason: string = '',
        personRequester: PersonModel = new PersonModel(),
    ) {
        this.id = id;
        this.createAt = createAt;
        this.reason = reason;
        this.personRequester = personRequester;
    }
}
