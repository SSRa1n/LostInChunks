import type { SearchSuccessor, SearchProblem } from "../core/search_problem";
import { MazeData, type MazePosition } from "../lib/generate_maze";

export type MazeState = MazePosition;

export const MazeAction = {
    Up: "Up",
    Right: "Right",
    Down: "Down",
    Left: "Left",
} as const;

export type MazeAction = typeof MazeAction[keyof typeof MazeAction];

const DIRECTIONS = [
    { dx: 1, dy: 0, action: MazeAction.Right },
    { dx: 0, dy: -1, action: MazeAction.Up },
    { dx: 0, dy: 1, action: MazeAction.Down },
    { dx: -1, dy: 0, action: MazeAction.Left },
];

export class MazeProblem implements SearchProblem<MazeState, MazeAction> {
    private readonly mazeData: MazeData;

    constructor(mazeData: MazeData) {
        this.mazeData = mazeData;
    }

    initialState(): MazeState {
        return this.mazeData.start;
    }

    goalState(): MazeState {
        return this.mazeData.goal;
    }

    isGoal(state: MazeState): boolean {
        return state.x === this.mazeData.goal.x && state.y === this.mazeData.goal.y;
    }

    getSuccessors(state: MazeState): SearchSuccessor<MazeState, MazeAction>[] {
        const successors: SearchSuccessor<MazeState, MazeAction>[] = [];

        for (const dir of DIRECTIONS) {
            const nx = state.x + dir.dx;
            const ny = state.y + dir.dy;

            if (ny < 0 || ny >= this.mazeData.height || nx < 0 || nx >= this.mazeData.width) {
                continue;
            }

            const block = this.mazeData.grid[ny][nx];

            if (block.cost_onroad < Infinity) {
                successors.push({
                    state: { x: nx, y: ny },
                    action: dir.action,
                });
            }
        }

        return successors;
    }

    stepCost(_from: MazeState, to: MazeState, _action: MazeAction): number {
        return this.mazeData.costMap[to.y][to.x].cost;
    }

    stateKey(state: MazeState): string {
        return `${state.x},${state.y}`;
    }
}