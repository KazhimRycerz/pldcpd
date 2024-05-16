import UserModel from "../models/userModel.js";
import { addContactData, addProfessionalStatus } from "../middleware/addUserData.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import fs from 'fs'; // Erforderliches Modul, um Dateien zu lesen und zu schreiben
import path from 'path'; // Erforderliches Modul für den Dateipfad
import expressFileUpload from "express-fileupload";


/* export const createUser = async (req, res) => {
  try {
    const hashedSaltyPassword = await bcrypt.hash(req.body.password, 14);
    const newUserData = await UserModel.create({
      userName: req.body.userName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      gender: req.body.gender,
      userImage: req.body.userImage,
      eMail: req.body.eMail,
      //contactData: req.body.collectedData,
      password: hashedSaltyPassword,
    });
    //console.log(newUserData._id);
    addContactData(newUserData);
    addProfessionalStatus(newUserData.ContactData);
    res.status(201).send(newUserData);
  } catch (error) {
    res.status(401).send(error.message);
  }
}; */


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

    if (!req.files || !req.files.userImage) {
      return res.status(400).send('No files were uploaded.');
    }

    const userImage = req.files.userImage;

    // Bildspeicherort erstellen
    const userImagesDir = './public/userDirectories/';
    const userDirectory = userImagesDir + createdUser._id; // Verzeichnisname basierend auf der _id des neuen Benutzers
    const imagePath = userDirectory + '/' + userImage.name;

    // Speicherort erstellen, falls nicht vorhanden
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

      createdUser.userImage = imagePath; // Pfad zum Bild in der MongoDB speichern
      await createdUser.save();
      addContactData(createdUser);
      addProfessionalStatus(createdUser.ContactData);
      // Erfolgsantwort senden
      res.status(201).send(createdUser);
    });
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
            "careerPath",
            "professionalStatus",
            "authorsData",
            "currentCompany"
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
            "careerPath",
            "professionalStatus",
            "authorsData",
            "currentCompany"
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

/* export const addComment = async (req, res) => {
  try {
    const getUser = await UserModel.findById(req.params.id);
    getUser.comments.push(req.body)
    await getUser.save()
    res.status(206).send(`user: ${getUser.userName} successfully updated`);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

export const addToWatchList = async (req, res) => {
  try {
    const passedToken = req.cookies.jwt;
    const decodedToken = jwt.verify(passedToken, process.env.TOKEN_SECRET);
    console.log(req.params.id);
    const getUser = await UserModel.findOne({ _id: decodedToken.userId });
    console.log(getUser);
    console.log(req.body.watchedEvents);
    getUser.watchedEvents.push(req.body.watchedEvents);

    await getUser.save();
    res.send(getUser);
  } catch (error) {
    res.status(401).send(error.message);
  }
}; */

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
