export function generateRandomLetters(count: number): string[] {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return Array.from({ length: count }, () =>
    letters.charAt(Math.floor(Math.random() * letters.length)),
  );
}
