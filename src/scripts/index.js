"use strict";

myKF = 120;
myKF += 12.5;
myLF = 111;
myPEX = 1524;
myPED = 2400;
myLP = 200;
maKF = 120;
maLF = 105;
maPEX = 1950;
maPED = 1500;
maLP = 150;
myLCoins = 1500;
myLCoins += 20;
firstName = "Joachim";
lastName = "Ritter";
/* const firstName = "Joachim";
  const lastName = "Ritter"; */
myCL = "IV";
boolVar = false;

// Ende Datenerfassung

const accountData =()=> {
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

const homeAsideAccount = document.getElementById("home_aside_account");
const hideButton = document.getElementById("home_aside_h_Btn");
const showButton = document.getElementById("home_aside_s_Btn");

const hideAccount = () => {
  homeAsideAccount.style.animation = "hide_home_aside 2s ease-in-out forwards";
  showButton.style.animation = "moveButton 1s 0s ease-in-out forwards";
  hideButton.style.animation = "moveButton 1s 0s ease-in-out forwards";
  hideButton.style.display = "none";
  showButton.style.display = "block";
  Gruß_main_p.style.right = "4vw";
  //C1.style.left = "4vw";
};

const showAccount = () => {
  hideButton.style.display = "block";
  showButton.style.display = "none";
  hideButton.style.animation = "moveButtonback 1s ease-in-out forwards";
  homeAsideAccount.style.animation = "show_home_aside 2s ease-in-out forwards";
  Gruß_main_p.style.right = "10vw";
  C1.style.left = "0";
 };

hideButton.addEventListener("click", hideAccount);
showButton.addEventListener("click", showAccount);

