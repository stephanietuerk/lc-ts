function partition<T>(
  items: T[],
  predicate: (item: T, index: number) => boolean
): [T[], T[]] {
  const included: T[] = [];
  const excluded: T[] = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const include = predicate(item, i);
    const arr = include ? included : excluded;
    arr.push(item);
  }
  return [included, excluded];
}

const test1 = partition(
  [0, 1, 2, 3, 4, 5],
  (item: number, index: number) => item % 2 === 0
);
const test2 = partition(
  "The quick brown fox jumped over the lazy dog".split(" "),
  (item: string, index: number) => item.length > 4
);

console.log({ test1, test2 });
