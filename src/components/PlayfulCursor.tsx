
import React, { useState, useEffect } from 'react';

const PlayfulCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', updatePosition);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  return (
    <div 
      className={`pointer-events-none fixed z-50 h-6 w-6 rounded-full border-2 border-bloom-pink bg-transparent transition-transform duration-100 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        left: `${position.x - 12}px`, 
        top: `${position.y - 12}px`,
        transform: 'translate(-50%, -50%)'
      }}
    />
  );
};

export default PlayfulCursor;
