import React, { useState } from 'react';
import './Tooltips.scss';

export const Tooltip = ({ text, children }) => {
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

//export default Tooltip;

export const getTooltipText = (contents) => {
  if (contents === 'LEO') {
    return 'Learning Opportunity'
  } else if (contents === 'CRE') {
    return 'Creating a Learning Item'
  } else if (contents === 'PAC') {
    return 'Professional Activity';
  } else if (contents === 'EDU') {
     return 'Educaters Activity';
  } else if (contents === 'PEX') {
     return 'Professional Experience';
  } else if (contents === 'PED') {
     return 'Professional Education';
   } else {
    return ''
  }
};