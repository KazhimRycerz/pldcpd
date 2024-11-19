/*Der Fehler deutet darauf hin, dass das MorphSVGPlugin von GSAP in deinem Projekt nicht gefunden werden kann. Der MorphSVGPlugin ist ein kostenpflichtiges Plugin, das normalerweise nicht direkt in gsap enthalten ist. Hier sind einige Schritte, wie du diesen Fehler beheben kannst:
 Installation des MorphSVGPlugin: Da MorphSVGPlugin ein Premium-Plugin ist, musst du eine Mitgliedschaft auf der GreenSock-Website haben, um es herunterzuladen. Nachdem du es heruntergeladen hast, kannst du es in deinem Projektordner ablegen.
 Import des Plugins in dein Projekt: Nachdem du MorphSVGPlugin heruntergeladen hast, kopiere die Datei (MorphSVGPlugin.js) in einen geeigneten Ordner deines Projekts, zum Beispiel src/plugins/gsap. Dann kannst du das Plugin wie folgt importieren:*/

 /* import MorphSVGPlugin from '../plugins/gsap/MorphSVGPlugin';
 gsap.registerPlugin(MorphSVGPlugin);*/

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { MorphSVGPlugin, Draggable } from 'gsap-trial/all';
import './LightBulb.scss';
//import clickSound from './path/to/click-sound.mp3'; // Pfad zur Audio-Datei

gsap.registerPlugin(MorphSVGPlugin, Draggable);

const LightBulb = () => {
  const proxyRef = useRef(null);
  const cordsRef = useRef([]);
  const dummyCordRef = useRef(null);
  const hitSpotRef = useRef(null);
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    let startX, startY; 
    const CORD_DURATION = 0.1;
    const ENDX = dummyCordRef.current.getAttribute('x2');
    const ENDY = dummyCordRef.current.getAttribute('y2');
    //const AUDIO = new Audio(clickSound); // Erstelle das Audio-Objekt

    const resetProxy = () => {
      gsap.set(proxyRef.current, { x: ENDX, y: ENDY });
    };

    const cordTimeline = gsap.timeline({
      paused: true,
      onStart: () => {
        setIsOn((prev) => !prev);
        gsap.set([dummyCordRef.current, hitSpotRef.current], { display: 'none' });
        gsap.set(cordsRef.current[0], { display: 'block' });
        //AUDIO.play(); // Klick-Sound abspielen
      },
      onComplete: () => {
        gsap.set([dummyCordRef.current, hitSpotRef.current], { display: 'block' });
        gsap.set(cordsRef.current[0], { display: 'none' });
        resetProxy();
      },
    });

    cordsRef.current.slice(1).forEach((cord) => {
      cordTimeline.add(
        gsap.to(cordsRef.current[0], {
          morphSVG: cord,
          duration: CORD_DURATION,
          repeat: 1,
          yoyo: true,
        })
      );
    });

    Draggable.create(proxyRef.current, {
      trigger: hitSpotRef.current,
      type: 'x,y',
      onPress: (e) => {
        startX = e.x;
        startY = e.y;
      },
      onDrag: function () {
        gsap.set(dummyCordRef.current, { attr: { x2: this.x, y2: this.y } });
      },
      onRelease: function (e) {
        const distance = Math.sqrt(Math.pow(e.x - startX, 2) + Math.pow(e.y - startY, 2));
        gsap.to(dummyCordRef.current, {
          attr: { x2: ENDX, y2: ENDY },
          duration: CORD_DURATION,
          onComplete: () => {
            if (distance > 50) cordTimeline.restart();
            else resetProxy();
          },
        });
      },
    });

    return () => {
      Draggable.get(proxyRef.current)?.kill();
    };
  }, []);

  return (
    <div className="lightbulb-scene" style={{ '--on': isOn ? 1 : 0 }}>
      <svg className="toggle-scene" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin" viewBox="0 0 197.451 481.081">
        <defs>
          {/* SVG Definitions for markers and clip paths */}
        </defs>
        <g className="toggle-scene__cords">
          <path ref={(el) => (cordsRef.current[0] = el)} /* Weitere Pfade hier hinzufügen */ />
          {/* Weitere cords */}
        </g>
        <circle ref={hitSpotRef} className="toggle-scene__hit-spot" cx="98.7255" cy="380.5405" r="60" fill="transparent" />
        <line ref={dummyCordRef} x1="98.7255" y1="240.5405" x2="98.7255" y2="380.5405" className="toggle-scene__dummy-cord line" />
        <g className="toggle-scene__bulb bulb">
          {/* Birnenkomponenten */}
        </g>
      </svg>
      <div ref={proxyRef} style={{ display: 'none' }} />
    </div>
  );
};

export default LightBulb;
