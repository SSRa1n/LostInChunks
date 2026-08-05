import type { Heuristic } from "../core/heuristic";
import type { MazeState } from "../problems/maze_problem";

export class MazeManhattanHeuristic implements Heuristic<MazeState> {
    private readonly goalState: MazeState;

    constructor(goalState: MazeState) {
        this.goalState = goalState;
    }

    estimate(state: MazeState): number {
        return Math.abs(state.x - this.goalState.x) + Math.abs(state.y - this.goalState.y);
    }
}