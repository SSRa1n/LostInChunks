import type { SearchAlgorithm } from "../core/search_algorithm";
import type { SearchProblem } from "../core/search_problem";
import type { SearchResult } from "../core/search_result";
import type { SearchNode } from "../core/search_node";
import { StackFrontier } from "../frontiers/stack_frontier";

export class DepthFirstSearch<State, Action> implements SearchAlgorithm<State, Action> {
    search(problem: SearchProblem<State, Action>): SearchResult<State, Action> {
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

        while (!frontier.isEmpty()) {
            const currentNode = frontier.remove()!;
            const currentStateKey = problem.stateKey(currentNode.state);

            // If we reached the goal, reconstruct and return the path
            if (problem.isGoal(currentNode.state)) {
                return this.buildResult(currentNode, exploredList, true);
            }

            if (!exploredSet.has(currentStateKey)) {
                exploredSet.add(currentStateKey);
                exploredList.push(currentNode.state);

                // Expand successors
                const successors = problem.getSuccessors(currentNode.state);
                for (const successor of successors) {
                    const nextStateKey = problem.stateKey(successor.state);

                    // Only push if it hasn't been explored yet
                    if (!exploredSet.has(nextStateKey)) {
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
                    }
                }
            }
        }

        // Return empty result if frontier is exhausted and no goal found
        return {
            found: false,
            path: [],
            actions: [],
            explored: exploredList,
            cost: 0,
        };
    }

    private buildResult(
        goalNode: SearchNode<State, Action>,
        explored: State[],
        found: boolean
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
        };
    }
}