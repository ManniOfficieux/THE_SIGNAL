export function generateCodeName() {
  const prefixes = ["ALPHA", "SIGMA", "OMEGA", "DELTA", "ZETA", "THETA", "GAMMA", "BETA", "KAPPA", "LAMBDA"];
  const suffixes = ["OBSCURA", "CIPHER", "NEXUS", "VOID", "ECHO", "PHANTOM", "SHADOW", "GHOST", "RAVEN", "VIPER"];
  const numbers = Math.floor(100 + Math.random() * 900);
  
  const usePrefix = Math.random() > 0.5;
  const base = usePrefix 
    ? prefixes[Math.floor(Math.random() * prefixes.length)]
    : suffixes[Math.floor(Math.random() * suffixes.length)];
    
  return `${base}-${numbers}`;
}