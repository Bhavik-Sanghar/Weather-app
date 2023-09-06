import React, { useState , useEffect } from 'react';
import './MouseCircle.css'; // Create this CSS file for styling

const MouseCircle = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    const updateTrail = () => {
      setTrail([...trail, position].slice(-MAX_TRAIL_LENGTH));
      requestAnimationFrame(updateTrail);
    };

    const mouseMoveHandler = (e) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setPosition(newPosition);
    };

    // Start the trail update loop
    requestAnimationFrame(updateTrail);

    // Add the mouse move event listener
    window.addEventListener("mousemove", mouseMoveHandler);

    return () => {
      // Clean up the event listener
      window.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, [position, trail]);

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
