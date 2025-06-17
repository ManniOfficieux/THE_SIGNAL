import React from 'react';
import { useState, useEffect } from 'react';
import GlitchText from './GlitchText';

export default function TerminalWindow({ title, children, className = "" }) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className={`bg-black border border-terminal-green rounded-lg overflow-hidden ${className} ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
      <div className="bg-terminal-green bg-opacity-20 px-4 py-2 border-b border-terminal-green">
        <div className="flex items-center justify-between">
          <GlitchText className="text-terminal-green font-terminal text-sm font-bold">
            {title}
          </GlitchText>
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-terminal-red animate-pulse"></div>
            <div className="w-3 h-3 rounded-full bg-terminal-yellow animate-pulse"></div>
            <div className="w-3 h-3 rounded-full bg-terminal-green animate-pulse"></div>
          </div>
        </div>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}