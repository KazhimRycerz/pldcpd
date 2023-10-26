import React, { useState, useEffect } from "react";
import './Clock.scss';

const Clock = () => {
  useEffect(() => {
    function updateTimeAndDate() {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      let amPm = hours >= 12 ? 'PM' : 'AM';
      if (hours > 12) {
          hours -= 12;
      } else if (hours === 0) {
          hours = 12;
      }
      let timeStr = hours.toString().padStart(2, '0') + minutes;
      if (timeStr.startsWith('0')) {
          timeStr = ' ' + timeStr.slice(1);
      }
      let month = (now.getMonth() + 1).toString().padStart(2, '0');
      let day = now.getDate().toString().padStart(2, '0');
      const year = now.getFullYear().toString().slice(-2);
      if (month.startsWith('0')) {
          month = ' ' + month.slice(1);
      }
      if (day.startsWith('0')) {
          day = ' ' + day.slice(1);
      }
      const displayStr = timeStr + amPm + month + day + year;
      for (let i = 0; i < 12; i++) {
          const element1 = document.getElementById('char' + i + '1');
          if (element1) {
            element1.textContent = displayStr[i];
          }
          const element2 = document.getElementById('char' + i + '2');
          if (element2) {
            element2.textContent = displayStr[i];
          }
      }
    }

    updateTimeAndDate();
    const interval = setInterval(updateTimeAndDate, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div id="clockwise">
      <svg id="noise-svg">
        {/* gives background a bit of texture */}
        <filter id='noiseFilter'>
          <feTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch' />
        </filter>
        <rect id="noise-rect" filter='url(#noiseFilter)' />
      </svg>

      <div className="clock off">
        <div className="shadow"></div>

        <div className="base-container"><div className="base"><div></div></div></div>
        <div className="small-outer-pipe">
          <div className="small-inner-pipe"></div>
        </div>
        <div className="outer-pipe">
          <div className="inner-pipe"></div>
        </div>
        <div className="pipe-accents">
          <div className="top-tube"></div>
          <div className="tube-holders">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="top"></div>
          <div className="topinset"></div>
          <div className="left"><div></div><div></div><div></div></div>
          <div className="right"><div></div><div></div><div></div></div>
          <div className="bottom-left"></div>
          <div className="bottom-right"></div>
        </div>

        <div className="display">
          <div className="row">
            <div className="col"><div>8</div><div id="char01">0</div><div id="char02">0</div></div>
            <div className="col"><div>8</div><div id="char11">0</div><div id="char12">0</div></div>
          </div>
          <div className="row">
            <div className="col"><div>8</div><div id="char21">0</div><div id="char22">0</div></div>
            <div className="col"><div>8</div><div id="char31">0</div><div id="char32">0</div></div>
          </div>
          <div style={{ height: '0.2em' }}></div>
          <div className="small-row">
            <div className="row">
              <div className="col"><div>8</div><div id="char41">0</div><div id="char42">0</div></div>
              <div className="col"><div>8</div><div id="char51">0</div><div id="char52">0</div></div>
            </div>
          </div>
          <div className="row">
            <div className="col"><div>8</div><div id="char61">0</div><div id="char62">0</div></div>
            <div className="col"><div>8</div><div id="char71">0</div><div id="char72">0</div></div>
          </div>
          <div className="row">
            <div className="col"><div>8</div><div id="char81">0</div><div id="char82">0</div></div>
            <div className="col"><div>8</div><div id="char91">0</div><div id="char92">0</div></div>
          </div>
          <div className="row">
            <div className="col"><div>8</div><div id="char101">0</div><div id="char102">0</div></div>
            <div className="col"><div>8</div><div id="char111">0</div><div id="char112">0</div></div>
          </div>
        </div>

        <div className="glass-tube"></div>
        <div className="hex">
          <div className="overlay"></div>
        </div>

        <div className="tube-base-container">
          <div className="wires"><div></div><div></div></div>
          <div className="tube-base"></div>
          <div className="rods">
            <div className="left-rod"></div>
            <div className="center-rod"></div>
            <div className="right-rod"></div>
          </div>
          <div className="tube-btm"></div>
        </div>

        <div className="power-cord">
          <div></div>
          <div></div>
        </div>

        <div className="button" onClick={() => document.querySelector('.clock').classList.toggle('off')}>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Clock;
