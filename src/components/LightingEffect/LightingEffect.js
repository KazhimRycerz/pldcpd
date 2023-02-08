import React from "react";
import './LightingEffect.scss';
import GlitterIMG from "../../images/silver-glitter-background.png"

// 👆 mouse-move following code
const movePointer = (e) => {
    interacted = true;
    const { x, y } = e.nativeEvent;
    const BOX = e.target.getBoundingClientRect();
    const POINT = { x: x - BOX.x, y: y - BOX.y };
    const RATIO = { x: POINT.x / BOX.width, y: POINT.y / BOX.height };
    const CENTER = fromCenter( RATIO );
    // set some css variables referenced in css
    e.target.style.setProperty( "--ratio-x", RATIO.x );
    e.target.style.setProperty( "--ratio-y", RATIO.y );
    e.target.style.setProperty( "--from-center", CENTER );
};

// maths 🤷‍♀️
function fromCenter({ x, y }) {
    return Math.min(Math.max( 0, Math.sqrt( (y - .5) * (y - .5) + (x  - .5) * (x - .5) ) / .5 ), 1 );
}

let interacted = false;

const imgFunction = () => {
    // ⏰ lazy load triggers opacity  
    document.querySelector("#glitter").classList.remove("loading");
    
    // ✨ little intro demo animation 
    
    const appElement = document.querySelector("#glitter");
    let start = null;
    
    function step(timestamp) {
      if (!start) start = timestamp;
      let progress = timestamp - start;
      let val = (Math.PI * 3 * progress) / 8000;
      if (!interacted) {
        appElement.style.setProperty("--ratio-x", (Math.cos(val) + 1.5) / 3);
        appElement.style.setProperty("--ratio-y", (Math.sin(val) + 2) / 4);
      }
      if (progress < 8000) {
        window.requestAnimationFrame(step);
      }
    }
    
    window.requestAnimationFrame(step);
  };


function LightingEffect() {
  return (
    <div className="glitter">
      <section id="glitter" className="loading" onMouseMove={movePointer}>
        <svg viewBox="-50 0 100 20">
          <text x="0" y="15"> lighting design </text>
        </svg>
      <img src="https://assets.codepen.io/13471/silver-glitter-background.png" loading="lazy" alt="Glitter Background" onLoad={imgFunction} />
      </section>
    </div>
  );
}

export default LightingEffect;


