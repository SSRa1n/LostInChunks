export type Maze = number[][];

export const VOID = 0;
export const PATH = 1;

export function generateMaze(
    width: number,
    height: number
): Maze {

    // force odd dimensions
    width = width % 2 === 0 ? width + 1 : width;
    height = height % 2 === 0 ? height + 1 : height;

    const maze: Maze = Array.from(
        { length: height },
        () => Array(width).fill(VOID)
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

        maze[y][x] = PATH;

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

            if (maze[ny][nx] === PATH)
                continue;

            // remove wall
            maze[y + dy / 2][x + dx / 2] = PATH;

            carve(nx, ny);
        }
    }

    carve(1, 1);

    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {

            if (maze[y][x] !== VOID)
                continue;

            const vertical =
                maze[y - 1][x] === PATH &&
                maze[y + 1][x] === PATH;

            const horizontal =
                maze[y][x - 1] === PATH &&
                maze[y][x + 1] === PATH;

            if ((vertical || horizontal) && Math.random() < 0.1) {
                maze[y][x] = PATH;
            }
        }
    }

    return maze;
}