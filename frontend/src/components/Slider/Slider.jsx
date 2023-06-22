import './Slider.scss'
import React, { useState } from 'react'


const Slider = ({ photos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const handlePrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };

  return (
    <div>
      <button onClick={handlePrevSlide}>Vorheriges Foto</button>
      <img src={photos[currentIndex]} alt="Foto" />
      <button onClick={handleNextSlide}>Nächstes Foto</button>
    </div>
  );
};

export default Slider;