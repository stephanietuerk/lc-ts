interface Item {
  id: number;
  name: string;
  parentId: number | null;
}

const input1: Item[] = [
  { id: 1, name: "Root", parentId: null },
  { id: 2, name: "Child A", parentId: 1 },
  { id: 3, name: "Child B", parentId: 1 },
  { id: 4, name: "Grandchild A1", parentId: 2 },
  { id: 5, name: "Grandchild B1", parentId: 3 },
  { id: 6, name: "Child C", parentId: 1 },
  { id: 6, name: "Child C", parentId: 2 },
  { id: 7, name: "Child D", parentId: 9 },
  { id: 8, name: "Child D", parentId: 7 },
  { id: 9, name: "Child D", parentId: 8 },
  { id: 10, name: "Child D", parentId: 11 },
];

interface NestedItem {
  id: number;
  name: string;
  children: NestedItem[];
}

function hasCircularRef(
  id: number,
  parentByChild: Map<number, number | null>,
  seenIds: Set<number>
): boolean {
  const parent = parentByChild.get(id)!;
  if (seenIds.has(parent)) {
    console.log(`seen detected for id ${id}, with parent ${parent}`, [
      ...seenIds,
    ]);
    return true;
  } else if (parent !== null) {
    seenIds.add(parent);
    return hasCircularRef(parent, parentByChild, seenIds);
  } else {
    return false;
  }
}

function hierarchicalNest(items: Item[]): NestedItem[] {
  const nodes = new Map<number, NestedItem>();
  const parentByChild = new Map<number, number | null>();
  for (const item of items) {
    if (nodes.has(item.id)) {
      warnForDuplicate(item);
    } else {
      nodes.set(item.id, { id: item.id, name: item.name, children: [] });
    }
    parentByChild.set(item.id, item.parentId);
  }
  for (const item of items) {
    if (item.parentId !== null) {
      const parent = nodes.get(item.parentId);
      if (!parent) {
        warnForOrphan(item);
      } else {
        const idsInHierarchy = new Set<number>();
        idsInHierarchy.add(item.id);
        const hasCircular = hasCircularRef(
          item.id,
          parentByChild,
          idsInHierarchy
        );
        if (hasCircular) {
          warnForCircular(item);
        } else {
          parent.children.push(nodes.get(item.id)!);
        }
      }
    }
  }
  const results = [];
  for (const item of items) {
    if (item.parentId === null) {
      results.push(nodes.get(item.id)!);
    }
  }
  return results;
}

function warnForDuplicate(item: Item): void {
  console.warn(
    `Item with duplicate id (id: ${item.id}) detected, only the first item with this id will appear in result.`
  );
}

function warnForOrphan(item: Item): void {
  console.warn(
    `Item with id ${item.id} has a parentId (${item.parentId}) that does not exist in the input array. This item will be treated as a root item instead.`
  );
}

function warnForCircular(item: Item): void {
  console.warn(
    `Circular dependency detected. Item with id ${item.id} will be omitted from result.`
  );
}

const test1 = hierarchicalNest(input1);

console.log({ test1 });
console.log(test1[0]);
console.log(test1[0].children[0]);
console.log(test1[0].children[1]);
