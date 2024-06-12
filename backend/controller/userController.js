import UserModel from "../models/userModel.js";
import { addContactData, addProfessionalStatus } from "../middleware/addUserData.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import fs from 'fs'; // Erforderliches Modul, um Dateien zu lesen und zu schreiben
import path from 'path'; // Erforderliches Modul für den Dateipfad
import expressFileUpload from "express-fileupload";
import { uploadImageExpressFile } from "../middleware/imageUploadExpressFile.js";
import { stringify } from "querystring";

export const createUser = async (req, res) => {
  try {
    // Gehashtes Passwort erstellen
    const hashedSaltyPassword = await bcrypt.hash(req.body.password, 14);

    // Benutzerdatensatz erstellen
    const newUser = {
      userName: req.body.userName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      gender: req.body.gender,
      eMail: req.body.eMail,
      accessRights: 1,
      password: hashedSaltyPassword,
    };

    // Benutzer in der Datenbank erstellen
    const createdUser = await UserModel.create(newUser);
    req.createdUser = createdUser;

    uploadImageExpressFile(req, res, async (imagePathdb) => {
      // Bildpfad in der MongoDB speichern
      createdUser.userImage = imagePathdb;
      await createdUser.save();
    });
    
    addContactData(createdUser);
    //addProfessionalStatus(createdUser.ContactData);
    res.status(201).send(createdUser);
  } catch (error) {
    // Fehlerantwort senden
    res.status(401).send(error.message);
  }
};

export const userLogin = async (req, res) => {
  const loginUser = await UserModel
  .findOne({ userName: req.body.userName });
  if (!loginUser) {
    return res.send({ error: "userName/password combination not found" });
  }
  const isRightPassword = await bcrypt.compare(
    req.body.password,
    loginUser.password
  );
  
  if (!isRightPassword) {
    return res.send({ error: "email/password combination not found" });
  }
  
  const expiresInSec = 1 * 60 * 60 * 24; // 1 h * 24 => 24h

  const token = jwt.sign(
    {
      userName: loginUser.userName,
      userId: loginUser._id,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: expiresInSec }
  );

  res.cookie("jwt", token, { httpOnly: true, maxAge: expiresInSec * 1000 });

  const expireDate = new Date().getTime() + expiresInSec * 1000;
  res.cookie("isLogged", expireDate, {
    httpOnly: false,
    maxAge: expiresInSec * 1000,
  });

  return res.send({
    msg: "successfully logged in",
    userName: loginUser.userName,
    userId: loginUser._id,
    firstName: loginUser.firstName,
    accessRights: loginUser.accessRights,
    userImage: loginUser.userImage,
  });
};

export const userLogout = (req, res) => {
  res.clearCookie("jwt");
  res.clearCookie("isLogged");
  return res.status(200).json({ msg: "successfully logged out" });
};

export const getUserByID = async (req, res) => {
  try {
    const getUser = await UserModel
      .findById(req.params.id)
      .populate({
        path:"contactData",
          populate: [
            {
              path: "careerPath",
              populate: {
                path: "company"
              }
            },
            {
              path: "cpdTracker",
              populate: {
                path: "courseId"
              }
            },
            "professionalStatus",
            "authorsData",
            "currentCompany",
            /* "cpdTracker" */
          ]
        });

    res.status(200).send(getUser);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

export const getUserData = async (req, res) => {
  try {
    const getUser = await UserModel
    .find()
    .populate({
      path:"contactData",
        populate: [
          {
            path: "careerPath",
            populate: {
              path: "company"
            }
          },
          "professionalStatus",
          "authorsData",
          "currentCompany",
            {
              path: "cpdTracker",
              populate: {
                path: "courseId"
              }
            },
        ]
      });
        
    res.status(200).send(getUser);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

export const deleteUserByID = async (req, res) => {
  try {
    const deleteUser = await UserModel.deleteOne({ _id: req.params.id });
    res.status(202).send(deleteUser);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

export const updateUserByID = async (req, res) => {
  try {
    const getUser = await UserModel.findById(req.params.id);

    if (req.body.password) {
      const hashedSaltyPassword = await bcrypt.hash(req.body.password, 14);

      await UserModel.updateOne(
        { _id: req.params.id },
        { password: hashedSaltyPassword }
      );
    } else {
      await UserModel.updateOne({ _id: req.params.id }, req.body);
    }
    res.status(206).send(`eMail: ${getUser.eMail} successfully updated`);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

export const updateUserImageSettings = async (req, res) => {
  //console.log(req.body, req.params.id)
  try {
    const userImageSettings = await UserModel.findByIdAndUpdate(
      req.params.id, // ID des Benutzers, der aktualisiert werden soll
      { 
        objectSizeUserImage: req.body.objectSize, // Aktualisierte Größe des Objekts im Bild
        objectPositionUserImage: req.body.objectPosition // Aktualisierte Position des Objekts im Bild
      },
      { new: true } // Option, um das aktualisierte Dokument zurückzugeben
    );
    
    res.status(206).send(userImageSettings);
  } catch (error) {
    res.status(404).send(error.message);
  }
}

export const getUserSettings = async (req, res) => {
  try {
    const userSettings = await UserModel
    .findOne({ _id: req.params.id })
        
    res.status(200).send(userSettings);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

export const getUserByUsername = async (req, res) => {
  try {
    const user = await UserModel
    .findOne({ userName: req.params.username });
    
    res.status(200).send(user.userName);
  } catch (error) {
    res.status(204).send(false);
  }
};

export const getUserByEmail = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.params.email });
    res.status(200).send(user.email);
  } catch (error) {
    res.status(204).send(false);
  }
};

export const imageUpload = async (req, res) => {
  
  try {
       if (!req.files || !req.files.image) {
         return res.status(400).send('No files were uploaded.');
       }
   
       const image = req.files.image;
       const imagesDir = './public/userDirectories/';
       const userDirectory = imagesDir + req.body.userId;
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
  
        //console.log('Image uploaded successfully:', imagePath);
        // Erfolgsantwort senden
        res.status(200).send('Image uploaded successfully');
      });
    } catch (error) {
      // Fehlerantwort senden
      res.status(500).send(error.message);
    }
  };

export const getUserImages = async (req, res) => {
  //console.log(req.params)
  try {
    const imagesDir = './public/userDirectories/';
    const userDirectory = path.join(imagesDir, req.params.id); // Pfad zum Benutzerverzeichnis

    // Überprüfen, ob das Benutzerverzeichnis existiert
    if (!fs.existsSync(userDirectory)) {
      return res.status(404).send('Benutzerverzeichnis nicht gefunden');
    }

    // Liste der Dateien im Benutzerverzeichnis abrufen
    const files = fs.readdirSync(userDirectory);

    // Nur Bilddateien auswählen (Annahme: Nur Bilddateien im Verzeichnis)
    const images = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.gif';
    });

    if (images.length > 0) {
      res.status(200).json(images);
    } else {
      res.status(404).send('Keine Bilddateien gefunden');
    }
  } catch (error) {
    console.error('Fehler beim Abrufen der Benutzerbilder:', error);
    res.status(500).send('Interner Serverfehler');
  }
};
  
export const updateUserImage = async (req, res) => {
  //console.log(req.body, req.params.id)
  try {
    const userImagePath = await UserModel.findByIdAndUpdate(
      req.params.id, // ID des Benutzers, der aktualisiert werden soll
      { userImage: req.body.imagePath // aktualisierte Bild
      },
      { new: true } // Option, um das aktualisierte Dokument zurückzugeben
    );
    
    res.status(200).send({ success: true, userImagePath });
  } catch (error) {
    res.status(404).send(error.message);
  }
}

export const deleteUserImage = async (req, res) => {
  const { fileName } = req.body;
  const userId = req.params.id;

  const imagesDir = `./public/userDirectories/${userId}/`;
  const filePath = path.join(imagesDir, fileName);
  //console.log(filePath)

  try {
    // Überprüfen, ob die Datei existiert
    if (!fs.existsSync(filePath)) {
      return res.status(404).send('File not found.');
    }

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('File could not be deleted.');
      }
      res.status(202).send({ success: true, message: 'File deleted successfully' });
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};


/* export const addComment = async (req, res) => {
  try {
    const getUser = await UserModel.findById(req.params.id);
    getUser.comments.push(req.body)
    await getUser.save()
    res.status(206).send(`user: ${getUser.userName} successfully updated`);
  } catch (error) {
    res.status(404).send(error.message);
  }
}; */