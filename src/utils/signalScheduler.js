export function calculateNextSignal(startDate) {
  const SIGNAL_INTERVAL_DAYS = 21;
  const start = new Date(startDate);
  const today = new Date();
  
  const diffTime = today.getTime() - start.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  const cycles = Math.floor(diffDays / SIGNAL_INTERVAL_DAYS);
  const nextSignalDate = new Date(start);
  nextSignalDate.setDate(start.getDate() + (cycles + 1) * SIGNAL_INTERVAL_DAYS);
  
  const daysUntilNext = Math.ceil((nextSignalDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  return {
    nextDate: nextSignalDate,
    daysUntil: daysUntilNext,
    cycleNumber: cycles + 1
  };
}

export function generateMajorSignal(cycleNumber) {
  const signals = [
    {
      id: 1,
      title: "COORDONNÉES PRIMAIRES",
      content: "48.1361° N, 1.5115° W",
      hint: "Là où les marées révèlent l'ancien savoir",
      location: "Mont-Saint-Michel",
      type: "coordinates"
    },
    {
      id: 2,
      title: "SÉQUENCE MORSE",
      content: "... --- ... / -.. .- -. ... / .-.. . / -. --- .. .-.",
      hint: "SOS DANS LE NOIR",
      location: "Catacombes de Paris",
      type: "morse"
    },
    {
      id: 3,
      title: "CODE HEXADÉCIMAL",
      content: "4C 45 20 53 45 55 49 4C 20 53 27 4F 55 56 52 45",
      hint: "Décodage ASCII requis",
      location: "Château de Vincennes",
      type: "hex"
    },
    {
      id: 4,
      title: "FRÉQUENCE RADIO",
      content: "14.230 MHz - 03:33 UTC",
      hint: "Écoutez dans le silence de la nuit",
      location: "Observatoire de Paris",
      type: "frequency"
    },
    {
      id: 5,
      title: "MATRICE BINAIRE",
      content: "01001100 01000101 01010011 01010100",
      hint: "Les anciens parlent en binaire",
      location: "Bibliothèque Nationale de France",
      type: "binary"
    }
  ];
  
  return signals[(cycleNumber - 1) % signals.length];
}