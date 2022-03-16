"use strict";

//Datenerfassung
  let myKF = 120;
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
  let myLCoins = 150; 
  myLCoins += 20;
  const firstName = "Joachim";
  const lastName = "Ritter";
  let myCL = "IV";
  
// Ende Datenerfassung

function accountData(){
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

document.getElementById("myCL").innerHTML = myCL;
document.getElementById("myLCoins").innerHTML = myLCoins;


function reusableFunction() {
  console.log("Hi World");
  reusableFunction();
  }


  // querySelectorAll sammelt alle Elemente mit der Klasse .slide
const slides = document.querySelectorAll('#slides .slide');
let currentSlide = 0;

// setInterval() steuert eine Javascript-Animation
const slideInterval = setInterval(nextSlide,2000);

function nextSlide() {
	slides[currentSlide].className = 'slide';
	currentSlide = (currentSlide+1) % slides.length;
	slides[currentSlide].className = 'slide showing';
}

function hide_account() {
  var x = document.onclick("aside_h_Btn");
  x.hidden = true;
}