import React, { useState } from 'react';
import "./ImageUpload.scss";

const ImageUpload = ({ setUserImage }) => {
  const [imageUrl, setImageUrl] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUserImage(file); // Das ausgewählte Bild an die übergeordnete Komponente übergeben
      setImageUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div id="uploadImageMain">
      <input 
        onChange={handleFileChange} 
        type="file" 
        accept="image/*" 
        id="test2" 
        className="buttonBasics"
      />
      {imageUrl && (
        <div>
          <img src={imageUrl} alt="Vorschau" style={{ maxWidth: '100px' }} />
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
