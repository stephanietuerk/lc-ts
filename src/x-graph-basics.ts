function storeAsGraph(
  items: (string | undefined)[][],
  direction: "dependOnNode" | "nodeDependsOn"
): Map<string, string[]> {
  const graph = new Map<string, string[]>();
  for (const [dependent, node] of items) {
    if (node && !graph.has(node)) {
      graph.set(node, []);
    }
    if (dependent && !graph.has(dependent)) {
      graph.set(dependent, []);
    }
    if (node && dependent) {
      if (direction === "dependOnNode") {
        graph.get(node)!.push(dependent);
      } else {
        graph.get(dependent)!.push(node);
      }
    }
  }
  return graph;
}

let outerFnCalls = -1;
let innerLoopCalls = 0;

function hasCycleWithLogging(graph: Map<string, string[]>): boolean {
  const validNodes = new Set<string>();
  for (const [node, deps] of graph) {
    const visited = new Set<string>();
    visited.add(node);
    outerFnCalls++;
    innerLoopCalls = -1;
    if (nodeHasCycleWithLogging(node, deps, visited, graph, validNodes)) {
      return true;
    } else {
      validNodes.add(node);
    }
  }
  return false;
}

function nodeHasCycleWithLogging(
  node: string,
  deps: string[],
  alreadyVisited: Set<string>,
  graph: Map<string, string[]>,
  validNodes: Set<string>
): boolean {
  logOnEnterFn(node, deps, alreadyVisited);
  for (const dep of deps) {
    if (!validNodes.has(dep)) {
      const visited = new Set(alreadyVisited);
      logOnEnterDepsLoop(node, dep, deps, visited);
      if (visited.has(dep)) {
        logOnCycleDetected(node, dep, visited);
        return true;
      }
      visited.add(dep);
      if (graph.has(dep) && graph.get(dep)!.length > 0) {
        logIfDepHasDeps(node, dep, graph, visited);
        if (
          nodeHasCycleWithLogging(
            dep,
            graph.get(dep)!,
            visited,
            graph,
            validNodes
          )
        ) {
          logIfNodeHasCycleReturnedTrue(node);
          return true;
        } else {
          console.log(`adding ${dep} to valid Nodes cache`);
          validNodes.add(dep);
        }
      } else {
        logIfDepHasNoDeps(node, dep, visited);
        console.log(`adding ${dep} to valid Nodes cache`);
        validNodes.add(dep);
      }
    } else {
      console.log(`${dep} is in valid nodes cache, no need to parse`);
    }
  }
  logOnEnd(node, alreadyVisited);
  return false;
}

function logOnEnterFn(node: string, deps: string[], visited: Set<string>) {
  console.log("---enter fn---");
  console.log(
    `${outerFnCalls}. Node ${node}, deps: ${deps}, visited: ${[...visited.values()]}`
  );
}

function logOnEnterDepsLoop(
  node: string,
  dep: string,
  deps: string[],
  visited: Set<string>
) {
  innerLoopCalls++;
  console.log("-enter deps loop-");
  console.log(
    `${outerFnCalls}-${innerLoopCalls}. Node ${node}, dep: ${dep}, deps: ${deps}, visited: ${[...visited.values()]}`
  );
}

function logOnCycleDetected(node: string, dep: string, visited: Set<string>) {
  console.log("Dep is in visited array, returning true");
  console.log(
    `${outerFnCalls}-${innerLoopCalls}. Node ${node}, dep: ${dep}, visited: ${[...visited.values()]}`
  );
}

function logIfDepHasDeps(
  node: string,
  dep: string,
  graph: Map<string, string[]>,
  visited: Set<string>
) {
  console.log("Graph has dep at root");
  console.log(
    `Calling method with: Node ${node}, dep: ${dep}, graphValueForDep: ${graph.get(dep)}, visited: ${[...visited.values()]}`
  );
}

function logIfDepHasNoDeps(node: string, dep: string, visited: Set<string>) {
  console.log("End of dep chain");
  console.log(
    `No further deps for node ${node}, dep ${dep}, visited: ${[...visited.values()]}`
  );
}

function logIfNodeHasCycleReturnedTrue(node: string) {
  console.log("Node has cycle returned true");
  console.log(`${outerFnCalls}-${innerLoopCalls}. Node ${node}`);
}

function logOnEnd(node: string, visited: Set<string>) {
  console.log("-exit deps loop-");
  console.log(
    `${outerFnCalls}. is returning false for Node ${node}, visited ${[...visited.values()]}`
  );
}

function hasCycle(graph: Map<string, string[]>): boolean {
  const validNodes = new Set<string>();
  for (const [node, deps] of graph) {
    const visited = new Set<string>();
    visited.add(node);
    if (nodeHasCycle(deps, visited, graph, validNodes)) {
      return true;
    } else {
      validNodes.add(node);
    }
  }
  return false;
}

function nodeHasCycle(
  deps: string[],
  alreadyVisited: Set<string>,
  graph: Map<string, string[]>,
  validNodes: Set<string>
): boolean {
  for (const dep of deps) {
    if (!validNodes.has(dep)) {
      const visited = new Set(alreadyVisited);
      if (visited.has(dep)) {
        return true;
      }
      visited.add(dep);
      if (graph.has(dep) && graph.get(dep)!.length > 0) {
        if (nodeHasCycle(graph.get(dep)!, visited, graph, validNodes)) {
          return true;
        } else {
          validNodes.add(dep);
        }
      } else {
        validNodes.add(dep);
      }
    }
  }
  return false;
}

const dependencies = [
  [undefined, "A"],
  [undefined, "G"],
  ["H", "B"],
  ["A", "B"], // A depends on B
  ["A", "C"], // A depends on C
  ["B", "D"], // B depends on D
  ["C", "D"], // C depends on D
  ["D", "E"], // D depends on E
  ["B", "F"],
];

const cyclicDeps = [
  ["A", "B"],
  ["B", "C"],
  ["C", "A"], // cycle: A → B → C → A
];

const shouldBeCyclic = [
  ["A", "B"],
  ["B", "C"],
  ["C", "D"],
  ["D", "B"], // cycle: B → C → D → B
];

const simpleTopoSortExample = [
  ["A", "B"], // A depends on B
  ["A", "C"], // A depends on C
  ["B", "D"], // B depends on D
  ["C", "D"], // C depends on D
];

const graph = storeAsGraph(simpleTopoSortExample, "nodeDependsOn");
const test2 = topologicalSort(graph);
console.log({ graph }, test2);

function topologicalSort(graph: Map<string, string[]>): string[] {
  const graphCopy = new Map(
    Array.from(graph, ([key, value]) => [key, [...value]])
  );
  const processedNodes = processNodesWithNoDependencies(
    graphCopy,
    [],
    new Set()
  );
  console.log(processedNodes);
  return processedNodes;
}

function processNodesWithNoDependencies(
  graph: Map<string, string[]>,
  processedNodes: string[],
  lastProcessedNodes: Set<string>
): string[] {
  const newlyProcessedNodes = new Set<string>();
  for (const [node, deps] of graph) {
    if (deps.length > 0) {
      if (lastProcessedNodes.size > 0) {
        graph.set(
          node,
          deps.filter((x) => !lastProcessedNodes.has(x))
        );
      }
    } else {
      newlyProcessedNodes.add(node);
      graph.delete(node);
    }
  }
  for (const node of newlyProcessedNodes) {
    processedNodes.push(node);
  }
  if (graph.size !== 0) {
    processNodesWithNoDependencies(graph, processedNodes, newlyProcessedNodes);
  }
  return processedNodes;
}
