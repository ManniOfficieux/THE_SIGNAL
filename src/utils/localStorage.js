const STORAGE_KEYS = {
  USER_DATA: 'theSignal_userData',
  INTERFERENCES: 'theSignal_interferences',
  SIGNALS: 'theSignal_signals',
  INTERACTIONS: 'theSignal_interactions'
};

export function initializeUser() {
  const existingUser = localStorage.getItem(STORAGE_KEYS.USER_DATA);
  
  if (!existingUser) {
    const userData = {
      codeName: generateCodeName(),
      startDate: new Date().toISOString(),
      grade: 1,
      interactions: 0,
      lastVisit: new Date().toISOString()
    };
    
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
    return userData;
  }
  
  const userData = JSON.parse(existingUser);
  userData.lastVisit = new Date().toISOString();
  localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
  
  return userData;
}

export function getUserData() {
  const data = localStorage.getItem(STORAGE_KEYS.USER_DATA);
  return data ? JSON.parse(data) : null;
}

export function updateUserData(updates) {
  const currentData = getUserData();
  const newData = { ...currentData, ...updates };
  localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(newData));
  return newData;
}

export function addInterference(interference) {
  const interferences = getInterferences();
  interferences.unshift({ ...interference, id: Date.now() });
  
  // Garder seulement les 50 dernières interférences
  if (interferences.length > 50) {
    interferences.splice(50);
  }
  
  localStorage.setItem(STORAGE_KEYS.INTERFERENCES, JSON.stringify(interferences));
}

export function getInterferences() {
  const data = localStorage.getItem(STORAGE_KEYS.INTERFERENCES);
  return data ? JSON.parse(data) : [];
}

export function addSignal(signal) {
  const signals = getSignals();
  signals.unshift({ ...signal, id: Date.now(), received: new Date().toISOString() });
  localStorage.setItem(STORAGE_KEYS.SIGNALS, JSON.stringify(signals));
}

export function getSignals() {
  const data = localStorage.getItem(STORAGE_KEYS.SIGNALS);
  return data ? JSON.parse(data) : [];
}

export function incrementInteractions() {
  const userData = getUserData();
  return updateUserData({ interactions: userData.interactions + 1 });
}

function generateCodeName() {
  const prefixes = ["ALPHA", "SIGMA", "OMEGA", "DELTA", "ZETA"];
  const numbers = Math.floor(100 + Math.random() * 900);
  return `${prefixes[Math.floor(Math.random() * prefixes.length)]}-${numbers}`;
}