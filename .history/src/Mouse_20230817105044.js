import React, { useState } from 'react';
import './MouseCircle.css'; // Create this CSS file for styling

const MouseCircle = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="mouse-circle-container" onMouseMove={handleMouseMove}>
    <div className="mouse-trail">
      {trail.map((trailPosition, index) => (
        <div
          key={index}
          className="trail-dot"
          style={{
            left: trailPosition.x,
            top: trailPosition.y,
            animationDelay: `${index * 50}ms`, // Adjust the animation delay
          }}
        />
      ))}
    </div>
    <div
      className="mouse-circle"
      style={{ left: position.x, top: position.y }}
    />
  </div>
  );
};

export default MouseCircle;
