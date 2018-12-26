import {articleList} from "./list.js";
import {hideMenu} from "./menu-button.js";



async function main() {
  if (window.location.hash && window.location.hash.length > 1){
    await loadFromHash();
  }
  else{
    await loadLast5Articles();
  } 
  setMenuItems("menu-items");
  setMenuItems("menu-button-items");
}

function setMenuItems(menuId){
  const menuItems = document.getElementById(menuId);
  menuItems.innerText = "";
  menuItems.appendChild(getLinkItem("Home", "#"))
  articleList.map((a) => {
    const li = getLinkItem(a.name);
    menuItems.appendChild(li);
  });
  
}

function getLinkItem(name, link){
  const a = document.createElement("a");
  a.href = link || ("#/" + getSafeTitle(name));
  a.innerText = name;
  const li = document.createElement("li");
  li.appendChild(a);
  return li;
}

async function loadLast5Articles(){
  const articles = [];
  const articleDiv = document.getElementById("articles");
  articleDiv.innerText = "";
  const promises = articleList.map(async (a, i) => {
    const html = await getArticleHtml(a.file);
    articles.splice(i, 0, {title: a.name, div: getArticleDiv(a.name, html)});
    articles
      .filter((x, i) => i < 5)
      .map((x, i) => {
        if (i < 5){
          articleDiv.appendChild(x.div);
        }        
      }); 
  });
  await Promise.all(promises);
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
}

window.addEventListener("hashchange", () => {
  console.log("Hashchange")
  hideMenu();
  if (window.location.hash && window.location.hash.length > 2){
    loadFromHash();
  }
  else{
    loadLast5Articles();
  }
});


main();


