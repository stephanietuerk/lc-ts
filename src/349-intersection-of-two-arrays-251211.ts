function intersection(nums1: number[], nums2: number[]): number[] {
  if (nums1.length === 0 && nums2.length === 0) return [];

  const values = new Map<number, { a: boolean; b: boolean }>();

  const length = nums1.length > nums2.length ? nums1.length : nums2.length;
  for (let i = 0; i < length; i++) {
    const num1 = nums1[i];
    const num2 = nums2[i];
    if (num1 !== undefined) {
      if (!values.has(num1)) {
        values.set(num1, { a: true, b: false });
      }
      values.get(num1)!.a = true;
    }
    if (num2 !== undefined) {
      if (!values.has(num2)) {
        values.set(num2, { a: false, b: true });
      }
      values.get(num2)!.b = true;
    }
  }

  const intersection = [];
  for (const item of values.entries()) {
    if (item[1].a && item[1].b) {
      intersection.push(item[0]);
    }
  }
  return intersection;
}

const test1 = intersection([1, 2, 2, 1], [2, 2]);
const test2 = intersection([4, 9, 5], [9, 4, 9, 8, 4]);

console.log({ test1, test2 });
