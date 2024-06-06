import React, { useState } from 'react';
import './Tooltips.scss';

const Tooltip = ({ text, children }) => {
  const [visible, setVisible] = useState(false);

  return (
    <span 
      className="tooltip-container"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div className="tooltip-popup" dangerouslySetInnerHTML={{ __html: text }} />
      )}
    </span>
  );
};

export default Tooltip;
