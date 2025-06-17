import React from 'react';
import { useState } from 'react';
import TerminalWindow from './TerminalWindow';
import GlitchText from './GlitchText';

export default function ApplicationForm({ userData, onSubmit, onInteract }) {
  const [formData, setFormData] = useState({
    realName: '',
    email: '',
    motivation: '',
    secretCode: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    onInteract();
    
    // Simulation d'envoi avec délai
    setTimeout(() => {
      onSubmit(formData);
      setIsSubmitting(false);
    }, 3000);
  };
  
  const canApply = userData.interactions >= 15; // Niveau GARDIEN requis
  
  if (!canApply) {
    return (
      <TerminalWindow title="CANDIDATURE - ACCÈS REFUSÉ" className="mb-6">
        <div className="text-center py-8">
          <div className="text-terminal-red text-6xl mb-4">🚫</div>
          <GlitchText className="text-terminal-red font-terminal text-lg font-bold">
            NIVEAU D'AUTORISATION INSUFFISANT
          </GlitchText>
          <div className="text-gray-400 font-terminal text-sm mt-4">
            Progression requise: GARDIEN (15+ interactions)
          </div>
          <div className="text-gray-400 font-terminal text-sm">
            Votre niveau: {userData.interactions} interactions
          </div>
        </div>
      </TerminalWindow>
    );
  }
  
  if (!showForm) {
    return (
      <TerminalWindow title="CANDIDATURE DISPONIBLE" className="mb-6">
        <div className="text-center py-8">
          <div className="text-terminal-yellow text-6xl mb-4">🔓</div>
          <GlitchText className="text-terminal-green font-terminal text-lg font-bold mb-4">
            ACCÈS AUTORISÉ - NIVEAU GARDIEN
          </GlitchText>
          <div className="text-gray-300 font-terminal text-sm mb-6">
            Vous avez atteint le niveau requis pour postuler à l'élite.
            Cette opportunité ne se présente qu'une fois.
          </div>
          <button
            onClick={() => {
              setShowForm(true);
              onInteract();
            }}
            className="bg-terminal-green bg-opacity-20 hover:bg-opacity-30 border border-terminal-green text-terminal-green px-6 py-3 rounded font-terminal transition-all duration-300"
          >
            COMMENCER LA CANDIDATURE
          </button>
        </div>
      </TerminalWindow>
    );
  }
  
  return (
    <TerminalWindow title="FORMULAIRE DE CANDIDATURE - CONFIDENTIEL" className="mb-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-terminal-yellow font-terminal text-sm mb-4 p-3 border border-terminal-yellow border-opacity-30 rounded">
          ⚠️ ATTENTION: Ces informations seront transmises directement à l'élite.
          Toute fausse déclaration entraînera une exclusion définitive.
        </div>
        
        <div>
          <label className="block text-terminal-green font-terminal text-sm mb-2">
            NOM RÉEL (Obligatoire)
          </label>
          <input
            type="text"
            value={formData.realName}
            onChange={(e) => setFormData({...formData, realName: e.target.value})}
            className="w-full bg-black border border-terminal-green text-terminal-green font-terminal p-3 rounded focus:border-terminal-yellow focus:outline-none"
            placeholder="Votre identité sera vérifiée..."
            required
          />
        </div>
        
        <div>
          <label className="block text-terminal-green font-terminal text-sm mb-2">
            EMAIL SÉCURISÉ (Obligatoire)
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full bg-black border border-terminal-green text-terminal-green font-terminal p-3 rounded focus:border-terminal-yellow focus:outline-none"
            placeholder="Communication cryptée uniquement"
            required
          />
        </div>
        
        <div>
          <label className="block text-terminal-green font-terminal text-sm mb-2">
            MOTIVATION (500 caractères max)
          </label>
          <textarea
            value={formData.motivation}
            onChange={(e) => setFormData({...formData, motivation: e.target.value.slice(0, 500)})}
            className="w-full bg-black border border-terminal-green text-terminal-green font-terminal p-3 rounded focus:border-terminal-yellow focus:outline-none h-32 resize-none"
            placeholder="Pourquoi méritez-vous de rejoindre l'élite ?"
            required
          />
          <div className="text-right text-gray-500 text-xs font-terminal mt-1">
            {formData.motivation.length}/500
          </div>
        </div>
        
        <div>
          <label className="block text-terminal-green font-terminal text-sm mb-2">
            CODE SECRET (Si vous en possédez un)
          </label>
          <input
            type="password"
            value={formData.secretCode}
            onChange={(e) => setFormData({...formData, secretCode: e.target.value})}
            className="w-full bg-black border border-terminal-green text-terminal-green font-terminal p-3 rounded focus:border-terminal-yellow focus:outline-none"
            placeholder="Laissez vide si inconnu"
          />
        </div>
        
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-terminal-red bg-opacity-20 hover:bg-opacity-30 border border-terminal-red text-terminal-red px-6 py-3 rounded font-terminal transition-all duration-300 disabled:opacity-50"
          >
            {isSubmitting ? 'TRANSMISSION EN COURS...' : 'SOUMETTRE CANDIDATURE'}
          </button>
          
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="bg-gray-700 hover:bg-gray-600 text-gray-300 px-6 py-3 rounded font-terminal transition-all duration-300"
          >
            ANNULER
          </button>
        </div>
        
        {isSubmitting && (
          <div className="text-center py-4">
            <div className="inline-block animate-spin text-terminal-red text-2xl mb-2">⚡</div>
            <div className="text-terminal-red font-terminal text-sm animate-pulse">
              Chiffrement et transmission vers les serveurs de l'élite...
            </div>
          </div>
        )}
      </form>
    </TerminalWindow>
  );
}