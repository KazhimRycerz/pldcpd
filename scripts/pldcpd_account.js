'use strict';

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
const accountHideBtn = document.getElementById("account_aside_h_Btn");
const accountShowBtn = document.getElementById("account_aside_s_Btn");

const hideAccountInfo = () => {
  accountAsideAccount.style.animation = "hide_account_aside 3s ease-in-out forwards";
  /* home_aside_account.style.display = "none"; */
  accountHideBtn.style.display = "none";
  accountShowBtn.style.display = "block";
};

const showAccountInfo = () => {
  accountAsideAccount.style.animation = "show_account_aside 3s ease-in-out forwards";
  /* home_aside_account.style.display = "block"; */
  accountHideBtn.style.display = "block";
  accountShowBtn.style.display = "none";
};

accountHideBtn.addEventListener("click", hideAccountInfo);
accountShowBtn.addEventListener("click", showAccountInfo);
