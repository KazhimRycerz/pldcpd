window.onload = function() {
  init();
  etwasAnderesTun();
};


// event open and close Mainnavigation

const openNav = () => {
  openMainNav.style.display = "none";
  closeMainNav.style.display = "block";
  navMain.style.top = "100px";
  navMain.style.transition = "0.3s ease-in-out";
  //homeAside.style.animation = "hide_home_aside"
}

const closeNav = () => {
  openMainNav.style.display = "block";
  closeMainNav.style.display = "none";
  navMain.style.top = "-200px";
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








const stopRotate = (event) => {
  const move = event.target;
  
  const rotaters = document.querySelectorAll(".rotate");
  
  if (move.closest("header") || move.closest("main") || move.closest("aside")) {rotaters.forEach(elem => elem.style.animationPlayState = "paused")}
  else {rotaters.forEach(elem => elem.style.animationPlayState = "running")}
}

document.addEventListener('mouseover', stopRotate); 

/* const manageMainNavigator = (event) => {
  const navmain = document.querySelectorall("#navmain a, #btn_nav_close");
  document.getElementById("btn_nav_open").style.display = "block";
  document.getElementById("btn_nav_close").style.display = "none";
  document.getElementById("navmain").style.top = "-200px";
  document.getElementById("header").style.boxShadow = $boxshadow;

}
document.addEventListener('click', manageMainNavigator);  */