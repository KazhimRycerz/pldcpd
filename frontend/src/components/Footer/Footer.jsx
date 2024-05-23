import './Footer.scss'
import { Link } from 'react-router-dom'
import React, { useState, useEffect, useRef } from "react";
import { throttle } from 'lodash'

const Footer = () => {
  const [footerPosition, setFooterPosition] = useState('fixed');
  const [footerFullContents, setFooterFullContents] = useState(false);
  const [footerValue, setFooterValue] = useState("open Footer"); 
  const footerRef = useRef(null);
  
  const handleFooterHeight = () => {
    if (!footerFullContents) {
      setFooterFullContents(true);
      setFooterValue("reduce Footer");
    } else {
      setFooterFullContents(false);
      setFooterValue("open Footer");
    }
    window.scrollTo(0, document.body.scrollHeight);
  }
  
  useEffect(() => {
    const handleResize = throttle(() => {
      if (footerRef.current) {
        const footerHeight = footerRef.current.offsetHeight;
        const isOverflowing = document.body.scrollHeight > (window.innerHeight - footerHeight );
        //console.log(`Footer height: ${footerHeight}, isOverflowing: ${isOverflowing}`);
        setFooterPosition(isOverflowing ? 'relative' : 'fixed');
      }
    }, 10);

    // Initial check
    handleResize();

    const observer = new MutationObserver(() => {
      handleResize();
    });

    observer.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);


   return(
    <footer id="footer" ref={footerRef} style={{ position: footerPosition }}>
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
                  <li>Privacy policy</li>
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