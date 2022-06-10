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

// var f = document.getElementById('Punkt');
// document.addEventListener('click', function(ev){
//     f.style.transform = 'translateY('+(ev.clientY -25)+'px)';
//     f.style.transform += 'translateX('+(ev.clientX-25)+'px)';
// },false);

const stopRotate = (event) => {
  const move = event.target;
  const moveArea = document.querySelectorAll("header, header *, main, main *, aside, aside *");
  const rotaters = document.querySelectorAll(".drehmoment img");
  
  moveArea.forEach(elemArea => {
    if   (elemArea == move) 
    {rotaters.forEach(elem => elem.style.animation = "paused"); 
    /* console.log(elemArea, move) */ }
    else {rotaters.forEach(elem => elem.style.animation = "running");   
    console.log(elemArea, move) }
  })
  
  //if (move == moveArea /* || move == moveArea2  || move == moveArea3*/) {rotaters.forEach(elem => elem.style.animationPlayState = "paused")}
  //else {rotaters.forEach(elem => elem.style.animationPlayState = "running")}
}


document.addEventListener('mouseover', stopRotate);


