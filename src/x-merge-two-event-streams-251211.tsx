function mergeTwoEventStreams<T>(
  s: T[],
  t: T[],
  getSortValue: (item: T) => number
): T[] {
  const merged: T[] = [];
  const numItems = s.length + t.length;
  let sIndex: number = 0;
  let tIndex: number = 0;
  while (sIndex < s.length && tIndex < t.length) {
    const sValue = getSortValue(s[sIndex]);
    const tValue = getSortValue(t[tIndex]);
    if (sValue <= tValue) {
      merged.push(s[sIndex]);
      sIndex++;
    } else {
      merged.push(t[tIndex]);
      tIndex++;
    }
  }
  while (sIndex < s.length) {
    merged.push(s[sIndex]);
    sIndex++;
  }
  while (tIndex < t.length) {
    merged.push(t[tIndex]);
    tIndex++;
  }
  return merged;
}

interface Item {
  id: number;
  timestamp: Date;
}

const stream1: Item[] = [
  { id: 1, timestamp: new Date("2020-01-01T10:00:00Z") },
  { id: 2, timestamp: new Date("2020-01-01T10:05:00Z") },
  { id: 3, timestamp: new Date("2020-01-01T10:10:00Z") },
  { id: 4, timestamp: new Date("2020-01-01T10:20:00Z") },
  { id: 5, timestamp: new Date("2020-01-01T10:25:00Z") },
  { id: 6, timestamp: new Date("2020-01-01T10:30:00Z") },
];

const stream2: Item[] = [
  { id: 7, timestamp: new Date("2020-01-01T10:04:00Z") },
  { id: 8, timestamp: new Date("2020-01-01T10:16:00Z") },
  { id: 9, timestamp: new Date("2020-01-01T10:17:00Z") },
  { id: 10, timestamp: new Date("2020-01-01T10:21:00Z") },
  { id: 11, timestamp: new Date("2020-01-01T10:27:00Z") },
];

const test1 = mergeTwoEventStreams(stream1, stream2, (item: Item) =>
  item.timestamp.getTime()
);

console.log({ test1 });
