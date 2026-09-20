import { type JSX } from "react";
import type { MazeData } from "../../lib/generate_maze";
import { BLOCKS } from "../../lib/blocks";
import type { MazeState } from "../../problems/maze_problem";
import styles from "./render_maze.module.css"

type RenderMazeProps = {
    mazeData: MazeData;
    explored?: MazeState[];
    path?: MazeState[];
    renderCost?: boolean;
    mazeWidth?: string;
    mazeHeight?: string;
};

export default function RenderMaze({
    mazeData,
    explored = [],
    path = [],
    renderCost = false,
    mazeWidth,
    mazeHeight,
}: RenderMazeProps): JSX.Element {
    const exploredSet = new Set(explored.map((s) => `${s.x},${s.y}`));
    const pathSet = new Set(path.map((s) => `${s.x},${s.y}`));

    const { grid: maze, costMap } = mazeData;
    
    const numRows = maze.length;
    const numCols = maze[0]?.length || 1;

    return (
        <div 
            className={styles.maze_wrapper}
            style={
                {
                    ...(mazeWidth && { "--maze-width": mazeWidth }),
                    ...(mazeHeight && { "--maze-height": mazeHeight }),
                    "--maze-rows": numRows,
                    "--maze-cols": numCols,
                } as React.CSSProperties
            }
        >
            {maze.map((row, y) => (
                <div className={styles.maze_rows} key={y}>
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
                                image = "./blocks/lime_concrete.png";
                                alt = "Solution Path";
                            } else if (exploredSet.has(key)) {
                                image = "./blocks/light_blue_concrete.png";
                                alt = "Explored";
                            }
                        }

                        return (
                            <div className={styles.maze_cell} key={key}>
                                <img
                                    src={image}
                                    className={styles.maze_block}
                                    alt={alt}
                                />

                                {renderCost && (
                                    <span className={styles.cost_label}>
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
        </div>
    );
}