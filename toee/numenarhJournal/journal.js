
document.addEventListener("DOMContentLoaded", function () {
    const menu = document.getElementById("menu");
    const sections = [...document.getElementsByClassName("entry")];
    sections.forEach((section, i) => {
        const span = document.createElement("span");
        const anchor = document.createElement("a");
        anchor.href = ("#" + section.id);
        anchor.innerText = ("Entry " + section.id.replace("entry", ""));
        anchor.classList.add("entry-menu-item");
        span.appendChild(anchor);
        if (i < sections.length - 1) {
            span.appendChild(getDelimeter());
        }
        menu.appendChild(span);
    });
});

function getDelimeter() {
    const span = document.createElement("span");
    span.innerText = "|";
    span.classList.add("delimiter");
    return span;
}

function handwriting(myBool) {
    const myDiv = document.getElementById("journal");
    if (myBool){
        myDiv.classList.add("handwriting");
    }
    else{
        myDiv.classList.remove("handwriting");
    }
}