import { type JSX } from 'react'
import type { Maze } from './generate_maze'

type RenderMazeProps = {
    maze: Maze
}

export default function RenderMaze({ maze }: RenderMazeProps): JSX.Element {
    console.log(maze)

    return <>{maze.map((row) => {
        return <div className="maze-rows">
                    {row.map((tile) => tile === 0 ? 
                    <img src="/blocks/suspicious_sand_3.png" alt="Void"/> : 
                    tile === -1 ? <img src="/blocks/beacon.png" alt="Start" /> : 
                    tile === -2 ? <img src="/blocks/gold_block.png" alt="Goal" /> : 
                    <img src="/blocks/lime_concrete.png" alt="Path" />)}
                </div>
    })}</>

}