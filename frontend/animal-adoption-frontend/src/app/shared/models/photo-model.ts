export class PhotoModel {
    id?: number;
    photo: string;

    constructor(
        id: number | undefined = undefined,
        photo: string = '',
    ) {
        this.id = id;
        this.photo = photo;
    }
}
