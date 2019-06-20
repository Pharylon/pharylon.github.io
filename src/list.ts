export class Article {
    readonly name: string;
    readonly file: string;
    readonly date: string;
    constructor(name: string, file: string, date: string){
        this.name = name;
        this.file = file;
        this.date = date;
    }
}

/**
 * @type {Article[]}
 */
export const articleList: Article[] = [
    new Article("Mobile", "mobile.html", "2018-12-26"),
    new Article("More Blog Thoughts", "moreBlogThoughts.html", "2018-11-14"),
    new Article("I Made A Blog", "article1.html", "2018-11-13"),
    new Article("My Kids Are Cute", "myKids.html", "2018-11-12"),
];

