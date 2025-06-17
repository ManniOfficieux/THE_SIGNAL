import { useState, useEffect } from 'react';
import GlitchText from './GlitchText';

export default function CountdownTimer({ targetDate, onComplete }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isUrgent, setIsUrgent] = useState(false);
  
  function calculateTimeLeft() {
    const difference = new Date(targetDate) - new Date();
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    
    return null;
  }
  
  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      
      if (!newTimeLeft) {
        onComplete();
        clearInterval(timer);
      } else {
        // Devient urgent dans les dernières 24h
        setIsUrgent(newTimeLeft.days === 0);
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [targetDate, onComplete]);
  
  if (!timeLeft) {
    return (
      <div className="text-center py-8">
        <GlitchText className="text-terminal-red text-2xl font-terminal font-bold animate-pulse">
          SIGNAL ENTRANT...
        </GlitchText>
      </div>
    );
  }
  
  return (
    <div className={`text-center py-6 ${isUrgent ? 'animate-pulse' : ''}`}>
      <div className="text-gray-400 font-terminal text-sm mb-2">
        PROCHAIN SIGNAL DANS:
      </div>
      
      <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
        {[
          { value: timeLeft.days, label: 'JOURS' },
          { value: timeLeft.hours, label: 'HEURES' },
          { value: timeLeft.minutes, label: 'MIN' },
          { value: timeLeft.seconds, label: 'SEC' }
        ].map((unit, index) => (
          <div key={index} className="text-center">
            <div className={`text-2xl font-terminal font-bold ${
              isUrgent ? 'text-terminal-red animate-flicker' : 'text-terminal-green'
            }`}>
              {String(unit.value).padStart(2, '0')}
            </div>
            <div className="text-xs font-terminal text-gray-500">
              {unit.label}
            </div>
          </div>
        ))}
      </div>
      
      {isUrgent && (
        <div className="mt-4 text-terminal-red font-terminal text-sm animate-pulse">
          ⚠️ ALERTE: SIGNAL IMMINENT ⚠️
        </div>
      )}
    </div>
  );
}