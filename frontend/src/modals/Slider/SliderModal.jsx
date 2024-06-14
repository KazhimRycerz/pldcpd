import React, { useContext, useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import { SectionsContext } from "../../context/SectionsContext.js";
import axiosConfig from "../../util/axiosConfig";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, EffectCube } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import 'swiper/css/effect-cube';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './SliderModal.scss';
import baseURL from '../../util/constants.js';

Modal.setAppElement('#root');

export const AvatarSliderModal = ({ 
  isOpen, 
  onRequestClose, 
  }) => {
  const { isAuth,
    userData, 
    getUserData
  } = useContext(SectionsContext);
  const [currentIndex, setCurrentIndex] = useState(1);
  //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [images, setImages] = useState([])

  const addImage = (event) => {
    const file = event.target.files[0]; // Das ausgewählte Bild als Datei
    //console.log(file)
    const filePfad = URL.createObjectURL(event.target.files[0])
    setSelectedImage(file);
    setPreviewImage(filePfad);
    //console.log(previewImage.path);
  };

  const handleImageDelete = async (index) => {
    const imageToDelete = images[index];
    const userId = localStorage.getItem("userId");
  
    // Entferne das Bild aus der lokalen Anzeige
    const newImages = images.filter((_, imgIndex) => imgIndex !== index);
    setImages(newImages);
    console.log(`Image at index ${index} deleted`);
  
    try {
      const response = await axiosConfig.delete(`/user/userimages/${userId}`, {
        data: { fileName: imageToDelete }
      });
  
      if (response.status === 202) {
        console.log('Bild erfolgreich vom Server gelöscht');
      } else {
        console.error('Fehler beim Löschen des Bildes vom Server');
        // Wenn das Löschen fehlschlägt, füge das Bild wieder zur lokalen Anzeige hinzu
        setImages(images);
      }
    } catch (error) {
      console.error('Fehler beim Löschen des Bildes vom Server:', error);
      // Wenn ein Fehler auftritt, füge das Bild wieder zur lokalen Anzeige hinzu
      setImages(images);
    }
  };

  const saveImage = async () => {
      if (!selectedImage) {
        console.error("Es wurde kein Bild ausgewählt.");
        return;
      }
      const formData = new FormData();
      const userId = localStorage.getItem("userId");
      formData.append('userId', userId)
      //formData.append('image', selectedImage)
      if (selectedImage) {
        // Check if the image exists
        const imageFile = selectedImage instanceof File ? selectedImage : null;
        if (imageFile) {
          // Check the image file type
          if (imageFile.type.startsWith('image/')) {
            // Replace spaces in the file name with underscores
            const fileName = imageFile.name.replace(/\s+/g, '_');
            
            // Add the image to the FormData object with the modified file name
            formData.append('image', imageFile, fileName);
          } else {
            console.error('Invalid image file type');
          }
        } else {
          console.error('Invalid image');
        }
      }

      const axiosResp = await axiosConfig.post('/user/imageupload', formData, {
        headers: {
            "Content-Type": "multipart/form-data"
          }
      })
      .then(response => {
        setSelectedImage(null)
        setPreviewImage(null)
        getUserData()
        getUserImageList();
        console.log('Bild erfolgreich hochgeladen:', response.data);
      })
      .catch(error => {
        console.error('Fehler beim Hochladen des Bildes:', error);
      });
  };

  const saveImageAbbrechen = ()=>{
      setSelectedImage(null)
      setPreviewImage(null)
  }

  const getUserImageList = async ()=>{
  const userId = localStorage.getItem("userId");
  //console.log(userId)
  //console.log(`/user/userimages/${userId}`)
  //setIsModalOpen(true)
  try {
     const response = await axiosConfig.get(`/user/userimages/${userId}`); // Hier den entsprechenden Endpunkt einsetzen
     const images = response.data; // Annahme: Das Backend sendet ein Array von Bildern als Antwort
     setImages(images);
     //console.log('Bilder:', {images});
     return images;
  } catch (error) {
     console.error('Fehler beim Abrufen der Bilder:', error);
     return null;
  }
  }

  useEffect(() => {
    getUserImageList();
}, []);

 const handleImageSelect = async (image) => {     
    const userId = localStorage.getItem("userId");
    const imagePath = `./userDirectories/${userId}/${image}`;
    console.log('Bild wurde angeklickt:', image);
    
    try {
      const response = await axiosConfig.patch(`/user/userimages/${userId}`, {
        userId,
        imagePath,
      });

      if (response.data.success) {
        console.log('Bildpfad erfolgreich aktualisiert');
        getUserData()
      } else {
        console.error('Fehler beim Aktualisieren des Bildpfads:', response.data.message);
      }
    } catch (error) {
      console.error('Fehler beim Aktualisieren des Bildpfads:', error);
    }
  };

  //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  
  const handleSlideChange = (swiper) => {
    setCurrentIndex(swiper.realIndex);
  };  

  return (
  isAuth && <Modal 
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
          //scrollbar={{ draggable: true }}
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
                onClick={() => { handleImageSelect(image); onRequestClose(); }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div id="avatarHandling">
          {!selectedImage && <p className="bildLaden" onClick={() => { document.getElementById('fileInput').click()}}> weiteres Bild laden</p>}
          {!selectedImage && <input id="fileInput" type="file" accept="image/*" style={{ display: 'none'}} onChange={addImage} />}
          {/* {!selectedImage && <p className="bildLaden" onClick={() => onImageClick(currentIndex)}> Bild als Avatar wählen</p>} */}
          {images && (<p className="bildLaden" onClick={() => handleImageDelete(currentIndex)}> Bild löschen</p>)}
          <p className="bildLaden" onClick={() => { onRequestClose(); saveImageAbbrechen() }}>abbrechen</p>
        </div>
          <div id="preview">
          {selectedImage && <p className="bildLaden" onClick={saveImage}> Bild speichern</p>}
          {selectedImage && <img  src={previewImage} onClick={saveImage} alt="Vorschau des ausgewählten Bildes" />}
          {selectedImage && <p className="bildLaden" onClick={saveImageAbbrechen}> nicht speichern</p>}
          </div>
      </div>
    </Modal>
  );
};

export const CubeSlider = () => {
  return (
    <>
      <Swiper
        effect={'cube'}
        grabCursor={true}
        loop={true}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        pagination={true}
        modules={[EffectCube, Pagination]}
        id="Cube"
      >
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
