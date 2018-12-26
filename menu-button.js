const menuButton = document.getElementById("menu-button");
menuButton.onclick = toggleMenu;
const menuItems = document.getElementById("menu-button-items");

function toggleMenu(){
  
  if (window.getComputedStyle(menuItems).display === "none"){
    menuItems.style.display = "block";
  }
  else{
    hideMenu();
  }  
}

export function hideMenu(){
  menuItems.style.display = "none";
}
