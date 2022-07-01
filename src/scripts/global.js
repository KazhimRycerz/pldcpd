// mainnavigation über Toggle öffnen und schließen

const burgerMenu = document.querySelector("#burger-menu");
const navMain = document.querySelector("#navmain");
let flag = false;

function navigationShow() {
  burgerMenu.classList.toggle("changeBurger");
  if (flag) {
    navMain.classList.toggle("hideNav");
  } else {
    navMain.classList.toggle("showNav");
    flag = true;
  }
  //flag = ! flag;
}

burgerMenu.addEventListener("click", navigationShow);

//______________stop rotate event_______________________________________//

const stopRotate = (event) => {
  const move = event.target;

  const rotaters = document.querySelectorAll(".rotate");

  if (move.closest("header") || move.closest("main") || move.closest("aside")) {
    rotaters.forEach((elem) => (elem.style.animationPlayState = "paused"));
  } else {
    rotaters.forEach((elem) => (elem.style.animationPlayState = "running"));
  }
};

document.addEventListener("mouseover", stopRotate);

//______________onload_______________________________________//

/* window.onload = function() {

}; */

//______________Login ==> show account button_______________________________________//

const  logInExecute =  () => {
    //console.log(logInOut.textContent);
  if (logInOut.textContent == "log me in ") {
    
    buttonShowAccount.style.zIndex = "0";
    buttonShowAccount.style.display = "inline-block";
    user.style.display= "inline-block";
    logInOut.textContent = "log me out ";
  } else if (logInOut.textContent == "log me out ") {
    buttonShowAccount.style.animation ="moveButtonBack 1s ease-in-out forwards";
    buttonShowAccount.textContent = "show account";
    buttonShowAccount.style.zIndex = "0";
    buttonShowAccount.style.display = "none";
    homeAsideAccount.style.animation =
    "hide_home_aside 2s ease-in-out forwards";
    gruß.style.right = "4vw"; 
    C1.style.left = "0px";
    user.style.display= "none";
    logInOut.textContent = "log me in ";
  } else {alert("Ein Fehler ist aufgetreten")}
};

//______________show account and move Button_______________________________________//

const showAccountHome = () => {
  if (buttonShowAccount.textContent == "show account") {
    buttonShowAccount.style.animation = "moveButtonback 1s ease-in-out forwards";
    homeAsideAccount.style.animation = "show_home_aside 2s ease-in-out forwards";
    homeAsideAccount.style.display = "block";
    gruß.style.right = "10vw";
    C1.style.left = "-2.5vw";
    buttonShowAccount.textContent = "hide account";
    console.log("Ergebnis if")
  } else if (buttonShowAccount.textContent == "hide account"){
    homeAsideAccount.style.animation = "hide_home_aside 2s ease-in-out forwards";
    buttonShowAccount.style.animation = "moveButton 1s 0s ease-in-out forwards";
    gruß.style.right = "4vw";
    C1.style.left = "0px"; //4
    C1.style.margin = "60px auto"; //4
    buttonShowAccount.textContent = "show account";
    console.log("Ergebnis else if")
  } else {alert("Ein Fehler ist aufgetreten")}
};

const homeAsideAccount = document.querySelector("#home_aside_account");
const showLogin = document.querySelector("#showlogin");
showLogin.addEventListener("click", logInExecute);
const logInOut = document.querySelector("#logInOut");
const buttonShowAccount = document.querySelector("#buttonShowAccount");
buttonShowAccount.addEventListener("click", showAccountHome);
console.log(buttonShowAccount.textContent)
const gruß = document.querySelector("#Gruß_main_p");
const C1 = document.querySelector("#C1");
const user = document.querySelector("#user");
const moveButtonBack = document.querySelector("moveButtonback");


/* function navigationShow() {
  burgerMenu.classList.toggle("changeBurger");
  if (flag) {
    navMain.classList.toggle("hideNav");
  } else {
    navMain.classList.toggle("showNav");
    flag = true;
  }
  //flag = ! flag;
} */