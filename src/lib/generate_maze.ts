import { Block, BLOCKS } from "./blocks";
import { calculateCost, type CostMap } from "./calculate_cost";

export type Maze = Block[][];

export interface MazePosition {
    x: number;
    y: number;
}

export class MazeData {
    readonly grid: Maze;
    readonly costMap: CostMap;
    readonly start: MazePosition;
    readonly goal: MazePosition;

    constructor(grid: Block[][], costMap: CostMap, start: MazePosition, goal: MazePosition) {
        this.grid = grid;
        this.costMap = costMap;
        this.start = start;
        this.goal = goal;
    }

    get width(): number {
        return this.grid[0]?.length ?? 0;
    }

    get height(): number {
        return this.grid.length;
    }
}

export function generateMaze(
    width: number,
    height: number,
): MazeData {
    // force odd dimensions
    width = width % 2 === 0 ? width + 1 : width;
    height = height % 2 === 0 ? height + 1 : height;

    const maze: Maze = Array.from(
        { length: height },
        () => Array(width).fill(BLOCKS.BLOCK_VOID)
    );

    function shuffle<T>(arr: T[]): T[] {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = (Math.random() * (i + 1)) | 0; // Advanced rounding technique
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    const directions = [
        [0, -2],
        [2, 0],
        [0, 2],
        [-2, 0]
    ];

    function carve(x: number, y: number) {

        maze[y][x] = BLOCKS.BLOCK_PATH;

        for (const [dx, dy] of shuffle([...directions])) {

            const nx = x + dx;
            const ny = y + dy;

            if (
                nx <= 0 ||
                ny <= 0 ||
                nx >= width - 1 ||
                ny >= height - 1
            ) {
                continue;
            }

            if (maze[ny][nx] === BLOCKS.BLOCK_PATH)
                continue;

            // remove wall
            maze[y + dy / 2][x + dx / 2] = BLOCKS.BLOCK_PATH;

            carve(nx, ny);
        }
    }

    carve(1, 1);

    // Add random alternative paths
    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {

            if (maze[y][x] !== BLOCKS.BLOCK_VOID)
                continue;

            const vertical =
                maze[y - 1][x] === BLOCKS.BLOCK_PATH &&
                maze[y + 1][x] === BLOCKS.BLOCK_PATH;

            const horizontal =
                maze[y][x - 1] === BLOCKS.BLOCK_PATH &&
                maze[y][x + 1] === BLOCKS.BLOCK_PATH;

            if ((vertical || horizontal) && Math.random() < 0.1) {
                maze[y][x] = BLOCKS.BLOCK_PATH;
            }
        }
    }

    // Define and place start and goal positions
    const start: MazePosition = { x: 1, y: height - 2 };
    const goal: MazePosition = { x: width - 2, y: 1 };

    maze[start.y][start.x] = BLOCKS.BLOCK_START;
    maze[goal.y][goal.x] = BLOCKS.BLOCK_GOAL;

    // Add random obstacles
    const walkable: [number, number][] = [];
    const void_tiles: [number, number][] = [];

    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            if (maze[y][x] === BLOCKS.BLOCK_PATH)
                walkable.push([x, y]);
            else if (maze[y][x] === BLOCKS.BLOCK_VOID)
                void_tiles.push([x, y]);
        }
    }

    const max_inf_path = 2;
    let curr_inf_path = 0;

    for (const block of Object.values(BLOCKS).filter(b => b.is_obstacle)) {

        for (const [x, y] of walkable) {

            if (Math.random() > block.path_spawn_chance)
                continue;
            if (block.cost_onroad === Infinity) {
                curr_inf_path++;
                if (curr_inf_path > max_inf_path) {
                    curr_inf_path--;
                    continue;
                }
            }
            maze[y][x] = block;
        }

        for (const [x, y] of void_tiles) {

            if (Math.random() > block.void_spawn_chance)
                continue;

            maze[y][x] = block;
        }
    }

    // Trim array to remove void tiles on the edges
    while (maze[0].every(tile => tile === BLOCKS.BLOCK_VOID)) {
        maze.shift();
        start.y--;
        goal.y--;
    }
    while (maze[maze.length - 1].every(tile => tile === BLOCKS.BLOCK_VOID)) {
        maze.pop();
    }

    const costMap = calculateCost(maze)

    return new MazeData(maze, costMap, start, goal);
}

export function enrichPreset(preset: Maze) {
    const maze: Maze = preset.map(row => [...row]);
    
    let start: MazePosition = { x: 0, y: 0 };
    let goal: MazePosition = { x: 0, y: 0 };
    let foundStart = false;
    let foundGoal = false;

    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[y].length; x++) {
            if (maze[y][x] === BLOCKS.BLOCK_START) {
                start = { x, y };
                foundStart = true;
            } else if (maze[y][x] === BLOCKS.BLOCK_GOAL) {
                goal = { x, y };
                foundGoal = true;
            }
        }
    }

    if (!foundStart || !foundGoal) {
        console.warn("Preset missing BLOCKS.BLOCK_START or BLOCKS.BLOCK_GOAL. Defaults applied.");
    }

    while (maze.length > 0 && maze[0].every(tile => tile === BLOCKS.BLOCK_VOID)) {
        maze.shift();
        start.y--;
        goal.y--;
    }
    while (maze.length > 0 && maze[maze.length - 1].every(tile => tile === BLOCKS.BLOCK_VOID)) {
        maze.pop();
    }

    const costMap = calculateCost(maze);
    return new MazeData(maze, costMap, start, goal);
}