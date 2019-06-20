import {articleList} from "./list.js";
import {hideMenu} from "./menu-button.js";
import {subscribeUser} from "./subscriptions.js";


async function main(): Promise<void> {
  if (window.location.hash && window.location.hash.length > 1){
    await loadFromHash();
  }
  else {
    await loadLast5Articles();
  }
  setMenuItems("menu-items");
  setMenuItems("menu-button-items");
  subscribeUser();
}

function setMenuItems(menuId: string){
  const menuItems = document.getElementById(menuId);
  if (menuItems){
    menuItems.innerText = "";
    menuItems.appendChild(getLinkItem("Home", "#"));
    articleList.map((a) => {
      const li = getLinkItem(a.name);
      menuItems.appendChild(li);
    });
  }
}

function getLinkItem(name: string, link?: string | undefined){
  const a = document.createElement("a");
  a.href = link || ("#/" + getSafeTitle(name));
  a.innerText = name;
  const li = document.createElement("li");
  li.appendChild(a);
  return li;
}

async function loadLast5Articles(){
  const articles: Array<{title: string, div: HTMLDivElement}> = [];
  const articleDiv = document.getElementById("articles");
  if (!articleDiv){
    return;
  }
  articleDiv.innerText = "";
  const promises = articleList.map(async (a, i) => {
    const html = await getArticleHtml(a.file);
    articles.splice(i, 0, {title: a.name, div: getArticleDiv(a.name, html)});
    articles
      .filter((x, index) => index < 5)
      .map((x, index) => {
        if (index < 5){
          articleDiv.appendChild(x.div);
        }
      });
  });
  await Promise.all(promises);
}



function getArticleDiv(title: string, html: string): HTMLDivElement{
  const articleWrapper = document.createElement("div");
  articleWrapper.id = getSafeTitle(title);
  articleWrapper.innerHTML = html;
  articleWrapper.appendChild(document.createElement("hr"));
  articleWrapper.classList.add("article");
  return articleWrapper;
}


function getSafeTitle(title: string){
  title = title.replace(/\s/g, "_");
  return encodeURIComponent(title);
}

async function getArticleHtml(fileDir: string){
  const response = await fetch("./articles/" + fileDir);
  if (response.status === 200){
    const html = await response.text();
    return html;
  }
  else{
    return "";
  }
}


async function loadArticle(title: string): Promise<void>{
  const articleDiv = document.getElementById("articles");
  if (!articleDiv){
    return;
  }
  const articleEntry = articleList.find(x => getSafeTitle(x.name) === title);
  if (!articleEntry){
    articleDiv.innerText = "Uh-oh, couldn't find that article!";
    return;
  }
  const html = await getArticleHtml(articleEntry.file);
  const articleWrapper = getArticleDiv(articleEntry.name, html);
  articleWrapper.id = title;
  articleWrapper.innerHTML = html;
  articleDiv.innerText = "";
  articleDiv.appendChild(articleWrapper);
}

async function loadFromHash(): Promise<void>{
  const title = window.location.hash.substring(2);
  await loadArticle(title);
}

window.addEventListener("hashchange", () => {
  console.log("Hashchange");
  hideMenu();
  if (window.location.hash && window.location.hash.length > 2){
    loadFromHash();
  }
  else{
    loadLast5Articles();
  }
});


document.addEventListener("DOMContentLoaded", main);


