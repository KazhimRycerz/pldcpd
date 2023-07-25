import CareerModel from '../models/careerModel.js'
import nodemailer from 'nodemailer'
import "dotenv/config";


export const getEmail = (req, res) => {
  res.send(`Hallo! Sie können keine versendete Email wieder abrufen, weil diese nicht gespeichert werden.`);
};

export const postEmail = async (req, res) => {
  try {
    const { firstNameSender, lastNameSender, email, emailBody, emailSubject, emailSender } = req.body;
    
    // Nodemailer Transporter konfigurieren 
    const transporter = nodemailer.createTransport({
      host: 'mail.agenturserver.de',
      port: 465,
      secure: true,
      auth: {
        user: 'mailer@via-internet.com',
        pass: process.env.PASS_INFO_VIA_INTERNET_COM
      }
    });
    
    // E-Mail-Optionen erstellen
    const mailOptions = {
      from: 'mailer@via-internet.com',
      to: "kazhim.rycerz@gmail.com",
      subject: emailSubject,
      text: `Name: ${firstNameSender} ${lastNameSender} \nE-Mail: ${emailSender}\nSubject: ${emailSubject}\nNachricht: ${emailBody}`,
    };
    
    // E-Mail senden
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'E-Mail wurde erfolgreich versendet.' });
  } catch (error) {
    console.error('Fehler beim Versenden der E-Mail:', error);
    res.status(500).json({ error: 'E-Mail konnte nicht versendet werden.' });
  }
}


