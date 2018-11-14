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
const articleList = [
    new Article("I Made A Blog", "article1.html", "2018-11-13"),
    new Article("My Kids Are Cute", "article2.html", "2018-11-12")
]

export default articleList;