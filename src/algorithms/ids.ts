import type { SearchAlgorithm } from "../core/search_algorithm";
import type { SearchProblem } from "../core/search_problem";
import type { SearchResult } from "../core/search_result";
import type { SearchNode } from "../core/search_node";
import { StackFrontier } from "../frontiers/stack_frontier";

export class IterativeDeepeningSearch<State, Action> implements SearchAlgorithm<State, Action> {
    search(problem: SearchProblem<State, Action>): SearchResult<State, Action> {
        const startTime = performance.now();

        let totalNodesGenerated = 0;
        let totalNodesExpanded = 0;
        let maxFrontierSizeOverall = 0;
        const allExploredSet = new Set<string>();
        const allExploredList: State[] = [];

        // Increment depth limit iteratively
        for (let depthLimit = 0; ; depthLimit++) {
            const dlsResult = this.depthLimitedSearch(problem, depthLimit);

            totalNodesGenerated += dlsResult.nodesGenerated;
            totalNodesExpanded += dlsResult.nodesExpanded;
            maxFrontierSizeOverall = Math.max(maxFrontierSizeOverall, dlsResult.maxFrontierSize);

            // Accumulate explored states uniquely across iterations
            for (const state of dlsResult.explored) {
                const key = problem.stateKey(state);
                if (!allExploredSet.has(key)) {
                    allExploredSet.add(key);
                    allExploredList.push(state);
                }
            }

            if (dlsResult.found) {
                dlsResult.explored = allExploredList;
                dlsResult.nodesGenerated = totalNodesGenerated;
                dlsResult.nodesExpanded = totalNodesExpanded;
                dlsResult.maxFrontierSize = maxFrontierSizeOverall;
                dlsResult.timeMs = performance.now() - startTime;
                return dlsResult;
            }

            // No cutoff means the reachable state space was fully searched.
            if (!dlsResult.cutoffOccurred) {
                break;
            }
        }

        return {
            found: false,
            path: [],
            actions: [],
            explored: allExploredList,
            cost: 0,
            timeMs: performance.now() - startTime,
            nodesGenerated: totalNodesGenerated,
            nodesExpanded: totalNodesExpanded,
            maxFrontierSize: maxFrontierSizeOverall,
        };
    }

    private depthLimitedSearch(
        problem: SearchProblem<State, Action>,
        limit: number
    ): SearchResult<State, Action> & { cutoffOccurred: boolean } {
        const initialState = problem.initialState();
        const initialNode: SearchNode<State, Action> = {
            state: initialState,
            cost: 0,
            depth: 0,
        };

        if (problem.isGoal(initialState)) {
            const result = this.buildResult(initialNode, [initialState], true, 1, 0, 1);
            return { ...result, cutoffOccurred: false };
        }

        const frontier = new StackFrontier<SearchNode<State, Action>>();
        frontier.add(initialNode);

        const exploredDepth = new Map<string, number>();
        const exploredSet = new Set<string>();
        const exploredList: State[] = [];

        let nodesGenerated = 1;
        let nodesExpanded = 0;
        let maxFrontierSize = 1;
        let cutoffOccurred = false;

        while (!frontier.isEmpty()) {
            const currentNode = frontier.remove()!;
            const currentStateKey = problem.stateKey(currentNode.state);

            const previousDepth = exploredDepth.get(currentStateKey);
            if (previousDepth === undefined || currentNode.depth < previousDepth) {
                
                if (problem.isGoal(currentNode.state)) {
                    exploredDepth.set(currentStateKey, currentNode.depth);
                    if (!exploredSet.has(currentStateKey)) {
                        exploredSet.add(currentStateKey);
                        exploredList.push(currentNode.state);
                    }
                    return {
                        ...this.buildResult(currentNode, exploredList, true, nodesGenerated, nodesExpanded, maxFrontierSize),
                        cutoffOccurred: false,
                    };
                }

                exploredDepth.set(currentStateKey, currentNode.depth);
                if (!exploredSet.has(currentStateKey)) {
                    exploredSet.add(currentStateKey);
                    exploredList.push(currentNode.state);
                }
                nodesExpanded++;

                // Expand successors only if we haven't hit the depth limit
                if (currentNode.depth < limit) {
                    const successors = problem.getSuccessors(currentNode.state);
                    for (const successor of successors) {
                        const nextDepth = currentNode.depth + 1;
                        const nextStateKey = problem.stateKey(successor.state);
                        const previousSuccessorDepth = exploredDepth.get(nextStateKey);
                        if (previousSuccessorDepth !== undefined && previousSuccessorDepth <= nextDepth) {
                            continue;
                        }

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
                            depth: nextDepth,
                        };

                        frontier.add(childNode);
                        nodesGenerated++;
                    }
                } else {
                    cutoffOccurred = true;
                }

                maxFrontierSize = Math.max(maxFrontierSize, frontier.size());
            }
        }

        return {
            found: false,
            path: [],
            actions: [],
            explored: exploredList,
            cost: 0,
            timeMs: 0,
            nodesGenerated,
            nodesExpanded,
            maxFrontierSize,
            cutoffOccurred,
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