import { type JSX, useState } from "react";
import type { Maze } from "./generate_maze";
import { BLOCKS } from "./blocks";
import type { MazeState } from "../problems/maze_problem";
import { calculateCost } from "./calculate_cost";

type RenderMazeProps = {
    maze: Maze;
    explored?: MazeState[];
    path?: MazeState[];
};

export default function RenderMaze({
    maze,
    explored = [],
    path = [],
}: RenderMazeProps): JSX.Element {
    const [showLabels, setShowLabels] = useState(false);

    const exploredSet = new Set(explored.map((s) => `${s.x},${s.y}`));
    const pathSet = new Set(path.map((s) => `${s.x},${s.y}`));

    const costMap = calculateCost(maze);

    return (
        <>
            <button
                onClick={() => setShowLabels((prev) => !prev)}
                className="counter"
            >
                {showLabels ? "Hide Labels" : "Show Labels"}
            </button>

            {maze.map((row, y) => (
                <div className="maze-rows" key={y}>
                    {row.map((block, x) => {
                        const key = `${x},${y}`;

                        let image = block.filename;
                        let alt = block.name;

                        if (
                            block !== BLOCKS.BLOCK_VOID &&
                            block !== BLOCKS.BLOCK_START &&
                            block !== BLOCKS.BLOCK_GOAL
                        ) {
                            if (pathSet.has(key)) {
                                image = "/blocks/diamond_block.png";
                                alt = "Solution Path";
                            } else if (exploredSet.has(key)) {
                                image = "/blocks/light_blue_concrete.png";
                                alt = "Explored";
                            }
                        }

                        return (
                            <div className="maze-cell" key={key}>
                                <img
                                    src={image}
                                    className="maze-block"
                                    alt={alt}
                                />

                                {showLabels && (
                                    <span className="cost-label">
                                        {costMap[y][x].cost === Infinity
                                            ? "∞"
                                            : costMap[y][x].cost}
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>
            ))}
        </>
    );
}