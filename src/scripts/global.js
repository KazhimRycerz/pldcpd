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

const moveAccountAndButton = () => {
  if (buttonShowAccount.textContent == "show account") {
    showAccount();
  } else if (buttonShowAccount.textContent == "hide account") {
    hideAccount();
  } else {
    alert("Ein Fehler ist aufgetreten");
  }
};

const showAccount = () => {
  buttonShowAccount.style.animation = "moveButtonback 1s ease-in-out forwards";
  homeAsideAccount.style.animation = "show_home_aside 2s ease-in-out forwards";
  homeAsideAccount.style.display = "block";
  gruß.style.right = "10vw";
  C1.style.left = "-2.5vw";
  buttonShowAccount.textContent = "hide account";
};
const hideAccount = () => {
  homeAsideAccount.style.animation = "hide_home_aside 2s ease-in-out forwards";
  buttonShowAccount.style.animation = "moveButton 1s 0s ease-in-out forwards";
  gruß.style.right = "4vw";
  C1.style.left = "0px"; //4
  C1.style.margin = "60px auto"; //4
  buttonShowAccount.textContent = "show account";
};

//______________Login ==> manage account button_______________________________________//

const handleButton = () => {
  if (flagButton && buttonShowAccount.textContent == "show account") {
    console.log(
      flagButton,
      logInOut.textContent,
      buttonShowAccount.textContent
    );
    buttonShowAccount.classList.replace("hideBut", "showBut");
    logInOut.textContent = "log me out ";
    //user.style.display= "inline-block";
    flagButton = false;
  } else if (!flagButton && buttonShowAccount.textContent == "show account") {
    console.log(
      flagButton,
      logInOut.textContent,
      buttonShowAccount.textContent
    );
    buttonShowAccount.classList.replace("showBut", "hideBut");
    logInOut.textContent = "log me in ";
    //user.style.display= "none";
    flagButton = true;
  } else if (!flagButton && buttonShowAccount.textContent == "hide account") {
    const promise = new Promise((resolve, reject) => {
      resolve(hideAccount());
    });
    promise.then((result) => handleButton());
    console.log(
      "test",
      flagButton,
      logInOut.textContent,
      buttonShowAccount.textContent
    );
  } else {
    alert("Ein Fehler ist aufgetreten");
  }
  console.log(flagButton, logInOut.textContent, buttonShowAccount.textContent);
};

let flagButton = true;
const homeAsideAccount = document.querySelector("#home_aside_account");
const showLogin = document.querySelector("#showlogin");
const logInOut = document.querySelector("#logInOut");
const buttonShowAccount = document.querySelector("#buttonShowAccount");
const gruß = document.querySelector("#Gruß_main_p");
const C1 = document.querySelector("#C1");
const user = document.querySelector("#user");
showLogin.addEventListener("click", handleButton);
buttonShowAccount.addEventListener("click", moveAccountAndButton);
