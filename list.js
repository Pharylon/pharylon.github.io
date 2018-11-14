export class Article{
    constructor(name, file, date){
        this.name = name;
        this.file = file;
        this.date = date;
    }
}

/**
 * @type {Article[]}
 */
export const articleList = [
    new Article("More Blog Thoughts", "moreBlogThoughts.html", "2018-11-14"),
    new Article("I Made A Blog", "article1.html", "2018-11-13"),
    new Article("My Kids Are Cute", "myKids.html", "2018-11-12")
]

