import { useState, useEffect } from 'react';
import TerminalWindow from './TerminalWindow';
import GlitchText from './GlitchText';

export default function InterferenceLog({ interferences, onInteract }) {
  const [visibleCount, setVisibleCount] = useState(3);
  
  const showMore = () => {
    setVisibleCount(prev => Math.min(prev + 5, interferences.length));
    onInteract();
  };
  
  return (
    <TerminalWindow title="INTERFÉRENCES DÉTECTÉES" className="mb-6">
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {interferences.slice(0, visibleCount).map((interference, index) => (
          <div
            key={interference.id}
            className="border-l-2 border-terminal-red border-opacity-50 pl-4 py-2 animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex justify-between items-start mb-1">
              <span className="text-terminal-red text-xs font-terminal">
                [{interference.codeName}]
              </span>
              <span className="text-gray-500 text-xs font-terminal">
                {interference.timestamp}
              </span>
            </div>
            <GlitchText 
              className="text-gray-300 font-terminal text-sm"
              intensity="low"
            >
              {interference.message}
            </GlitchText>
          </div>
        ))}
        
        {visibleCount < interferences.length && (
          <button
            onClick={showMore}
            className="w-full text-terminal-blue hover:text-terminal-green font-terminal text-sm py-2 border border-terminal-blue border-opacity-30 rounded hover:border-terminal-green transition-all duration-300"
          >
            CHARGER PLUS D'INTERFÉRENCES ({interferences.length - visibleCount} restantes)
          </button>
        )}
        
        {interferences.length === 0 && (
          <div className="text-center text-gray-500 font-terminal text-sm py-8">
            Aucune interférence détectée...
            <div className="text-xs mt-2 animate-pulse">
              Le silence précède toujours la tempête.
            </div>
          </div>
        )}
      </div>
    </TerminalWindow>
  );
}