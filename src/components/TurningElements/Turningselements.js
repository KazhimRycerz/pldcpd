import drehmoment2 from "../../images/drehmoment2.png";
//import drehmoment1 from "../../images/finger-print-outline.svg";
import "./TurningElements.scss";
import { useEffect } from "react";

const TurningElements = () => {
  let stopRotate;
  const rotatingManager = () => {
      stopRotate = (event) => {
      const move = event.target;

      const rotaters = document.querySelectorAll(".rotate");

      if (
        move.closest("header") ||
        move.closest("main") ||
        move.closest("aside")
      ) {
        rotaters.forEach((elem) => (elem.style.animationPlayState = "paused"));
      } else {
        rotaters.forEach((elem) => (elem.style.animationPlayState = "running"));
      }
    };

    document.addEventListener("mouseover", stopRotate);
  };
  
  useEffect(() => {
    rotatingManager();
    return () => {
      document.removeEventListener("mouseover", stopRotate);
    };
  }, []);
  return (
    <div onMouseEnter className="drehmoment" >
      <img src={drehmoment2} id="r1" className="rotate" alt="" />
      <img src={drehmoment2} id="r2" className="rotate" alt="" />
      <img src={drehmoment2} id="r3" className="rotate" alt="" />
      <img src={drehmoment2} id="r4" className="rotate" alt="" />
      <img src={drehmoment2} id="r5" className="rotate" alt="" />
      <img src={drehmoment2} id="r6" className="rotate" alt="" />
      <img src={drehmoment2} id="r7" className="rotate" alt="" />
      <img src={drehmoment2} id="r8" className="rotate" alt="" />
      <img src={drehmoment2} id="r9" className="rotate" alt="" />
      <img src={drehmoment2} id="r10" className="rotate" alt="" />
      <img src={drehmoment2} id="r11" className="rotate" alt="" />
      <img src={drehmoment2} id="r12" className="rotate" alt="" />
      <img src={drehmoment2} id="r13" className="rotate" alt="" />
      <img src={drehmoment2} id="r14" className="rotate" alt="" />
      <img src={drehmoment2} id="r15" className="rotate" alt="" />
      <img src={drehmoment2} id="r16" className="rotate" alt="" />
      <img src={drehmoment2} id="r17" className="rotate" alt="" />
      <img src={drehmoment2} id="r18" className="rotate" alt="" />
      <img src={drehmoment2} id="r19" className="rotate" alt="" />
      <img src={drehmoment2} id="r20" className="rotate" alt="" />
      <img src={drehmoment2} id="r21" className="rotate" alt="" />
    </div>
  );
};

export default TurningElements;
