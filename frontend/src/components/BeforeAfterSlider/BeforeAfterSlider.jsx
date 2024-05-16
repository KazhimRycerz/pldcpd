
import React, { useRef, useState, useEffect } from 'react';
import { CaretLeftFilled, CaretRightFilled } from "@ant-design/icons";
import './BeforeAfterSlider.scss'; // Stildefinitionen

const BeforeAfterSlider = ({ beforeImage, afterImage, size, leftCorrection, topCorrection }) => {

  const [position, setPosition] = useState(100); // Startposition des Sliders (50%)
  const [dragging, setDragging] = useState(false); // Zustand, der angibt, ob der Slider gerade gezogen wird
  const containerRef = useRef(null);
  const [imageHeight, setImageHeight] = useState(300); // Standardhöhe
  const beforeImageRef = useRef(null);
    

  
  
  useEffect(() => {
    const handleDrag = (e) => {
      if (dragging) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const newPosition = ((e.clientX - containerRect.left) / containerRect.width) * 100;
        
        // Begrenze die Position zwischen 0% und 100%
        const clampedPosition = Math.min(Math.max(newPosition, -0.3), 100);
        
        setPosition(clampedPosition); // Neue Position setzen
      }
    };

    const handleDragEnd = () => {
      setDragging(false);
    };

    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', handleDragEnd);

    return () => {
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('mouseup', handleDragEnd);
    };
  }, [dragging]);

  const handleDragStart = () => {
    setDragging(true);
  };
  
  useEffect(() => {
    const updateImageHeight = () => {
      const currentBeforeImageRef = beforeImageRef.current; // Kopieren des aktuellen Werts von beforeImageRef.current
      if (currentBeforeImageRef && currentBeforeImageRef.complete) {
        setImageHeight(currentBeforeImageRef.naturalHeight);
      }
    };
  
    // Überprüfen, ob beforeImageRef.current nicht null ist, bevor der Event-Listener hinzugefügt wird
    if (beforeImageRef.current) {
      updateImageHeight(); // Sofortige Aktualisierung für den Fall, dass das Bild bereits geladen ist
      beforeImageRef.current.addEventListener('load', updateImageHeight);
    }
  
    // Aufräumen
    return () => {
      const currentBeforeImageRef = beforeImageRef.current; // Kopieren des aktuellen Werts von beforeImageRef.current
      if (currentBeforeImageRef) {
        currentBeforeImageRef.removeEventListener('load', updateImageHeight);
      }
    };
  }, [beforeImageRef]);

  return (
    <div className="before-after-container" style={{ height: `${imageHeight}px` }} ref={containerRef}>
      <div className="before-image" style={{ clipPath: `inset(0 ${100 - position}% 0 0)`, backgroundImage: `url(${beforeImage})`, backgroundSize:`calc(${size}%)`, left:`${leftCorrection}px` }} />
      <div className="after-image" style={{ clipPath: `inset(0 0 0 ${position}%)`, backgroundImage: `url(${afterImage})` }} />
      <div
        className="slider"
        style={{ left: `calc(${position}%)`}}
        onMouseDown={handleDragStart}>
          <div id="sliderTop"></div>
          <div id="sliderBottom"></div>
          <p id="dragKreis"><CaretLeftFilled /><CaretRightFilled /></p>
      </div>  
    </div>
  );
};

export default BeforeAfterSlider;


