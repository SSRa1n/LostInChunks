import { Block, BLOCKS } from "./blocks";

export type Maze = Block[][];

export function generateMaze(
    width: number,
    height: number
): Maze {

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

    // Add start and goal positions
    maze[height - 2][1] = BLOCKS.BLOCK_START;
    maze[1][width - 2] = BLOCKS.BLOCK_GOAL;

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

    const max_inf_path = 2
    let curr_inf_path = 0

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

    return maze;
}