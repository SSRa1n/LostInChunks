import type { Maze } from './generate_maze'

export function generateObstacles(maze: Maze): Maze {
    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[y].length; x++) {
            if (maze[y][x] === 1) {
                const randomNum = Math.random()
            }
        }
    }
    return maze
}