// last item in the array emits first - imagine as stream of queued events
function dedupeSlidingWindow<T extends string | number>(
  items: T[],
  window: number
): T[] {
  const dedupedItems: T[] = [];
  for (let i = items.length - 1; i > -1; i--) {
    const item = items[i];
    const windowArray =
      dedupedItems.length > window
        ? dedupedItems.slice(-1 * window)
        : dedupedItems;
    if (!windowArray.includes(item)) {
      dedupedItems.push(item);
    }
  }
  return dedupedItems.reverse();
}

const test1 = dedupeSlidingWindow(["a", "b", "a", "a", "c", "a", "b"], 2);

console.log({ test1 });
