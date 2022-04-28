const openNav = () => {
  document.getElementById("mySidenav").style.left = "20px";
  document.getElementById("main").style.marginLeft = "-150px";
  document.getElementById("Gruß_main_h1").style.left = "8vw";

  /* document.body.style.backgroundColor = "rgba(0,0,0,0.4)"; */
}

const closeNav = () => {
  document.getElementById("mySidenav").style.left = "-550px";
  document.getElementById("main").style.marginLeft = "1vw";
  document.getElementById("Gruß_main_h1").style.left = "4vw";
  /* document.body.style.backgroundColor = "white"; */
}

/* 
const hideAccount = () => {
  homeAsideAccount.style.animation = "hide_home_aside 2s ease-in-out forwards";
  showButton.style.animation = "moveButton 1s 0s ease-in-out forwards";
  hideButton.style.animation = "moveButton 1s 0s ease-in-out forwards";
  hideButton.style.display = "none";
  showButton.style.display = "block";
}; */