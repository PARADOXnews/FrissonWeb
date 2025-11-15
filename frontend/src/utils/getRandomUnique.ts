const usedNumbers: Record<string, number[]> = {};

export function getRandomUnique(max: number, key: string, used?: number[]) {
  if (!usedNumbers[key]) usedNumbers[key] = used || [];
  let num;
  do {
    num = Math.floor(Math.random() * max) + 1;
  } while (usedNumbers[key].includes(num));
  usedNumbers[key].push(num);
  return num;
}
