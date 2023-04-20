import React, { useState, useEffect } from 'react';
import './TimeBar.scss';

const TimeBar = ({ totalTime, elapsedTime }) => {
  const [timePercentage, setTimePercentage] = useState(0);

  useEffect(() => {
    const percentage = (elapsedTime / totalTime) * 100;
    setTimePercentage(percentage);
  }, [elapsedTime, totalTime]);

  return (
    <div className="time-bar-container">
      <div className="time-bar" style={{ width: `${timePercentage}%` }}>
        <div className="time-label">
          {elapsedTime}/{totalTime}
        </div>
      </div>
    </div>
  );
};

export default TimeBar;
