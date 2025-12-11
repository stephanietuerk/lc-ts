function twoSum(nums: number[], target: number): number[] {
  const indexByValue = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    const n = nums[i];
    const lookingFor = target - n;
    if (indexByValue.has(lookingFor)) {
      const matchIndex = indexByValue.get(lookingFor);
      return [matchIndex!, i];
    }
    indexByValue.set(n, i);
  }
  return [];
}

const test1 = twoSum([2, 7, 11, 15], 9);
const test2 = twoSum([3, 2, 4], 6);
const test3 = twoSum([3, 3], 6);

console.log({ test1, test2, test3 });
