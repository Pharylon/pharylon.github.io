export class Article {
    constructor(name, file, date) {
        this.name = name;
        this.file = file;
        this.date = date;
    }
}
/**
 * @type {Article[]}
 */
export const articleList = [
    new Article("D&D Beyond", "dndBeyond.html", "2019-10-20"),
    new Article("Spellbook", "spellbook.html", "2019-10-18"),
    new Article("My Dream", "dream.html", "2019-10-06"),
    //new Article("WIP", "wip.html", "2019-08-08"),
    //new Article("Mobile", "mobile.html", "2018-12-26"),
    //new Article("More Blog Thoughts", "moreBlogThoughts.html", "2018-11-14"),
    new Article("I Made A Blog", "article1.html", "2018-11-13"),
    new Article("My Kids Are Cute", "myKids.html", "2018-11-12"),
];
