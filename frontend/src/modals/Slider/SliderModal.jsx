import React, { useState } from 'react';
import Modal from 'react-modal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './SliderModal.scss';
import baseURL from '../../util/constants.js';

Modal.setAppElement('#root');

export const ImageSliderModal = ({ isOpen, onRequestClose, images, onImageClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSlideChange = (swiper) => {
    setCurrentIndex(swiper.realIndex);
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose} 
      className="modal" 
      overlayClassName="overlay"
    >
      <div>
        <div /* id="Gruß_account"  */className= "headBox">
            <h2> select new Avatar</h2>
         </div>
        <Swiper
          className="swiper"
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          loop={true}
          navigation={{ clickable: true }}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          spaceBetween={50}
          centeredSlides={true}
          slidesPerView={3}
          onSlideChange={handleSlideChange}
        >
          {images && images.map((image, index) => (
            <SwiperSlide 
              key={index} 
              className={index === currentIndex ? 'active-slide' : ''}
            >
              <img
                src={`${baseURL}/userDirectories/${localStorage.getItem('userId')}/${image}`}
                className="image-hover-effect"
                alt={`Bild ${index}`}
                onClick={() => { onImageClick(image); onRequestClose(); }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <p className="bildLaden" onClick={() => { onRequestClose() }}>abbrechen</p>
      </div>
    </Modal>
  );
};
