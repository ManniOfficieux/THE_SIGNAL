export function generateInterference(codeName) {
  const phrases = [
    "Le signal est instable... Réception brouillée.",
    "Un code oublié refait surface dans les données.",
    "Vos pas résonnent dans un vide surveillé.",
    "L'élite observe. Ils savent que vous êtes là.",
    "Code intercepté : Ψ-17... Déchiffrement en cours.",
    "Transmission corrompue. Source inconnue.",
    "Fréquence parasitée. Origine : [CLASSIFIÉ]",
    "Votre progression a été notée.",
    "Les anciens protocoles s'activent.",
    "Signal fantôme détecté sur votre terminal.",
    "Intrusion dans le réseau. Traçage impossible.",
    "Vous n'êtes pas seul dans ce système.",
    "Les gardiens du seuil vous testent.",
    "Écho d'une transmission perdue depuis 1947.",
    "Votre code d'accès expire dans [ERREUR]",
  ];
  
  const msg = phrases[Math.floor(Math.random() * phrases.length)];
  const timestamp = new Date().toLocaleTimeString('fr-FR', { 
    hour12: false, 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  });
  
  return {
    message: msg,
    timestamp,
    codeName
  };
}