import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import "./ImageUploadModal.scss";
import { CloseOutlined, EditOutlined, SaveOutlined, StopOutlined, UploadOutlined  } from "@ant-design/icons";



//Upload einer ImageDatei
const ImageUploadModal = ({ setUserImage }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUserImage(file); // Das ausgewählte Bild an die übergeordnete Komponente übergeben
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div id="imageUploadModal">
       
       < UploadOutlined id="uploadOutlined" onClick={showModal}/>
      
      <Modal
        title="Bild hochladen"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Abbrechen
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Bestätigen
          </Button>,
        ]}
      >
        <div id="uploadImageMain">
          <input 
            type="file" 
            accept="image/*" 
            id="inputFile" 
            className="buttonBasics"
            onChange={handleFileChange} 
          />
          {imageUrl && (
            <div>
              <img src={imageUrl} alt="Vorschau" style={{ maxWidth: '100px' }} />
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

// Upload mehrerer Images gleichzeitig 

const ImagesUploadModal = ({ setImages }) => {
  const [imageUrls, setImageUrls] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length) {
      setImages(files); // Übergibt die ausgewählten Bilder an die übergeordnete Komponente
      const urls = files.map(file => URL.createObjectURL(file));
      setImageUrls(urls);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div id="imageUploadModal">
      < UploadOutlined id="uploadOutlined" onClick={showModal} />
      
      <Modal
      id="test"
      title="Bilderer hochladen"
      open={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Abbrechen
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Bestätigen
        </Button>,
      ]}
      >
        <div id="uploadImageMain">
          <input 
            type="file" 
            accept="image/*" 
            id="inputFile" 
            className="buttonBasics"
            onChange={handleFileChange}
            multiple // Ermöglicht die Auswahl mehrerer Dateien
          />
          {imageUrls.length > 0 && (
            <div>
              {imageUrls.map((url, index) => (
                <img key={index} src={url} alt={`Vorschau ${index + 1}`} style={{ maxWidth: '100px', margin: '5px' }} />
              ))}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export { ImageUploadModal, ImagesUploadModal} ;

