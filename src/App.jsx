import React from 'react';
import { useState, useEffect } from 'react';
import UserStatus from './components/UserStatus';
import TerminalWindow from './components/TerminalWindow';
import SignalDisplay from './components/SignalDisplay';
import InterferenceLog from './components/InterferenceLog';
import CountdownTimer from './components/CountdownTimer';
import ApplicationForm from './components/ApplicationForm';
import GlitchText from './components/GlitchText';
import { 
  initializeUser, 
  getUserData, 
  updateUserData, 
  addInterference, 
  getInterferences,
  addSignal,
  getSignals,
  incrementInteractions 
} from './utils/localStorage';
import { generateInterference } from './utils/interferenceGenerator';
import { calculateNextSignal, generateMajorSignal } from './utils/signalScheduler';
import { calculateGrade } from './utils/gradeSystem';

function App() {
  const [userData, setUserData] = useState(null);
  const [interferences, setInterferences] = useState([]);
  const [signals, setSignals] = useState([]);
  const [nextSignal, setNextSignal] = useState(null);
  const [currentSignal, setCurrentSignal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showApplication, setShowApplication] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  // Initialisation
  useEffect(() => {
    const user = initializeUser();
    setUserData(user);
    setInterferences(getInterferences());
    setSignals(getSignals());
    
    const signalInfo = calculateNextSignal(user.startDate);
    setNextSignal(signalInfo);
    
    // Vérifier s'il y a un signal en attente
    if (signalInfo.daysUntil <= 0) {
      const signal = generateMajorSignal(signalInfo.cycleNumber);
      setCurrentSignal(signal);
      addSignal(signal);
      setSignals(prev => [signal, ...prev]);
    }
    
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  // Génération d'interférences aléatoires
  useEffect(() => {
    if (!userData) return;
    
    const interferenceInterval = setInterval(() => {
      if (Math.random() < 0.3) { // 30% de chance toutes les 30 secondes
        const interference = generateInterference(userData.codeName);
        addInterference(interference);
        setInterferences(prev => [interference, ...prev]);
      }
    }, 30000);
    
    return () => clearInterval(interferenceInterval);
  }, [userData]);

  const handleInteraction = () => {
    const newUserData = incrementInteractions();
    setUserData(newUserData);
    
    // Mise à jour du grade si nécessaire
    const newGrade = calculateGrade(newUserData.interactions);
    if (newGrade.level > calculateGrade(newUserData.interactions - 1).level) {
      // Nouveau grade atteint - générer une interférence spéciale
      const specialInterference = {
        message: `PROMOTION DÉTECTÉE: Nouveau grade ${newGrade.title} accordé.`,
        timestamp: new Date().toLocaleTimeString('fr-FR', { hour12: false }),
        codeName: userData.codeName
      };
      addInterference(specialInterference);
      setInterferences(prev => [specialInterference, ...prev]);
    }
  };

  const handleSignalComplete = () => {
    // Générer le prochain signal
    const signalInfo = calculateNextSignal(userData.startDate);
    const signal = generateMajorSignal(signalInfo.cycleNumber);
    setCurrentSignal(signal);
    addSignal(signal);
    setSignals(prev => [signal, ...prev]);
    
    // Recalculer le prochain signal
    const nextSignalInfo = calculateNextSignal(userData.startDate);
    setNextSignal(nextSignalInfo);
  };

  const handleApplicationSubmit = (formData) => {
    setApplicationSubmitted(true);
    
    // Générer une interférence de confirmation
    const confirmationInterference = {
      message: "CANDIDATURE REÇUE. Analyse en cours par le conseil de l'élite...",
      timestamp: new Date().toLocaleTimeString('fr-FR', { hour12: false }),
      codeName: userData.codeName
    };
    addInterference(confirmationInterference);
    setInterferences(prev => [confirmationInterference, ...prev]);
    
    handleInteraction();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-terminal-green text-6xl font-terminal animate-pulse mb-4">
            📡
          </div>
          <GlitchText className="text-terminal-green text-2xl font-terminal font-bold">
            INITIALISATION DU SIGNAL...
          </GlitchText>
          <div className="text-gray-500 font-terminal text-sm mt-4 animate-pulse">
            Connexion aux serveurs cryptés en cours...
          </div>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-terminal-red text-xl font-terminal">
          ERREUR: Impossible d'initialiser la session
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      {/* Effet de fond animé */}
      <div className="fixed inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-terminal-green via-transparent to-terminal-blue animate-pulse-slow"></div>
      </div>
      
      {/* Status utilisateur */}
      <UserStatus userData={userData} nextSignal={nextSignal} />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <GlitchText className="text-6xl font-terminal font-bold text-terminal-green mb-4" intensity="high">
            THE SIGNAL
          </GlitchText>
          <div className="text-gray-400 font-terminal text-sm max-w-2xl mx-auto">
            Une expérience cryptique réservée à l'élite. Suivez les signaux. Décryptez. Progressez.
          </div>
        </div>

        {/* Signal actuel ou countdown */}
        {currentSignal ? (
          <SignalDisplay 
            signal={currentSignal} 
            onInteract={handleInteraction}
          />
        ) : (
          <TerminalWindow title="SIGNAL EN ATTENTE" className="mb-6">
            <CountdownTimer 
              targetDate={nextSignal.nextDate}
              onComplete={handleSignalComplete}
            />
          </TerminalWindow>
        )}

        {/* Formulaire de candidature */}
        {userData.interactions >= 10 && (
          <div className="mb-6">
            <div className="flex justify-center mb-4">
              <button
                onClick={() => {
                  setShowApplication(!showApplication);
                  handleInteraction();
                }}
                className="bg-terminal-yellow bg-opacity-20 hover:bg-opacity-30 border border-terminal-yellow text-terminal-yellow px-6 py-3 rounded font-terminal transition-all duration-300"
              >
                {showApplication ? 'MASQUER CANDIDATURE' : 'REJOINDRE L\'ÉLITE'}
              </button>
            </div>
            
            {showApplication && !applicationSubmitted && (
              <ApplicationForm
                userData={userData}
                onSubmit={handleApplicationSubmit}
                onInteract={handleInteraction}
              />
            )}
            
            {applicationSubmitted && (
              <TerminalWindow title="CANDIDATURE SOUMISE" className="mb-6">
                <div className="text-center py-8">
                  <div className="text-terminal-green text-6xl mb-4">✓</div>
                  <GlitchText className="text-terminal-green font-terminal text-lg font-bold mb-4">
                    CANDIDATURE TRANSMISE AVEC SUCCÈS
                  </GlitchText>
                  <div className="text-gray-300 font-terminal text-sm">
                    Votre dossier est en cours d'analyse par le conseil de l'élite.
                    Vous serez contacté si votre profil correspond à nos critères.
                  </div>
                  <div className="text-terminal-red font-terminal text-xs mt-4 animate-pulse">
                    CONFIDENTIALITÉ ABSOLUE REQUISE
                  </div>
                </div>
              </TerminalWindow>
            )}
          </div>
        )}

        {/* Log des interférences */}
        <InterferenceLog 
          interferences={interferences}
          onInteract={handleInteraction}
        />

        {/* Historique des signaux */}
        {signals.length > 0 && (
          <TerminalWindow title="SIGNAUX PRÉCÉDENTS" className="mb-6">
            <div className="space-y-4">
              {signals.slice(0, 3).map((signal, index) => (
                <div key={signal.id} className="border-l-2 border-terminal-blue border-opacity-50 pl-4 py-2">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-terminal-blue font-terminal font-bold">
                      {signal.title}
                    </span>
                    <span className="text-gray-500 text-xs font-terminal">
                      {new Date(signal.received).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  <div className="text-gray-400 font-terminal text-sm">
                    {signal.content}
                  </div>
                  {signal.location && (
                    <div className="text-terminal-yellow font-terminal text-xs mt-1">
                      📍 {signal.location}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TerminalWindow>
        )}

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-800">
          <div className="text-gray-600 font-terminal text-xs">
            <GlitchText intensity="low">
              "Le silence précède toujours la révélation"
            </GlitchText>
          </div>
          <div className="text-gray-700 font-terminal text-xs mt-2">
            Session: {userData.codeName} | Grade: {calculateGrade(userData.interactions).title}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;