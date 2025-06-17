export const GRADES = [
  { level: 1, title: "OBSERVATEUR", description: "Vous voyez les signaux", requirement: 0 },
  { level: 2, title: "INITIÉ", description: "Vous comprenez les codes", requirement: 3 },
  { level: 3, title: "ADMIS", description: "Vous déchiffrez les mystères", requirement: 7 },
  { level: 4, title: "GARDIEN", description: "Vous protégez les secrets", requirement: 15 },
  { level: 5, title: "OBSIDIEN", description: "Vous êtes l'élite", requirement: 30 }
];

export function calculateGrade(interactions) {
  for (let i = GRADES.length - 1; i >= 0; i--) {
    if (interactions >= GRADES[i].requirement) {
      return GRADES[i];
    }
  }
  return GRADES[0];
}

export function getNextGrade(currentLevel) {
  return GRADES.find(grade => grade.level > currentLevel) || null;
}