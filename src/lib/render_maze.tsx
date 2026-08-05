import { type JSX } from 'react'
import type { Maze } from './generate_maze'

type RenderMazeProps = {
    maze: Maze
}

export default function RenderMaze({ maze }: RenderMazeProps): JSX.Element {
    console.log(maze)

    return <>{maze.map((row) => {
        return <div className="maze-rows">
                    {row.map((block) => {
                        return <img src={block.filename} className="maze-block" />
                    })}
                </div>
    })}</>

}