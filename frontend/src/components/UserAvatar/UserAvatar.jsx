import React, { useContext, useState } from 'react';
import './UserAvatar.scss'; // Importiere die CSS-Datei
import { SectionsContext } from "../../context/SectionsContext.js";
import baseURL from "../../util/constants.js";
import { CloseOutlined, UserOutlined } from "@ant-design/icons";

const UserAvatar = ({ width, height, cursor, allowDragging }) => {
  const { objectSize, saveUserSettings, objectPosition, setObjectPosition, userData } = useContext(SectionsContext);
  const [dragging, setDragging] = useState(false);
  const [startMousePos, setStartMousePos] = useState({ x: 0, y: 0 });
  const [startObjectPos, setStartObjectPos] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    if (allowDragging) {
      setDragging(true);
      setStartMousePos({ x: e.clientX, y: e.clientY });
      setStartObjectPos({ x: objectPosition.x, y: objectPosition.y });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      // Berechnung der neuen Position basierend auf der Verschiebung
      const deltaX = e.clientX - startMousePos.x;
      const deltaY = e.clientY - startMousePos.y;

      // Konvertiere Pixelbewegung in Prozent basierend auf der Größe des Elements
      const rect = e.target.getBoundingClientRect();
      const x = startObjectPos.x + (deltaX / rect.width) * 100;
      const y = startObjectPos.y + (deltaY / rect.height) * 100;

      // Beschränke die Werte auf 0–100%, um das Bild innerhalb der Grenzen zu halten
      setObjectPosition({
        x: Math.max(0, Math.min(100, x)),
        y: Math.max(0, Math.min(100, y)),
      });

      saveUserSettings();
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
          backgroundImage: userData.userImage ? `url(${baseURL + userData.userImage})` : 'none',
          backgroundSize: `${objectSize}%`, // Object size controlled by slider
          backgroundPosition: `${objectPosition.x}% ${objectPosition.y}%`,
          width: width, // Übernahme des Wertes aus der platzierten Seite
          height: height, // Übernahme des Wertes aus der platzierten Seite
          cursor: allowDragging ? 'pointer' : 'auto', // Übernahme des Wertes der platzierten Seite
          display: 'flex', // Ermöglicht die Zentrierung des Icons
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: userData.userImage ? 'transparent' : '#f0f0f0' // Optional: Hintergrundfarbe, wenn kein Bild vorhanden
        }}
      >
        {!userData.userImage && <UserOutlined style={{ fontSize: '24px', color: '#8c8c8c' }} />}
      </div>
    </div>
  );
};

export default UserAvatar;
