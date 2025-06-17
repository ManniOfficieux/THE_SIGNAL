function generateInterference(user) {
  const phrases = [
    "Le signal est instable...",
    "Un code oublié refait surface.",
    "Vos pas résonnent dans un vide surveillé.",
    "L’élite observe.",
    "Code intercepté : Ψ-17"
  ];
  const msg = phrases[Math.floor(Math.random() * phrases.length)];
  return `[${user}] ${msg}`;
}
