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


const stopRotate = (event) => {
  const move = event.target;
  
  const rotaters = document.querySelectorAll(".rotate");
  
  if (move.closest("header") || move.closest("main") || move.closest("aside")) {rotaters.forEach(elem => elem.style.animationPlayState = "paused")}
  else {rotaters.forEach(elem => elem.style.animationPlayState = "running")}
}

document.addEventListener('mouseover', stopRotate); 

/* const manageMainNavigator = (event) => {
  const navmain = document.querySelectorall("#navmain a, #btn_nav_close");
  document.getElementById("btn_nav_open").style.display = "block";
  document.getElementById("btn_nav_close").style.display = "none";
  document.getElementById("navmain").style.top = "-200px";
  document.getElementById("header").style.boxShadow = $boxshadow;

}
document.addEventListener('click', manageMainNavigator);  */