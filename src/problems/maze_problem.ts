import type { SearchProblem } from "../core/search_problem";
import { PATH, VOID, type Maze } from "../lib/generate_maze";

export interface MazeState {
    readonly x: number;
    readonly y: number;
}

export const MazeAction = {
    Up: "Up",
    Right: "Right",
    Down: "Down",
    Left: "Left",
} as const;

export type MazeAction = typeof MazeAction[keyof typeof MazeAction];

export interface SearchSuccessor<State, Action> {
    state: State;
    action: Action;
}

const DIRECTIONS = [
    { dx: 1, dy: 0, action: MazeAction.Right },
    { dx: 0, dy: -1, action: MazeAction.Up },
    { dx: 0, dy: 1, action: MazeAction.Down },
    { dx: -1, dy: 0, action: MazeAction.Left },
];

export class MazeProblem implements SearchProblem<MazeState, MazeAction> {
    private readonly maze: Maze;
    private readonly startState: MazeState;
    private readonly goalState: MazeState;

    constructor(maze: Maze) {
        this.maze = maze;
        let start: MazeState = { x: 1, y: 1 };
        let goal: MazeState = { x: maze[0].length - 2, y: maze.length - 2 };

        for (let y = 0; y < maze.length; y++) {
            for (let x = 0; x < maze[y].length; x++) {
                if (maze[y][x] === -1) start = { x, y };
                if (maze[y][x] === -2) goal = { x, y };
            }
        }

        this.startState = start;
        this.goalState = goal;
    }

    initialState(): MazeState {
        return this.startState;
    }

    isGoal(state: MazeState): boolean {
        return state.x === this.goalState.x && state.y === this.goalState.y;
    }

    getSuccessors(state: MazeState): SearchSuccessor<MazeState, MazeAction>[] {
        const successors: SearchSuccessor<MazeState, MazeAction>[] = [];

        for (const dir of DIRECTIONS) {
            const nx = state.x + dir.dx;
            const ny = state.y + dir.dy;

            if (ny < 0 || ny >= this.maze.length || nx < 0 || nx >= this.maze[0].length) {
                continue;
            }

            const cell = this.maze[ny][nx];

            if (cell !== VOID) {
                successors.push({
                    state: { x: nx, y: ny },
                    action: dir.action,
                });
            }
        }

        return successors;
    }

    stepCost(from: MazeState, to: MazeState, action: MazeAction): number {
        return 1;
    }

    stateKey(state: MazeState): string {
        return `${state.x},${state.y}`;
    }
}