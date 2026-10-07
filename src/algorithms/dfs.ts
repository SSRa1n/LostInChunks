import type { SearchAlgorithm } from "../core/search_algorithm";
import type { SearchProblem } from "../core/search_problem";
import type { SearchResult } from "../core/search_result";
import type { SearchNode } from "../core/search_node";
import { StackFrontier } from "../frontiers/stack_frontier";

export class DepthFirstSearch<State, Action> implements SearchAlgorithm<State, Action> {
    search(problem: SearchProblem<State, Action>): SearchResult<State, Action> {
        const startTime = performance.now();

        const initialState = problem.initialState();
        const initialNode: SearchNode<State, Action> = {
            state: initialState,
            cost: 0,
            depth: 0,
        };

        const frontier = new StackFrontier<SearchNode<State, Action>>();
        frontier.add(initialNode);

        const exploredSet = new Set<string>();
        const exploredList: State[] = [];

        const frontierSet = new Set<string>();
        frontierSet.add(problem.stateKey(initialState));

        let nodesGenerated = 1;
        let nodesExpanded = 0;
        let maxFrontierSize = 1;

        while (!frontier.isEmpty()) {
            const currentNode = frontier.remove()!;
            const currentStateKey = problem.stateKey(currentNode.state);

            frontierSet.delete(currentStateKey);

            if (problem.isGoal(currentNode.state)) {
                const result = this.buildResult(
                    currentNode,
                    exploredList,
                    true,
                    nodesGenerated,
                    nodesExpanded,
                    maxFrontierSize
                );

                result.timeMs = performance.now() - startTime;
                return result;
            }

            if (!exploredSet.has(currentStateKey)) {
                exploredSet.add(currentStateKey);
                exploredList.push(currentNode.state);
                nodesExpanded++;

                // Expand successors
                const successors = problem.getSuccessors(currentNode.state);

                for (const successor of successors) {
                    const nextStateKey = problem.stateKey(successor.state);

                    if (
                        !exploredSet.has(nextStateKey) &&
                        !frontierSet.has(nextStateKey)
                    ) {
                        const stepCost = problem.stepCost(
                            currentNode.state,
                            successor.state,
                            successor.action
                        );

                        const childNode: SearchNode<State, Action> = {
                            state: successor.state,
                            parent: currentNode,
                            action: successor.action,
                            cost: currentNode.cost + stepCost,
                            depth: currentNode.depth + 1,
                        };

                        frontier.add(childNode);
                        frontierSet.add(nextStateKey);
                        nodesGenerated++;
                    }
                }

                maxFrontierSize = Math.max(
                    maxFrontierSize,
                    frontier.size()
                );
            }
        }

        // Return empty result if frontier is exhausted and no goal found
        return {
            found: false,
            path: [],
            actions: [],
            explored: exploredList,
            cost: 0,
            timeMs: performance.now() - startTime,
            nodesGenerated,
            nodesExpanded,
            maxFrontierSize,
        };
    }

    private buildResult(
        goalNode: SearchNode<State, Action>,
        explored: State[],
        found: boolean,
        nodesGenerated: number,
        nodesExpanded: number,
        maxFrontierSize: number
    ): SearchResult<State, Action> {
        const path: State[] = [];
        const actions: Action[] = [];
        let currentNode: SearchNode<State, Action> | undefined = goalNode;

        while (currentNode) {
            path.unshift(currentNode.state);
            if (currentNode.action !== undefined) {
                actions.unshift(currentNode.action);
            }
            currentNode = currentNode.parent;
        }

        return {
            found,
            path,
            actions,
            explored,
            cost: goalNode.cost,
            timeMs: 0,
            nodesGenerated,
            nodesExpanded,
            maxFrontierSize,
        };
    }
}
