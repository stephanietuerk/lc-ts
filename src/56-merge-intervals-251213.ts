function merge(intervals: number[][]): number[][] {
  intervals.sort((a, b) => {
    if (a[0] === b[0]) {
      return a[1] - b[1];
    } else {
      return a[0] - b[0];
    }
  });

  const values: number[][] = [];
  for (let i = 0; i < intervals.length; i++) {
    const interval = intervals[i];
    if (i === 0) {
      values.push(interval);
    } else {
      if (interval[0] > values[values.length - 1][1]) {
        values.push(interval);
      } else if (interval[1] > values[values.length - 1][1]) {
        values[values.length - 1][1] = interval[1];
      }
    }
  }
  return values;
}

const test1 = merge([
  [1, 3],
  [2, 6],
  [8, 10],
  [15, 18],
]);

const test2 = merge([
  [1, 4],
  [4, 5],
]);

const test3 = merge([
  [4, 7],
  [1, 4],
]);

const test4 = merge([
  [1, 4],
  [2, 3],
]);

console.log({ test1, test2, test3, test4 });
