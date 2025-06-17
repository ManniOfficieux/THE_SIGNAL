function generateCodeName() {
  const prefix = ["ALPHA", "SIGMA", "OMEGA", "DELTA", "ZETA"];
  const number = Math.floor(100 + Math.random() * 900);
  return prefix[Math.floor(Math.random() * prefix.length)] + "-" + number;
}
