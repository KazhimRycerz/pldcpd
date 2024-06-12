import fs from 'fs';

export const uploadImageExpressFile = async (req, res, next) => {
   try {
      if (!req.files || !req.files.userImage) {
        return res.status(400).send('No files were uploaded.');
      }
  
      const userImage = req.files.userImage;
      const userImagesDir = './public/userDirectories/';
      const userDirectory = userImagesDir + req.createdUser._id;
      const imagePath = userDirectory + '/' + userImage.name;
      const imagePathdb = './userDirectories/' + req.createdUser._id + '/' + userImage.name;
  
      if (!fs.existsSync(userDirectory)){
        fs.mkdirSync(userDirectory, { recursive: true });
      }
  
      // Bild speichern
      userImage.mv(imagePath, async (err) => {
        if (err) {
          console.error('Error uploading image:', err);
          // Fehlerantwort senden
          return res.status(500).send('Error uploading image');
        }
  
        // Aufruf der Callback-Funktion mit dem Bildpfad als Argument
        next(imagePathdb);
      });
    } catch (error) {
      // Fehlerantwort senden
      res.status(500).send(error.message);
    }
  };

// Noch zu korrigieren
  export const uploadImage = async (req, res, next) => {
    console.log(req.body)
    console.log(req.files)
    try {
       if (!req.files || !req.files.image) {
         return res.status(400).send('No files were uploaded.');
       }
   
       const image = req.files.image;
       const userImagesDir = './public/userDirectories/';
       const userDirectory = userImagesDir + req.body.userId;
       const imagePath = userDirectory + '/' + image.name;
         
       if (!fs.existsSync(userDirectory)){
         fs.mkdirSync(userDirectory, { recursive: true });
       }
   
       // Bild speichern
       image.mv(imagePath, async (err) => {
         if (err) {
           console.error('Error uploading image:', err);
           // Fehlerantwort senden
           return res.status(500).send('Error uploading image');
         }
       });
     } catch (error) {
       // Fehlerantwort senden
       res.status(500).send(error.message);
     }
   };

