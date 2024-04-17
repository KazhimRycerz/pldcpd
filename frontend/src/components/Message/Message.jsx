import React from 'react';
import  { useState, useEffect } from 'react';
import axios from 'axios';


//import WhatsAppShareButton from 'react-share';

/* const MessageShare = () => {
  const url = "https://example.com"; // URL, die Sie teilen möchten
  const message = "Hallo, schau dir diese Webseite an!"; // Nachricht, die gesendet werden soll

  return (
    <WhatsAppShareButton
      url={url}
      title={message}
      separator=":: "
    >
      Teilen Sie dies per WhatsApp
    </WhatsAppShareButton>
  );
}

export default MessageShare;
 */
const SendMessageToWhatsApp = () => {
   // Funktion zum Öffnen von WhatsApp und Vorbereiten der Nachricht
   const sendMessage = () => {
     // Nummer des Empfängers mit Ländervorwahl (z.B. +49 für Deutschland)
     const phoneNumber = '+491702046812';
     // Nachricht, die Sie senden möchten
     const code = '929000';
     const message = `Der Einmalcode für die Autentifizierung lautet: ${code}.`;
     // URL zum Öffnen von WhatsApp und Vorbereiten der Nachricht
     const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
     // vierstelliger code
     // Öffnen Sie WhatsApp im Browser
     window.open(whatsappUrl, '_blank');
   };
 
   return (
     <button className="buttonBasics" onClick={sendMessage}>Einmalcode auf mein Mobiltelefon senden.</button>
   );
 };
 
 //export default SendMessageToWhatsApp;

 /* const BestätigungsCodeSenden = (mobilNummer) => {
   const accountSid = 'YOUR_ACCOUNT_SID';
   const authToken = 'YOUR_AUTH_TOKEN';
   const client = require('twilio')(accountSid, authToken);

   client.messages
  .create({
     body: 'Ihr Bestätigungscode lautet: 123456',
     from: 'YOUR_TWILIO_PHONE_NUMBER',
     to: {mobilNummer}
   })
  .then(message => console.log(message.sid))
  .catch(err => console.error(err));
 
   return (
     <button className="buttonBasics" onClick={sendMessage}>Einmalcode auf mein Mobiltelefon senden.</button>
   );
 }; */
 
// export default BestätigungscodeSenden;

      
      




const CodeSenden = () => {
   const [phoneNumber, setPhoneNumber] = useState('');
   const [verificationCode, setVerificationCode] = useState('');
   
   const generateRandomNumber = () => {
   const min = 0;
   const max = 999999;
   const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
   //setRandomNumber(randomNum);
   return randomNum
   };      

      const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'phoneNumber') {
          setPhoneNumber(value);
        } else if (name === 'verificationCode') {
          setVerificationCode(value);
        }
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
    
        // Hier sollten Sie Ihre Twilio-Kontoinformationen einfügen
        const accountSid = 'ACe538e04cd8ff4d99d2bef9a6a5fd6bdd';
        const authToken = '5d69e88d15c8eb0751d4b8187b095050';
        const twilioPhoneNumber = '+49 170 2046812';
        const code = generateRandomNumber(); // Annahme: generateRandomNumber ist eine Funktion, die den Bestätigungscode generiert
        console.log(code);
    
        axios.post(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
            Body: `Ihr Bestätigungscode lautet: ${code}`,
            From: twilioPhoneNumber,
            To: '+49 170 2046812'
          },
          {
            auth: {
              username: accountSid,
              password: authToken
            }
          })
          .then(response => {
            console.log('SMS erfolgreich gesendet:', response.data);
            // Hier können Sie bei Bedarf eine Erfolgsmeldung anzeigen oder eine andere Aktion ausführen
          })
          .catch(error => {
            console.error('Fehler beim Senden der SMS:', error);
            // Hier können Sie bei Bedarf eine Fehlermeldung anzeigen oder eine andere Aktion ausführen
          });
      };
    
      return (
        <div>
          <h2>SMS-Verifizierung</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Telefonnummer:
              <input
                type="text"
                name="phoneNumber"
                value={phoneNumber}
                onChange={handleInputChange}
              />
            </label>
            <button type="submit">SMS senden</button>
          </form>
        </div>
      );
    }

       
   const RandomTextGenerator = () => {
   const [randomText, setRandomText] = useState("");

   // Funktion zum Generieren einer Zufallszahl zwischen 0 und 9
   const generateRandomNumber = () => {
      return Math.floor(Math.random() * 10); // 0 bis 9
   };

   // Funktion zum Generieren des zufälligen Texts
   const generateRandomText = () => {
      let text = '';
      // Schleife von sechs Runden
      for (let i = 0; i < 6; i++) {
         // Generiere eine Zufallszahl
         const randomNumber = generateRandomNumber();
         // Füge die Zufallszahl dem Text hinzu
         text += `${randomNumber} `;
      }
      // Setze den generierten Text im Zustand
      setRandomText(text);
   };

   useEffect(() => {
      // Generiere den zufälligen Text, wenn die Komponente montiert wird
      generateRandomText();
      // Starte den Timer, um den Text nach 60 Sekunden zurückzusetzen
      const timer = setTimeout(() => {
         setRandomText('');
      }, 60000);
      // Aufräumen: Timer löschen, wenn die Komponente unmontiert wird
      return () => clearTimeout(timer);
   }, []);

   return (
      <div>
         <h1>Zufälliger Code Generator</h1>
         <p>Der generierte Code ist: {randomText}</p>
         <button onClick={generateRandomText}>Neu generieren</button>
      </div>
   );
   }


 export { SendMessageToWhatsApp,  CodeSenden /* SendMessageWidthCode */, RandomTextGenerator  };