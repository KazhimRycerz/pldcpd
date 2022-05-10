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

var f = document.getElementById('Punkt');
document.addEventListener('click', function(ev){
    f.style.transform = 'translateY('+(ev.clientY -25)+'px)';
    f.style.transform += 'translateX('+(ev.clientX-25)+'px)';
},false);


