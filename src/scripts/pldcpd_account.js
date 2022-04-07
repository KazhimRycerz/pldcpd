'use strict';

myKF += 10;

function accountData(){
  document.getElementById("myCL").innerHTML = myCL;
  document.getElementById("myLCoins").innerHTML = myLCoins;
  document.getElementById("myKF").innerHTML = myKF;
  document.getElementById("myLF").innerHTML = myLF;
  document.getElementById("myPEX").innerHTML = myPEX;
  document.getElementById("myPED").innerHTML = myPED;
  document.getElementById("maKF").innerHTML = maKF;
  document.getElementById("maLF").innerHTML = maLF;
  document.getElementById("maPEX").innerHTML = maPEX;
  document.getElementById("maPED").innerHTML = maPED;
  document.getElementById("myLP").innerHTML = myLP;
  document.getElementById("maLP").innerHTML = maLP;
  document.getElementById("aside_Guthaben_p").innerHTML = myLCoins;
}
accountData();

const accountAsideAccount = document.getElementById("account_aside_account");
const accountHideButton = document.getElementById("account_aside_h_Btn");
const accountShowButton = document.getElementById("account_aside_s_Btn");

const hideAccountInfo = () => {
  accountAsideAccount.style.animation = "hide_account_aside 2s ease-in-out forwards";
  accountShowButton.style.animation = "moveAsideButton 1s 0s ease-in-out forwards";
  accountHideButton.style.animation = "moveAsideButton 1s 0s ease-in-out forwards";
  accountHideButton.style.display = "none";
  accountShowButton.style.display = "block";
};

const showAccountInfo = () => {
  accountHideButton.style.display = "block";
  accountShowButton.style.display = "none";
  accountHideButton.style.animation = "moveAsideButtonback 1s ease-in-out forwards";
  accountAsideAccount.style.animation = "show_account_aside 2s ease-in-out forwards";
   
};

accountHideButton.addEventListener("click", hideAccountInfo);
accountShowButton.addEventListener("click", showAccountInfo);
