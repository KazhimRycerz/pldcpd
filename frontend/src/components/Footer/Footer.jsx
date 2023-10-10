import './Footer.scss'
import { Link } from 'react-router-dom'
import React, { useState } from "react";

const Footer = () => {
  const [footerFullContents, setFooterFullContents] = useState(false);
  const [footerValue, setFooterValue] = useState("open Footer"); 
  //window.scrollTo(0, document.body.scrollHeight);

const handleFooterHeight = () => {
  //const elemb = document.getElementById("footerButton");

  if(!footerFullContents){
    setFooterFullContents (true);
    setFooterValue("close Footer");
    window.scrollTo(0, document.body.scrollHeight);
  }
  else {
    setFooterFullContents (false);
    setFooterValue("open Footer");
    window.scrollTo(0, document.body.scrollHeight);
  }
}


   return(
   <footer>
    <button className="buttonBasics" id="footerButton" onClick={handleFooterHeight} >{footerValue}</button>
         <p>
         Rycerz Media <br />
         Marienfelder Str. 18<br />
         33330 Gütersloh
         </p>
          <ul>
            <li><Link to="https://twitter.com/RitterJoachim/" target="_blank"><ion-icon name="logo-twitter"></ion-icon></Link></li>
            <li><Link to="https://www.facebook.com/joachim.ritter.31/" target="_blank"><ion-icon name="logo-facebook"></ion-icon></Link></li>
            <li><Link to="https://www.linkedin.com/in/joachimr/" target="_blank"><ion-icon name="logo-linkedin"></ion-icon></Link></li>
            <li><Link to="https://www.instagram.com/ritter_joachim/" target="_blank"><ion-icon name="logo-instagram"></ion-icon></Link></li>
            <li><Link to="https://www.xing.com/profile/Joachim_Ritter19/" target="_blank"><ion-icon name="logo-xing"></ion-icon></Link></li>
            <li><Link to="https://github.com/KazhimRycerz/" target="_blank"><ion-icon name="logo-github"></ion-icon></Link></li>
            <li><Link to="skype:jritter_43/"><ion-icon name="logo-skype"></ion-icon></Link></li>
            <li><Link to="slack:Joachim Ritter"><ion-icon name="logo-slack"></ion-icon></Link></li>
          </ul>
   
         {footerFullContents &&
            <div>
              <div>
                <ul>
                <li><Link to="/impressum"> Imprint</Link></li>
                  <li><a>Privacy policy</a></li>
                  <li>NN</li>
                  <li>sdlkfhj </li>
                  <li>sd glkdfjg</li>
                  <li> eoirtu </li>
                </ul>      
              </div>
              <div>
                <ul>
                <li><Link to="/impressum"> Imprint</Link></li>
                  <li>Privacy policy</li>
                  <li>NN</li>
                  <li>sdlkfhj </li>
                  <li>sd glkdfjg</li>
                  <li> eoirtu </li>
                  <li> aeöglkhj</li>
                </ul>      
              </div>
              <div>
                <ul>
                <li><Link to="/impressum"> Imprint</Link></li>
                  <li>Privacy policy</li>
                  <li>NN</li>
                  <li>sdlkfhj </li>
                  <li>sd glkdfjg</li>
                </ul>      
              </div>
              <div>
                <ul>
                  <li>Learning by PLD plattform</li>
                  <li>NN</li>
                  <li>NN</li>
                  <li>sdlkfhj </li>
                  <li>sd glkdfjg</li>
                  <li> eoirtu </li>
                  <li> aeöglkhj</li>
                  <li> aeöglkhj</li>
                </ul>      
              </div>
              <div>
                <ul>
                <li><Link to="/impressum"> Imprint</Link></li>
                  <li>Privacy policy</li>
                  <li>NN</li>
                  <li>f</li>
                  <li>f</li>
                  <li>f</li>
                  <li>f</li>
                </ul>      
              </div>
            </div>
          }

   
   </footer>
   );
};

export default Footer