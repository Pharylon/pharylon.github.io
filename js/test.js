

async function main() {
  console.log("TEST");
  const post = document.getElementsByClassName("post");
  const loadedHtml = post[0].innerHTML;

  const template = await getMainTemplate();
  document.body.innerHTML = template;

}


async function getMainTemplate() {
  const response = await fetch("../index.html");
  if (response.status === 200) {
    const html = await response.text();
    console.log("HTML", html);
    return html;
  }
  else {
    console.log("ERROR", response.status);
    return "";
  }
}

main();
