import React, { useState, useEffect } from "react";
import "./Countdown.scss";

const Countdown = ({ targetDate }) => {
  const [countdown, setCountdown] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div >
      <p id="cd">
        {countdown.days}d {countdown.hours}h {countdown.minutes}m{" "}
        {countdown.seconds}s
      </p>
    </div>
  );
};

export default Countdown;