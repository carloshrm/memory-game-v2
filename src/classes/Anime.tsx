export default class Anime {
    readonly title: string;
    readonly coverImgURL: string;
    readonly malID: number;
    readonly link: string;
    
    constructor(title: string, cover: string, id: number, link: string)
    {
        this.coverImgURL = cover;
        this.title = title;
        this.malID = id;
        this.link = link;
    }
}