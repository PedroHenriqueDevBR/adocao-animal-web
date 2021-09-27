export class VaccineModel {
    id?: number;
    vaccineName: string;
    date: Date;

    constructor(
        id: number | undefined = undefined,
        vaccineName: string = '',
        date: Date = new Date(Date.now()),
    ) {
        this.id = id;
        this.vaccineName = vaccineName;
        this.date = date;
    }
}
