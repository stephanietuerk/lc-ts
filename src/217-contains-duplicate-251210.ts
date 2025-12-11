function containsDuplicate(nums: number[]): boolean {
  const valuesMap = new Map<number, boolean>();

  for (let i = 0; i < nums.length; i++) {
    if (valuesMap.has(nums[i])) {
      return true;
    }
    valuesMap.set(nums[i], true);
  }
  return false;
}

const test1 = containsDuplicate([1, 2, 3, 1]);
const test2 = containsDuplicate([1, 2, 3, 4]);
const test3 = containsDuplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2]);

console.log({ test1, test2, test3 });
