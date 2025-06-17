import { useState, useEffect } from 'react';

export default function GlitchText({ children, className = "", intensity = "low" }) {
  const [isGlitching, setIsGlitching] = useState(false);
  
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.1) { // 10% chance de glitch
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 150);
      }
    }, intensity === "high" ? 500 : 2000);
    
    return () => clearInterval(glitchInterval);
  }, [intensity]);
  
  const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
  const [glitchedText, setGlitchedText] = useState(children);
  
  useEffect(() => {
    if (isGlitching && typeof children === 'string') {
      const chars = children.split('');
      const numGlitches = Math.floor(chars.length * 0.2);
      
      for (let i = 0; i < numGlitches; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        chars[randomIndex] = glitchChars[Math.floor(Math.random() * glitchChars.length)];
      }
      
      setGlitchedText(chars.join(''));
      
      setTimeout(() => setGlitchedText(children), 100);
    }
  }, [isGlitching, children]);
  
  return (
    <span className={`${className} ${isGlitching ? 'animate-glitch text-terminal-red' : ''}`}>
      {glitchedText}
    </span>
  );
}