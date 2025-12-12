function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false;

  const characterFrequency = new Map<string, number>();

  for (let i = 0; i < s.length; i++) {
    const sChar = s[i];
    const tChar = t[i];
    if (!characterFrequency.has(sChar)) {
      characterFrequency.set(sChar, 0);
    }
    if (!characterFrequency.has(tChar)) {
      characterFrequency.set(tChar, 0);
    }
    characterFrequency.set(sChar, characterFrequency.get(sChar)! + 1);
    characterFrequency.set(tChar, characterFrequency.get(tChar)! - 1);
  }

  for (const count of characterFrequency.values()) {
    if (count !== 0) {
      return false;
    }
  }

  return true;
}

const test1 = isAnagram("anagram", "nagaram");
const test2 = isAnagram("rat", "car");

console.log({ test1, test2 });
