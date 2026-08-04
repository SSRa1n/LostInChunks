import { type JSX } from 'react'
import type { Maze } from './generate_maze'

type RenderMazeProps = {
    maze: Maze
}

export default function RenderMaze({ maze }: RenderMazeProps): JSX.Element {
    console.log(maze)
    // for (const row of maze) {
    //     console.log(row.map((tile) => (tile === 0 ? 'O' : '#')).join('  '))
    // }

    return <>{maze.map((row) => {
        return <div style={{ display: 'flex' }}>{row.map((tile) => tile === 0 ? <img src="/suspicious_sand_3.png" alt="Void"/> : <img src="/lime_concrete.png" alt="Path" />)}</div>
    })}</>

}