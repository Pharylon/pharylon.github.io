import articleList from "./list.js";

async function main() {
  if (window.location.hash){
    await loadFromHash();
  }
  else{
    await loadLast5Articles();
  }  
  setMenuItems();
}

function setMenuItems(){
  const menuItems = document.getElementById("menu-items");
  menuItems.innerText = "";
  menuItems.appendChild(getLinkItem("Home", "#"))
  articleList.map((a) => {
    const li = getLinkItem(a.name);
    menuItems.appendChild(li);
  });
  
}

function getLinkItem(name, link){
  const a = document.createElement("a");
  a.href = link || ("#_" + getSafeTitle(name));
  a.innerText = name;
  const li = document.createElement("li");
  li.appendChild(a);
  return li;
}

async function loadLast5Articles(){
  const articles = [];
  const promises = articleList.map(async (a, i) => {
    const html = await getArticleHtml(a.file);
    document.getElementById("articles").innerText = "";
    articles.splice(i, 0, {title: a.name, div: getArticleDiv(a.name, html)});
    articles
      .filter((x, i) => i < 5)
      .map((x, i) => {
        if (i < 5){
          document.getElementById("articles").append(x.div);
        }        
      }); 
  });
  await Promise.all(promises);
  //Prism is a global. It highlights code syntax.
  Prism.highlightAll();
}


/**
 * @param {string} title 
 * @param {string} html 
 * @returns {HTMLDivElement} Article
 */
function getArticleDiv (title, html){
  const articleWrapper = document.createElement("div");
  articleWrapper.id = getSafeTitle(title);
  articleWrapper.innerHTML = html;
  articleWrapper.appendChild(document.createElement("hr"));
  articleWrapper.classList.add("article");
  return articleWrapper;
}


function getSafeTitle(title){
  title = title.replace(/\s/g, "_");
  return encodeURIComponent(title);
}

async function getArticleHtml(fileDir){
  const response = await fetch("./articles/" + fileDir);
  if (response.status === 200){
    const html = await response.text();
    return html;
  }
  else{
    return "";
  }
}

/**
 * @param {string} title 
 * @param {string} html 
 * @returns {HTMLDivElement} Article
 */
async function loadArticle (title){
  const articleDiv = document.getElementById("articles");
  const articleEntry = articleList.find(x => getSafeTitle(x.name) === title);
  if (!articleEntry){
    articleDiv.innerText = "Uh-oh, couldn't find that article!";
    set
  }
  const html = await getArticleHtml(articleEntry.file);
  const articleWrapper = getArticleDiv(articleEntry.name, html);
  articleWrapper.id = title;
  articleWrapper.innerHTML = html;
  articleDiv.innerText = "";
  articleDiv.appendChild(articleWrapper);
}

async function loadFromHash(){
  const title = window.location.hash.substring(2);
  await loadArticle(title);
  //Prism is a global. It highlights code syntax.
  Prism.highlightAll();
}

window.addEventListener("hashchange", () => {
  if (window.location.hash && window.location.hash.length > 2){
    loadFromHash();
  }
  else{
    loadLast5Articles();
  }
});


main();


