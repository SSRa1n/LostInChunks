import { type JSX } from 'react'
import { useState } from "react";
import type { Maze } from './generate_maze'
import { calculateCost } from './calculate_cost'

type RenderMazeProps = {
    maze: Maze
}

export default function RenderMaze({ maze }: RenderMazeProps): JSX.Element {
    console.log(maze)

    const [showLabels, setShowLabels] = useState(false);

    const costMap = calculateCost(maze);

    return (
        <>
            <button onClick={() => setShowLabels(prev => !prev)} className="counter">
                {showLabels ? "Hide Labels" : "Show Labels"}
            </button>

            {maze.map((row, row_idx) => (
                <div className="maze-rows" key={row_idx}>
                    {row.map((block, col_idx) => (
                        <div
                            className="maze-cell"
                            key={`${row_idx}-${col_idx}`}
                        >
                            <img src={block.filename} className="maze-block" />
                            {showLabels && (
                                <span className="cost-label">
                                    {costMap[row_idx][col_idx].cost === Infinity ? "∞" : costMap[row_idx][col_idx].cost}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </>
    );
}