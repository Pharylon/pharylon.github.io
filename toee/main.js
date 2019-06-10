async function loadFromHash() {
  const file = await getFileToLoadFromHash();
  await loadFile(file);
  setJournalMenu();
}


async function getFileToLoadFromHash() {
  if (!window.location.hash) {
    return "main.htm";
  }
  let file = window.location.hash.substring(1);
  if (file.startsWith("/")) {
    file = file.substring(1);
  }
  if (!file) {
    return "main.htm";
  }
  if (!file.includes(".htm")) {
    file += ".htm";
  }
  return file;
}


/**
 * @param {string} title 
 * @param {string} html 
 * @returns {HTMLDivElement} Article
 */
async function loadFile(fileName) {
  const html = await getFileHtml(fileName);
  document.getElementById("main").innerHTML = html;
}

async function getFileHtml(fileDir) {
  const response = await fetch("./" + fileDir);
  if (response.status === 200) {
    const html = await response.text();
    return html;
  }
  else {
    return "";
  }
}


window.addEventListener("hashchange", loadFromHash);
document.addEventListener("DOMContentLoaded", loadFromHash);


function setJournalMenu() {
  const menu = document.getElementById("journal-menu");
  if (menu) {
    const sections = [...document.getElementsByClassName("entry")];
    sections.forEach((section, i) => {
      const fakeAnchor = document.createElement("div");
      fakeAnchor.innerText = ("Entry " + section.id.replace("entry", ""));
      fakeAnchor.classList.add("entry-menu-item");
      fakeAnchor.onclick = () => section.scrollIntoView({behavior: "smooth"})
      menu.appendChild(fakeAnchor);
      // if (i < sections.length - 1) {
      //   menu.appendChild(getDelimiter());
      // }
    });
  }
}

// function getDelimiter() {
//   const span = document.createElement("span");
//   span.innerText = "|";
//   span.classList.add("delimiter");
//   return span;
// }

function handwriting(myBool) {
  const myDiv = document.getElementById("journal");
  if (myBool) {
    myDiv.classList.add("handwriting");
  }
  else {
    myDiv.classList.remove("handwriting");
  }
}

function hideMenu(){
  document.getElementById("main-menu").style.display = "none";
  document.getElementById("hamburger").style.display = "block";
}

function showMenu(){
  document.getElementById("main-menu").style.display = "block";
  document.getElementById("hamburger").style.display = "none";
}