const menuButton = document.getElementById("menu-button");
const menuItems = document.getElementById("menu-button-items");
document.addEventListener("DOMContentLoaded", () => {
    if (menuButton) {
        menuButton.onclick = toggleMenu;
    }
});
function toggleMenu() {
    if (!menuItems) {
        return;
    }
    if (window.getComputedStyle(menuItems).display === "none") {
        menuItems.style.display = "block";
    }
    else {
        hideMenu();
    }
}
export function hideMenu() {
    if (menuItems) {
        menuItems.style.display = "none";
    }
}
