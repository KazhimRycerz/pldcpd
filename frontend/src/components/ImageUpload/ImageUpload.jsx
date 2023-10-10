import React, { Component } from 'react';
import "./ImageUpload.scss";

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      imageUrl: '',
    };
  }

  handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validieren Sie hier den Dateityp oder die Dateigröße nach Bedarf.
      this.setState({
        selectedFile: file,
        imageUrl: URL.createObjectURL(file), // Vorschau des ausgewählten Bildes
      });
    }
  };

  /* handleUpload = () => {
    const { selectedFile } = this.state;
    // Hier können Sie den ausgewählten Dateiobjekt 'selectedFile' an Ihren Server senden
    // und die Datei hochladen. Dies erfordert normalerweise eine AJAX-Anfrage oder eine Formularübermittlung.

    // Beispiel für eine AJAX-Anfrage mit Fetch:
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      fetch('/upload-url', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          // Verarbeiten Sie die Antwort vom Server nach Bedarf
          console.log('Upload erfolgreich:', data);
        })
        .catch((error) => {
          console.error('Fehler beim Upload:', error);
        });
    }
  }; */

  render() {
    const { imageUrl } = this.state;

    return (
      <>
        <div id="uploadImageMain">
          {/* <h2 id="uploadHead">Bild hochladen</h2> */}
          <input 
            onChange={this.handleFileChange} 
            type="file" 
            accept="image/*" 
            id="test2" 
            className="buttonBasics"/>
          {imageUrl && (
            <div>
              <img src={imageUrl} alt="Vorschau" style={{ maxWidth: '100px' }} />
            </div>
          )}
          {/* <button onClick={this.handleUpload} className="buttonBasics" >Hochladen</button> */}
        </div>
      </>
    );
  }
}

export default ImageUpload;