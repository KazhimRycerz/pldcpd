import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Slider.scss'
import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
//import SwiperCore, { Navigation, Pagination } from 'swiper/core';
import baseURL from "../../util/constants.js"

//Swiper.use([Navigation, Pagination]);

/* export const Slider = ({ photos }) => {
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
}; */


export const ImageSlider = ({ images, onImageClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiper = useSwiper();

  const handleSlideChange = (swiper) => {
    setCurrentIndex(swiper.realIndex);
  };

  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        loop={true}
        //effect="coverflow"
        navigation={{ clickable: true }} // Verwende ein Objekt für die navigation-Prop
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        //A11y={{ enabled: true }}
        spaceBetween={50}
        style={{gap:"20px"}}
        slidesPerView={3}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={(swiper) => handleSlideChange(swiper)}
      >
        {images &&
          images.map((image, index) => (
            <SwiperSlide key={index} >
              <img
                src={`${baseURL}/userDirectories/${localStorage.getItem(
                  'userId'
                )}/${image}`}
                className="image-hover-effect"
                alt={`Bild ${index}`}
                onClick={() => onImageClick(image)}
              />
            </SwiperSlide>
          ))}
      </Swiper>
      {/* <button onClick={handlePrevSlide}>Previous</button>
      <button onClick={handleNextSlide}>Next</button> */}
    </div>
  );
};
