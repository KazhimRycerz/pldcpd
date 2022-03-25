"use strict";

//Datenerfassung
let myKF;
myKF = 120;
myKF += 12.5;
let myLF = 111;
let myPEX = 1524;
let myPED = 2400;
let myLP = 200;
let maKF = 120;
let maLF = 105;
let maPEX = 1950;
let maPED = 1500;
let maLP = 150;
let myLCoins = 1500;
myLCoins += 20;
let firstName = "Joachim";
let lastName = "Ritter";
/* const firstName = "Joachim";
  const lastName = "Ritter"; */
let myCL = "IV";
let boolVar = false;

// Ende Datenerfassung

function accountData() {
  document.getElementById("myKF").innerHTML = myKF;
  document.getElementById("myLF").innerHTML = myLF;
  document.getElementById("myPED").innerHTML = myPEX;
  document.getElementById("myPEX").innerHTML = myPED;
  document.getElementById("maKF").innerHTML = maKF;
  document.getElementById("maLF").innerHTML = maLF;
  document.getElementById("maPED").innerHTML = maPEX;
  document.getElementById("maPEX").innerHTML = maPED;
  document.getElementById("aside_guthaben").innerHTML = myLCoins;
}
accountData();

const home_aside_account = document.getElementById("home_aside_account");
const hide_btn = document.getElementById("aside_h_Btn");
const show_btn = document.getElementById("aside_s_Btn");

const hide_account = () => {
  home_aside_account.style.animation = "hideaside 3s ease-in-out forwards";
  /* home_aside_account.style.display = "none"; */
  hide_btn.style.display = "none";
  show_btn.style.display = "block";
};

const show_account = () => {
  home_aside_account.style.animation = "showaside 3s ease-in-out forwards";
  /* home_aside_account.style.display = "block"; */
  hide_btn.style.display = "block";
  show_btn.style.display = "none";
};

hide_btn.addEventListener("click", hide_account);
show_btn.addEventListener("click", show_account);
