export class PhotoModel {
    id?: number;
    photo: string;

    constructor(){
        this.id = undefined;
        this.photo = '';
    }

    start(id: number | undefined, photo: string) {
        this.id = id;
        this.photo = photo;
    }
}
