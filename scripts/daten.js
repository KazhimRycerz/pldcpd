const datenJR= {
  myKF: 120,
  myKF: 12.5,
  myLF: 111,
  myPEX: 1524,
  myPED: 2400,
  myLP: 200,
  maKF: 120,
  maLF: 105,
  maPEX: 1950,
  maPED: 1500,
  maLP: 150,
  myLCoins: 1500,
  myLCoins: 20,
  firstName: "Joachim",
  lastName: "Ritter",
  myCL: "IV",
  boolVar: false}

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


//export{accountData, datenJR}