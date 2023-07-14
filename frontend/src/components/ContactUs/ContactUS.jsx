import React, { useState } from "react";
import "./ContactUs.scss";


export default function EMailUs() {
  const [to, setTo] = useState("jritter@via-internet.com");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [firstNameSender, setFirstNameSender] = useState("");
  const [lastNameSender, setLastNameSender] = useState("");
  const [eMailSender, setEMailSender] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send the email
    const mailOptions = {
      to,
      subject,
      body,
      firstNameSender,
      lastNameSender,
      eMailSender,
    };
    fetch("https://api.postmarkapp.com/api/v1/email", {
      method: "POST",
      headers: {
        Authorization: `Bearer YOUR_POSTMARK_API_KEY`,
      },
      body: JSON.stringify(mailOptions),
    });
  };

  return (
    <main id="contactUsMain">
      <div id="eMailForm">
        <form onSubmit={handleSubmit}>
          {/* <input
            type="text"
            placeholder="To"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          /> */}
          <input
            type="text"
            placeholder="firstNameSender"
            value={firstNameSender}
            onChange={(e) => setFirstNameSender(e.target.value)}
          />
          <input
            type="text"
            placeholder="lastNameSender"
            value={lastNameSender}
            onChange={(e) => setLastNameSender(e.target.value)}
          />
          <input
            type="text"
            placeholder="eMailSender"
            value={eMailSender}
            onChange={(e) => setEMailSender(e.target.value)}
          />
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <textarea
            placeholder="Body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <input type="submit" value="Send" />
        </form>
      </div>
    </main>
  );
}