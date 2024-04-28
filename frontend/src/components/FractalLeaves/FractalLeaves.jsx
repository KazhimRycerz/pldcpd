import React, { useState, useEffect, useRef } from 'react';
import "./FractalLeaves.scss";

const SubPixel = 1;
const Scale = 1;
const Phi = (3 - 5 ** .5) / 2;

const FractalLeaves = () => {
  const countElementRef = useRef(null);
  const ratioElementRef = useRef(null);
  const powElementRef = useRef(null);
  const colgenElementRef = useRef(null);
  const singleRef = useRef(null);
  const canvasRef = useRef(null);
  const [w, setW] = useState(null); // wiewport width
  const [h, setH] = useState(null); // wiewport height
  let x = useRef(null);
  let y = useRef(null);
  const [lasts, setLasts] = useState([]);
  let last = useRef(0);
  let last2 = useRef(0);
  const dots = useRef([]);
  const [count, setCount] = useState(1);
  const [cnt, setCnt] = useState(1);
  const [ratio, setRatio] = useState(0);
  const [pow, setPow] = useState(0);
  const [colgen, setColgen] = useState(0);
  let cntp = useRef(1);
  let step = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const resize = () => {
      const newW = window.innerWidth * SubPixel * devicePixelRatio;
      const newH = window.innerHeight * SubPixel * devicePixelRatio;
      setW(newW);
      setH(newH);
      ctx.fillRect(0, 0, newW, newH);
      ctx.scale(1, Scale);
      ctx.translate(newW / 2, newH / 2);
      ctx.scale(Scale, 1);
      x.current = Math.random() * newW;
      y.current = Math.random() * newH;
      last.current = 0;
      const min = Math.min(newW, newH);
      dots.current = [];
      step.current = 2e6;
      const newCount = countElementRef.current ? countElementRef.current.valueAsNumber || 1 : 1;
      const newRatio = ratioElementRef.current ? ratioElementRef.current.valueAsNumber : 0;
      const newPow = powElementRef.current ? powElementRef.current.valueAsNumber : 0;
      const newColgen = colgenElementRef.current ? colgenElementRef.current.valueAsNumber : 0;
      setCount(newCount);
      setRatio(newRatio);
      setPow(newPow);
      setColgen(newColgen);
      setCnt(Math.ceil(newCount));
      cntp.current = Math.ceil(newCount) ** newPow;
      for (let i = 0; i < newCount; i++) {
        const angle = Math.PI * 2 * (i) / newCount;
        const newX = Math.sin(angle) * min / 2;
        const newY = -Math.cos(angle) * min / 2;
        dots.current.push({ x: newX, y: newY });
      }
      draw();
    };

    window.addEventListener('resize', resize);
    window.addEventListener('click', () => step.current = 2e6);
    singleRef.current.addEventListener('change', resize);
    countElementRef.current.addEventListener('input', resize);
    ratioElementRef.current.addEventListener('input', resize);
    powElementRef.current.addEventListener('input', resize);
    colgenElementRef.current.addEventListener('input', resize);

    resize();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('click', () => step.current = 2e6);
      singleRef.current.removeEventListener('change', resize);
      countElementRef.current.removeEventListener('input', resize);
      ratioElementRef.current.removeEventListener('input', resize);
      powElementRef.current.removeEventListener('input', resize);
      colgenElementRef.current.removeEventListener('input', resize);
    };
  }, []);

  function draw() {
    if (--step.current < 0) return;
    let i = lasts[0] + (Math.random() ** 2 * cntp.current | 0);
    i = (i % count + count) % count | 0;
    const dot = dots.current[i];
    x.current = x.current * (1 - ratio) + dot.x * ratio;
    y.current = y.current * (1 - ratio) + dot.y * ratio;
    let newLasts = [...lasts];
    newLasts.unshift(i);
    setLasts(newLasts);
    const hue = colgen ? newLasts[colgen - 1] : 0;
    if (singleRef.current.checked && i !== 0) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = `oklch(55% 0.27 ${-hue / count}turn / .6)`;
    ctx.beginPath();
    ctx.arc(x.current, y.current, .3 / Scale, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    newLasts.length = 9;
  }

  const loop =()=> {
    const init = performance.now();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = "#fff";
    while (performance.now() - init - 1000 / 45 < 0)
      draw();
    window.requestAnimationFrame(loop);
  }

  return (
    <>
      <div className="ctrl">
        <label> <input id="single" type="checkbox" ref={singleRef} /> single </label>
        <br />
        <input id="count" type="number" min='2' max='13' defaultValue='11' step='1' ref={countElementRef} />

        <br />
        <input id="ratio" type="number" min='0' max='1' step='0.02' defaultValue='0.54' ref={ratioElementRef} />
        <br />
        <input id="pow" type="number" min='0' max='1' defaultValue='0.5' step='0.025' ref={powElementRef} />
        <br />
        <input id="colgen" type="number" min='0' max='10' defaultValue='5' step='1' ref={colgenElementRef} />
      </div>
      <canvas ref={canvasRef} className="canvas"></canvas>
    </>
  );
};

export default FractalLeaves;
