import React, { useContext, useState, useEffect } from 'react';
import './UserAvatar.scss'; // Importiere die CSS-Datei
import { SectionsContext } from "../../context/SectionsContext.js";
import baseURL from "../../util/constants.js";

const UserAvatar = ({width, height, cursor, allowDragging}) => {
  const { objectSize, saveUserSettings, objectPosition, setObjectPosition, userData } = useContext(SectionsContext);
  const [dragging, setDragging] = useState(false);

  const handleMouseDown = () => {
    if (allowDragging) {
      setDragging(true);
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      const rect = e.target.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setObjectPosition({ x, y });
      saveUserSettings()
    }
  };

  return (
    <div id="sizeHandler">
      <div
        className="customizable-image"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp} // Falls die Maus das Element verlässt
        onChange={() => saveUserSettings()}
        style={{
          backgroundImage: `url(${baseURL + userData.userImage})`,
          backgroundSize: `${objectSize}%`, // Object size controlled by slider
          backgroundPosition: `${objectPosition.x}% ${objectPosition.y}%`,
          width: width, // or any other width you want to define globally
          height: height, // or any other height you want to define globally
          cursor: allowDragging ? 'pointer' : 'auto' // Cursor-Stil basierend auf allowDragging und isAuth 
        }}
      ></div>
    </div>
  );
};

export default UserAvatar;
