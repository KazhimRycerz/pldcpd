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


const account_aside_account = document.getElementById("account_aside_account");
const account_hide_btn = document.getElementById("account_aside_h_Btn");
const account_show_btn = document.getElementById("account_aside_s_Btn");

const hide_account_info = () => {
  account_aside_account.style.animation = "hide_account_aside 3s ease-in-out forwards";
  /* home_aside_account.style.display = "none"; */
  account_hide_btn.style.display = "none";
  account_show_btn.style.display = "block";
};

const show_account_info = () => {
  account_aside_account.style.animation = "show_account_aside 3s ease-in-out forwards";
  /* home_aside_account.style.display = "block"; */
  account_hide_btn.style.display = "block";
  account_show_btn.style.display = "none";
};

account_hide_btn.addEventListener("click", hide_account_info);
account_show_btn.addEventListener("click", show_account_info);
