// src/components/BlurText.jsx
import React, { useState, useEffect } from 'react';

const BlurText = ({
  text = '',
  delay = 150,
  animateBy = 'words', // 'words' or 'letters'
  direction = 'top',   // 'top', 'bottom', 'left', 'right'
  onAnimationComplete,
  className = '',
}) => {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRevealed(true);
      if (onAnimationComplete) onAnimationComplete();
    }, delay);
    return () => clearTimeout(timer);
  }, [delay, onAnimationComplete]);

  // Split text by words or letters
  const items = animateBy === 'words' ? text.split(' ') : text.split('');

  return (
    <span className={className} style={{ display: 'inline-block' }}>
      {items.map((item, i) => (
        <span
          key={i}
          style={{
            filter: revealed ? 'none' : 'blur(8px)',
            opacity: revealed ? 1 : 0.7,
            transition: 'filter 0.6s, opacity 0.6s',
            marginRight: animateBy === 'words' ? '0.25em' : 0,
            display: 'inline-block',
            transform: !revealed
              ? direction === 'top'
                ? 'translateY(-10px)'
                : direction === 'bottom'
                ? 'translateY(10px)'
                : direction === 'left'
                ? 'translateX(-10px)'
                : direction === 'right'
                ? 'translateX(10px)'
                : ''
              : 'none',
          }}
        >
          {item}
        </span>
      ))}
    </span>
  );
};

export default BlurText;
