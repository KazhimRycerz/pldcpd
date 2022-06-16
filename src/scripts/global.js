

// event open and close MainNavigation

const openNav = () => {
  openMainNav.style.display = "none";
  closeMainNav.style.display = "block";
  navMain.style.top = "100px";
  navMain.style.transition = "0.5s ease-in-out";
  homeAside.style.animation = "hide_home_aside"
}

const closeNav = () => {
  openMainNav.style.display = "block";
  closeMainNav.style.display = "none";
  navMain.style.top = "-500px";
  header.style.boxShadow = $boxshadow;
}

const openMainNav = document.querySelector("#btn_nav_open")
openMainNav.addEventListener('click', openNav);

const closeMainNav = document.querySelector('#btn_nav_close');
closeMainNav.addEventListener('click', closeNav)

const closingNav = document.querySelectorAll(".closebtn")
closingNav.forEach(elem => elem.addEventListener('click', closeNav))

const navMain = document.querySelector("#navmain")
const header = document.querySelector("header")
const homeAside = document.querySelector("home_aside_account")



// stop rotate event

const stopRotate = (event) => {
  const move = event.target;
  
  const rotaters = document.querySelectorAll(".rotate");
  
  if (move.closest("header") || move.closest("main") || move.closest("aside")) {rotaters.forEach(elem => elem.style.animationPlayState = "paused")}
  else {rotaters.forEach(elem => elem.style.animationPlayState = "running")}
}

document.addEventListener('mouseover', stopRotate); 



// show and Hide aside
const homeAsideAccount = document.querySelector("#home_aside_account");
const hideButton = document.querySelector("#home_aside_h_Btn");
const showButton = document.querySelector("#home_aside_s_Btn");

const hideAccount = () => {
  homeAsideAccount.style.animation = "hide_home_aside 2s ease-in-out forwards";
  showButton.style.animation = "moveButton 1s 0s ease-in-out forwards";
  hideButton.style.animation = "moveButton 1s 0s ease-in-out forwards";
  hideButton.style.display = "none";
  showButton.style.display = "block";
  Gruß_main_p.style.right = "3vw";
  C1.style.left = "1.7vw"; //4
  C1.style.width = "98%"; //4
};

const showAccount = () => {
  hideButton.style.display = "block";
  showButton.style.display = "none";
  hideButton.style.animation = "moveButtonback 1s ease-in-out forwards";
  homeAsideAccount.style.animation = "show_home_aside 2s ease-in-out forwards";
  homeAsideAccount.style.display ="block"
  Gruß_main_p.style.right = "10vw";
  C1.style.left = "-1.5vw";
  C1.style.width = "100%"; //4
};

hideButton.addEventListener("click", hideAccount);
showButton.addEventListener("click", showAccount);

window.onload = function() {
  hideAccount()
};