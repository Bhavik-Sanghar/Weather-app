import React, { useState } from 'react';
import './MouseCircle.css'; // Create this CSS file for styling

const MouseCircle = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="mouse-circle" style={{ left: position.x, top: position.y }} onMouseMove={handleMouseMove}>
    <div id="minicircle"></div>
    </div>
  );
};

export default MouseCircle;
