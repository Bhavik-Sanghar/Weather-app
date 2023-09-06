import React, { useState , useEffect } from 'react';
import './MouseCircle.css'; // Create this CSS file for styling

const MouseCircle = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState([]);

  const handleMouseMove = (e) => {
    const newPosition = { x: e.clientX, y: e.clientY };
    setPosition(newPosition);
    setTrail([...trail, newPosition]);
  };

  // Limit the trail length to prevent memory buildup
  const MAX_TRAIL_LENGTH = Infinity;
  useEffect(() => {
    if (trail.length > MAX_TRAIL_LENGTH) {
      setTrail(trail.slice(trail.length - MAX_TRAIL_LENGTH));
    }
  }, [trail]);

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
            animationDelay: `${index * 20}ms`, // Adjust the animation delay
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
