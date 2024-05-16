import multer from "multer";
import fs from 'fs'; // Erforderliches Modul, um Dateien zu lesen und zu schreiben
import path from 'path'; // Erforderliches Modul für den Dateipfad

// Konfiguration der Speicherung für hochgeladene Dateien
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Hier wird der Speicherort für die hochgeladenen Dateien festgelegt
    cb(null, 'public/userDirectories');
  },
  filename: function (req, file, cb) {
    // Hier wird der Dateiname festgelegt
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Erstellen der Upload-Middleware
const imageUpload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Beispiel: 10 MB maximale Dateigröße
}).single('userImage');

export default imageUpload;
