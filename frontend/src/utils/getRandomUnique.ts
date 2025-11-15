// utils/getRandomUnique.ts
const usedNumbers: Record<string, Set<number>> = {};

export function getRandomUnique(max: number, key = "default"): number {
  if (!usedNumbers[key]) usedNumbers[key] = new Set<number>();

  if (usedNumbers[key].size >= max) usedNumbers[key].clear(); // reset if all numbers used

  let num: number;
  do {
    num = Math.floor(Math.random() * max) + 1; // 1–max
  } while (usedNumbers[key].has(num));

  usedNumbers[key].add(num);
  return num;
}
