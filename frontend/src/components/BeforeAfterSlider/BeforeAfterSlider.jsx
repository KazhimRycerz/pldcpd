/* import React, { useRef, useState } from 'react';
import './BeforeAfterSlider.scss'; // Stildefinitionen
import JoachimRitter from '../../../src/images/Joachim_Rycerz.jpg';
import KazhimRitter from '../../../src/images/Kazhim_Rycerz.jpg';

const BeforeAfterSlider = () => {
  const beforeImage = JoachimRitter;
  const afterImage = KazhimRitter;

  const [position, setPosition] = useState(50); // Startposition des Sliders (50%)
  const [dragging, setDragging] = useState(false); // Zustand, der angibt, ob der Slider gerade gezogen wird
  const containerRef = useRef(null);

  const handleDragStart = () => {
    setDragging(true);
  };

  const handleDragEnd = () => {
    setDragging(false);
  };

  const handleDrag = (e) => {
    if (dragging) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const newPosition = ((e.clientX - containerRect.left) / containerRect.width) * 100;
      
      // Begrenze die Position zwischen 0% und 100%
      const clampedPosition = Math.min(Math.max(newPosition, 0), 100);
      
      setPosition(clampedPosition); // Neue Position setzen
    }
  };

  return (
    <div className="before-after-container" style={{ height: '300px' }} ref={containerRef}>
      <div className="before-image" style={{ clipPath: `inset(0 ${100 - position}% 0 0)`, backgroundImage: `url(${beforeImage})` }} />
      <div className="after-image" style={{ clipPath: `inset(0 0 0 ${position}%)`, backgroundImage: `url(${afterImage})` }} />
      <div
        className="slider"
        style={{ left: `calc(${position}%)`, height: `75px`, top:`35%`}}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDrag={handleDrag}
      />
    </div>
  );
};

export default BeforeAfterSlider;
 */

import React, { useRef, useState, useEffect } from 'react';
import './BeforeAfterSlider.scss'; // Stildefinitionen
//import JoachimRitter from '../../../src/images/Joachim_Rycerz.jpg';
//import KazhimRitter from '../../../src/images/Kazhim_Rycerz.jpg';

const BeforeAfterSlider = ({beforeImage, afterImage}) => {
  //const beforeImage = JoachimRitter;
  //const afterImage = KazhimRitter;

  const [position, setPosition] = useState(99.6); // Startposition des Sliders (50%)
  const [dragging, setDragging] = useState(false); // Zustand, der angibt, ob der Slider gerade gezogen wird
  const containerRef = useRef(null);

  useEffect(() => {
    const handleDrag = (e) => {
      if (dragging) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const newPosition = ((e.clientX - containerRect.left) / containerRect.width) * 100;
        
        // Begrenze die Position zwischen 0% und 100%
        const clampedPosition = Math.min(Math.max(newPosition, -0.4), 99.6);
        
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

  return (
    <div className="before-after-container" style={{ height: '300px' }} ref={containerRef}>
      <div className="before-image" style={{ clipPath: `inset(0 ${100 - position}% 0 0)`, backgroundImage: `url(${beforeImage})` }} />
      <div className="after-image" style={{ clipPath: `inset(0 0 0 ${position}%)`, backgroundImage: `url(${afterImage})` }} />
      <div
        className="slider"
        style={{ left: `calc(${position}%)`, height: `100%`, top:`0%`}}
        onMouseDown={handleDragStart}>
          <p id="dragKreis">&lt; &nbsp; &gt;</p>
      </div>  
    </div>
  );
};

export default BeforeAfterSlider;


