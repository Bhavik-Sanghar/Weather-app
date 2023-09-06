import React, { useState, useEffect } from 'react';
import './MouseCircle.css'; // Create this CSS file for styling

const MouseCircle = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="mouse-circle-container" onMouseMove={handleMouseMove}>
      <div className="mouse-circle" style={{ left: position.x, top: position.y }}>
        <div id="minicircle"></div>
      </div>
    </div>
  );
};

export default MouseCircle;
