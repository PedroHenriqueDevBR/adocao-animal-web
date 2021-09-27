export class VaccineModel {
    id?: number;
    vaccineName: string;
    date: Date;

    constructor(){
        this.id = undefined;
        this.vaccineName = '';
        this.date = new Date(Date.now());
    }

    start(
        id: number | undefined,
        vaccineName: string,
        date: Date,
    ) {
        this.id = id;
        this.vaccineName = vaccineName;
        this.date   = date;
    }
}
