import React, { useState } from "react";
import "./ContactUs.scss";
//import { Axios } from "axios";
import axiosConfig from "../../util/axiosConfig";


export default function EMailUs() {
  
  const [to, setTo] = useState("jritter@via-internet.com");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [firstNameSender, setFirstNameSender] = useState("");
  const [lastNameSender, setLastNameSender] = useState("");
  const [emailSender, setEmailSender] = useState("");
  const [status, setStatus] = useState('');
  
  const resizeHandler = (e)=> {
    // Reset field height
    e.target.style.height = 'inherit';
    // Get the computed styles for the element
    const computed = window.getComputedStyle(e.target);
    // Calculate the height
    const height = parseInt(computed.getPropertyValue('border-top-width'), 10)
    + parseInt(computed.getPropertyValue('padding-top'), 10)
    + e.target.scrollHeight
    + parseInt(computed.getPropertyValue('padding-bottom'), 10)
    + parseInt(computed.getPropertyValue('border-bottom-width'), 10);
    e.target.style.height = `${height}px`;
  }
  
  const resetHandler = () => {
    setEmailSubject("")
    setEmailBody("")
    setFirstNameSender("")
    setLastNameSender("")
    setEmailSender("")
    setStatus("");
    const elem = document.getElementById("contactBody");
    elem.style.height = "inherit";
  }

  const validateForm = () => {
    const validationErrors = [];
    if (!emailSubject) {
      validationErrors.push("Subject is required");
    }
    if (!emailBody) {
      validationErrors.push("Text is required");
    }
    if (!firstNameSender) {
      //setStatus("First name is required")
      validationErrors.push("First name is required");
    }
    if (!lastNameSender) {
      validationErrors.push("Last name is required");
    }
    if (!emailSender) {
      validationErrors.push("Your Email is required");
    } else if (!emailSender.includes("@")) {
      validationErrors.push("Email is not valid");
    }
  
    return validationErrors;
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    validationErrors.length > 0 ? setStatus("Bitte Eingaben überprüfen") : setStatus('Versenden...');
    //console.error(validationErrors);
    
    const data = {
      firstNameSender: firstNameSender,
      lastNameSender: lastNameSender,
      emailSubject: emailSubject,
      emailSender: emailSender,
      emailBody: emailBody
    };

    try {
      const axiosResp = await axiosConfig.post(`http://localhost:4000/email`, data);
      const response = await axiosResp.data.message;
      //console.log(axiosResp)
      setStatus(response);
      resetHandler();
    } catch (error) {
      console.error(status, error);
      setStatus('E-Mail konnte nicht versendet werden.');
    }
  };
    

    
  return (
    <main id="contactUsMain">
      <div><h2>contact form for any questions, comments or suggestions...</h2></div>
      
        <form id="eMailForm" onSubmit={handleSubmit}>
          {/* <input
            type="text"
            placeholder="To"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          /> */}
          <div>
            <label htmlFor="firstNameSender"> your first name:
            </label>
              <input
                type="text"
                placeholder="first name sender"
                value={firstNameSender}
                onChange={(e) => setFirstNameSender(e.target.value)}
                required
              />
          </div>
          <div>
            <label htmlFor="lastNameSender"> your family name:
              </label>
              <input
                type="text"
                placeholder="family name sender"
                value={lastNameSender}
                onChange={(e) => setLastNameSender(e.target.value)}
                required
              />
          </div>
          <div>
            <label htmlFor="emailSender"> your e-mailaddress:
            </label>
              <input
                type="text"
                placeholder="eMail sender"
                value={emailSender}
                onChange={(e) => setEmailSender(e.target.value)}
                required
              />
          </div>
          <div>
            <label htmlFor="emailSubject"> subject:
            </label>
              <input
                type="text"
                placeholder="subject"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                required
              />
          </div>
          <div>
            <label htmlFor="emailBody"> write your message here:
            </label>
              <textarea
                id="contactBody"
                placeholder="your message"
                value={emailBody}
                onChange={(e) => {setEmailBody(e.target.value); resizeHandler(e)}}
              />
          </div>
          <div>
            <button 
              className="buttonBasics" 
              type="submit" 
              value="Send">send!
            </button>
            <button 
              className="buttonBasics" 
              onClick={resetHandler}
              type="reset" 
              value="Reset">reset!
            </button>
          </div>
          {status && <p id="emailStatus">{status}</p>}
        </form>
      
    </main>
  );
}