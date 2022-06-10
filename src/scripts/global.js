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

// const cClass =document.querySelectorAll("C");
// cClass.forEach(elem => document.addEventListener('click', closeNav))
// document.addEventListener('click', closeNav)

// var f = document.getElementById('Punkt');
// document.addEventListener('click', function(ev){
//     f.style.transform = 'translateY('+(ev.clientY -25)+'px)';
//     f.style.transform += 'translateX('+(ev.clientX-25)+'px)';
// },false);


const stopRotate = (event) => {
  const move = event.currentTarget;
  const moveArea1 = document.querySelector("header");
  const moveArea2 = document.querySelector("main");
  const moveArea3 = document.querySelector("aside");
  const rotaters = document.querySelectorAll(".rotate");
  console.log(move, moveArea1, moveArea2)
  if (move == moveArea1 || move == moveArea2 || move == moveArea3) 
  {rotaters.forEach(elem => elem.style.animationPlayState = "paused")}
  else {rotaters.forEach(elem => elem.style.animationPlayState = "running")}
}

//capturing??
document.addEventListener('mouseover', stopRotate);
