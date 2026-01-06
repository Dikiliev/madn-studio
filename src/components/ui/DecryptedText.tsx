import React, { useEffect, useState, useRef } from 'react';

interface DecryptedTextProps {
  text: string;
  className?: string;
  animateOnHover?: boolean;
  speed?: number;
  revealSpeed?: number;
}

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

export const DecryptedText: React.FC<DecryptedTextProps> = ({
  text,
  className = '',
  animateOnHover = true,
  speed = 30,
  revealSpeed = 0.3, // Slower reveal for more dramatic effect
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const animate = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    // Start with negative iteration to scramble the entire text for a moment
    // This prevents the "only last letters changing" feeling
    let iteration = -8; 

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setDisplayText(prev => 
        text
          .split('')
          .map((letter, index) => {
            // Preserve spaces for better readability during animation
            if (letter === ' ') return ' ';

            // If we've passed this index, show the real letter
            if (index < iteration) {
              return text[index];
            }
            
            // Otherwise show a random character
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        setIsAnimating(false);
        setDisplayText(text); // Ensure it ends on the correct text
      }

      iteration += revealSpeed;
    }, speed);
  };

  useEffect(() => {
    animate();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [text]); // Re-run if prop text changes

  return (
    <span
      className={`inline-block whitespace-nowrap cursor-default ${className}`}
      onMouseEnter={animateOnHover ? animate : undefined}
    >
      {displayText}
    </span>
  );
};


