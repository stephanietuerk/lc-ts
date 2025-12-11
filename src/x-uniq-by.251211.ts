function uniqBy<T extends Record<string, unknown>>(
  items: T[],
  getKey: (item: T, index?: number) => string
): T[] {
  const uniq = new Set<string>();
  const uniqued: T[] = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const key = getKey(item, i);
    if (!uniq.has(key)) {
      uniq.add(key);
      uniqued.push(item);
    }
  }
  return uniqued;
}

const items1 = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 1, name: "Bob" },
  { id: 3, name: "Charlie" },
  { id: 2, name: "Alice" },
];

const test1 = uniqBy(items1, (item) => "id-" + item.id);

console.log({ test1 });
