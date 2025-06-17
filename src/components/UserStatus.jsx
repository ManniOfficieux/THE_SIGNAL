import React from 'react';
import { useState, useEffect } from 'react';
import GlitchText from './GlitchText';
import { calculateGrade, getNextGrade } from '../utils/gradeSystem';

export default function UserStatus({ userData, nextSignal }) {
  const [showDetails, setShowDetails] = useState(false);
  const currentGrade = calculateGrade(userData.interactions);
  const nextGrade = getNextGrade(currentGrade.level);
  
  const getStatusColor = () => {
    if (nextSignal.daysUntil <= 1) return 'text-terminal-red animate-pulse';
    if (nextSignal.daysUntil <= 7) return 'text-terminal-yellow';
    return 'text-terminal-green';
  };
  
  return (
    <div className="fixed top-4 right-4 z-50">
      <div 
        className="bg-black bg-opacity-90 border border-terminal-green rounded-lg p-4 cursor-pointer hover:bg-opacity-100 transition-all duration-300"
        onClick={() => setShowDetails(!showDetails)}
      >
        <div className="text-right">
          <GlitchText className="text-terminal-green font-terminal font-bold text-lg">
            {userData.codeName}
          </GlitchText>
          <div className="text-terminal-blue font-terminal text-sm">
            {currentGrade.title}
          </div>
          <div className={`font-terminal text-xs ${getStatusColor()}`}>
            Signal dans {nextSignal.daysUntil}j
          </div>
        </div>
        
        {showDetails && (
          <div className="mt-4 pt-4 border-t border-terminal-green border-opacity-30 animate-slide-up">
            <div className="space-y-2 text-xs font-terminal">
              <div className="text-gray-400">
                Interactions: <span className="text-terminal-green">{userData.interactions}</span>
              </div>
              <div className="text-gray-400">
                Grade: <span className="text-terminal-blue">{currentGrade.description}</span>
              </div>
              {nextGrade && (
                <div className="text-gray-400">
                  Prochain: <span className="text-terminal-yellow">{nextGrade.title}</span>
                  <div className="text-xs text-gray-500">
                    ({nextGrade.requirement - userData.interactions} interactions)
                  </div>
                </div>
              )}
              <div className="text-gray-400">
                Cycle: <span className="text-terminal-red">#{nextSignal.cycleNumber}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}