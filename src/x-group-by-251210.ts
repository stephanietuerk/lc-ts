function groupBy<T, K extends string | number>(
  items: T[],
  getKey: (item: T, index: number) => K
): Record<K, T[]> {
  const grouped: Record<K, T[]> = {} as Record<K, T[]>;
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const key = getKey(item, i);
    if (!Object.hasOwn(grouped, key)) {
      grouped[key] = [item];
    } else {
      grouped[key].push(item);
    }
  }
  return grouped;
}

interface State {
  abbrev: string;
  name: string;
}

const items1: State[] = [
  { abbrev: "AL", name: "Alabama" },
  { abbrev: "AK", name: "Alaska" },
  { abbrev: "AZ", name: "Arizona" },
  { abbrev: "AR", name: "Arkansas" },
  { abbrev: "CA", name: "California" },
  { abbrev: "CO", name: "Colorado" },
  { abbrev: "CT", name: "Connecticut" },
  { abbrev: "DE", name: "Delaware" },
  { abbrev: "FL", name: "Florida" },
  { abbrev: "GA", name: "Georgia" },
];

const test1 = groupBy(items1, (item: State, index: number) =>
  ["a", "e", "i", "o", "u"].includes(item.abbrev[1].toLowerCase())
    ? "endsWithVowel"
    : "endsWithConsonant"
);

console.log({ test1 });
