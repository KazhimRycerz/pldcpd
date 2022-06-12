const openNav = () => {
  document.getElementById("btn_nav_open").style.display = "none";
  document.getElementById("Gruß_main_h1").style.fontSize = "xxlarge"; 
  document.getElementById("btn_nav_close").style.display = "block";
  document.getElementById("navmain").style.top = "100px";
}

const closeNav = () => {
  document.getElementById("btn_nav_open").style.display = "block";
  document.getElementById("btn_nav_close").style.display = "none";
  document.getElementById("navmain").style.top = "-200px";
  document.getElementById("header").style.boxShadow = $boxshadow;
}

/* const stopRotate = (event) => {
  const move = event.target;
  const moveArea = document.querySelectorAll("main, main *, header, header *, aside, aside *");
  const rotaters = document.querySelectorAll(".drehmoment *");
  
  moveArea.forEach(elemArea => {
    if (elemArea == move)
    {rotaters.forEach(elem => elem.style.animation = "paused"); 
    console.log(elemArea, move)
     } else {rotaters.forEach(elem => elem.style.animation = "running"); console.log("check", elemArea, move)}
    })
} */

const stopRotate = (event) => {
  const move = event.target;
  const moveArea1 = document.querySelector("header");
  const moveArea2 = document.querySelector("main");
  const moveArea3 = document.querySelector("aside");
  const rotaters = document.querySelectorAll(".rotate");
  
  if (move == moveArea1 || move == moveArea2 || move == moveArea3) {rotaters.forEach(elem => elem.style.animationPlayState = "paused")}
  else {rotaters.forEach(elem => elem.style.animationPlayState = "running")}
}


document.addEventListener('mouseover', stopRotate); 
