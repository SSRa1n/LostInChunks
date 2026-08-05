import type { SearchAlgorithm } from "../core/search_algorithm";
import type { SearchProblem } from "../core/search_problem";
import type { SearchResult } from "../core/search_result";
import type { SearchNode } from "../core/search_node";
import type { Heuristic } from "../core/heuristic";
import { PriorityQueueFrontier } from "../frontiers/priority_queue_frontier";

export class AStarSearch<State, Action> implements SearchAlgorithm<State, Action> {
    private readonly heuristic: Heuristic<State>;

    constructor(heuristic: Heuristic<State>) {
        this.heuristic = heuristic;
    }

    search(problem: SearchProblem<State, Action>): SearchResult<State, Action> {
        const initialState = problem.initialState();
        const initialCost = 0;
        const initialH = this.heuristic.estimate(initialState);

        const initialNode: SearchNode<State, Action> = {
            state: initialState,
            cost: initialCost,
            depth: 0,
        };

        const frontier = new PriorityQueueFrontier<SearchNode<State, Action>>();
        frontier.add(initialNode, initialCost + initialH);

        // Keep track of the best g-score (cost) found for each state key
        const costSoFar = new Map<string, number>();
        costSoFar.set(problem.stateKey(initialState), initialCost);

        const exploredList: State[] = [];
        const exploredSet = new Set<string>();

        while (!frontier.isEmpty()) {
            const currentNode = frontier.remove()!;
            const currentStateKey = problem.stateKey(currentNode.state);

            if (problem.isGoal(currentNode.state)) {
                return this.buildResult(currentNode, exploredList, true);
            }

            if (!exploredSet.has(currentStateKey)) {
                exploredSet.add(currentStateKey);
                exploredList.push(currentNode.state);

                const successors = problem.getSuccessors(currentNode.state);
                for (const successor of successors) {
                    const nextStateKey = problem.stateKey(successor.state);

                    const stepCost = problem.stepCost(
                        currentNode.state,
                        successor.state,
                        successor.action
                    );
                    const newCost = currentNode.cost + stepCost;

                    // If we found a cheaper path to this state, or haven't visited it yet
                    if (!costSoFar.has(nextStateKey) || newCost < costSoFar.get(nextStateKey)!) {
                        costSoFar.set(nextStateKey, newCost);

                        const childNode: SearchNode<State, Action> = {
                            state: successor.state,
                            parent: currentNode,
                            action: successor.action,
                            cost: newCost,
                            depth: currentNode.depth + 1,
                        };

                        const h = this.heuristic.estimate(childNode.state);
                        const priority = newCost + h;

                        frontier.add(childNode, priority);
                    }
                }
            }
        }

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