import React from 'react';
import { useState, useEffect } from 'react';
import TerminalWindow from './TerminalWindow';
import GlitchText from './GlitchText';

export default function SignalDisplay({ signal, onInteract }) {
  const [isDecoding, setIsDecoding] = useState(false);
  const [showHint, setShowHint] = useState(false);
  
  const handleDecode = () => {
    setIsDecoding(true);
    onInteract();
    
    setTimeout(() => {
      setIsDecoding(false);
      setShowHint(true);
    }, 2000);
  };
  
  const getSignalIcon = (type) => {
    switch (type) {
      case 'coordinates': return '🌍';
      case 'morse': return '📡';
      case 'hex': return '🔢';
      case 'frequency': return '📻';
      case 'binary': return '💾';
      default: return '🔍';
    }
  };
  
  return (
    <TerminalWindow title={`SIGNAL MAJEUR #${signal.id}`} className="mb-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{getSignalIcon(signal.type)}</span>
          <GlitchText className="text-terminal-green text-xl font-bold">
            {signal.title}
          </GlitchText>
        </div>
        
        <div className="bg-gray-900 p-4 rounded border border-terminal-green border-opacity-30">
          <div className="font-terminal text-terminal-green text-lg tracking-wider">
            {signal.content}
          </div>
        </div>
        
        <div className="flex space-x-4">
          <button
            onClick={handleDecode}
            disabled={isDecoding}
            className="bg-terminal-green bg-opacity-20 hover:bg-opacity-30 border border-terminal-green text-terminal-green px-4 py-2 rounded font-terminal transition-all duration-300 disabled:opacity-50"
          >
            {isDecoding ? 'DÉCODAGE...' : 'DÉCODER'}
          </button>
          
          {showHint && (
            <div className="flex-1 animate-slide-up">
              <div className="text-terminal-yellow font-terminal text-sm">
                💡 INDICE: {signal.hint}
              </div>
              <div className="text-terminal-blue font-terminal text-xs mt-1">
                📍 LOCALISATION: {signal.location}
              </div>
            </div>
          )}
        </div>
        
        {isDecoding && (
          <div className="text-center">
            <div className="inline-block animate-spin text-terminal-green text-2xl">⚡</div>
            <div className="text-terminal-green font-terminal text-sm mt-2 animate-pulse">
              Analyse des fréquences en cours...
            </div>
          </div>
        )}
      </div>
    </TerminalWindow>
  );
}