import React, { useState, useEffect, useContext } from "react";
//import { SectionsContext } from "../../context/SectionsContext.js";
import Moment from "moment";
import "./Countdown.scss";

 const  Countdown = ({ targetDate }) => {
  //const { isAuth, knowledgeData } = useContext(SectionsContext);
  const [countdown, setCountdown] = useState({});
  /* const [startData, setStartData] = useState(new Date(knowledgeData.cpdActiveSince)); */
  //setStartData(getUserData.cpdActiveSince)
  
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      //const cpdStartDate = new Date(knowledgeData.cpdActiveSince);
      //const distance = now - cpdStartDate;
      const distance = now - targetDate;
      //const distance = targetDate - now
      //console.log(knowledgeData.cpdActiveSince);

      const years = Math.floor(distance / (1000 * 60 * 60 * 24 * 365) )
      const months = Math.floor((distance % (1000 * 60 * 60 * 24 * 30 * 12)) / (1000 * 60 * 60 * 24 * 30) )
      const days = Math.floor((distance % (1000 * 60 * 60 * 24 * 30) / (1000 * 60 * 60 * 24)));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown({ years, months, days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate/* , knowledgeData.cpdActiveSince */]);

  return (
    <>
      <div id="cd">
        <h3 id="countdownHead">Sie sind CPD aktiv seit </h3>
        <p>{Moment(targetDate).format("DD.MM.YYYY")}</p>
        <p>{countdown.years} {countdown.years !== 1 ? "Jahre" : "Jahr"} </p>
        <p>{countdown.months} {countdown.months !== 1 ? "Monate" : "Monat"}</p> 
        <p>{countdown.days} {countdown.days !== 1 ? "Tage" : "Tag"}</p> 
        <p>{countdown.hours} {countdown.hours !== 1 ? "Stunden" : "Stunde"}</p> 
        <p>{countdown.minutes}m {countdown.seconds}s </p>       
      </div>
    </>
  );
};

export default Countdown;

