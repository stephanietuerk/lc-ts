function checkIfPangram(sentence: string): boolean {
  const unique = new Map<string, number>();
  for (let i = 0; i < sentence.length; i++) {
    if (!unique.has(sentence[i])) {
      unique.set(sentence[i], 1);
    }
  }
  return [...unique.keys()].length === 26;
}

console.log(checkIfPangram("thequickbrownfoxjumpsoverthelazydog"));
