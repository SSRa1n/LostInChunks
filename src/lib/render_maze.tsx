import { type JSX } from 'react';
import type { Maze } from './generate_maze';
import { BLOCKS } from './blocks';
import type { MazeState } from '../problems/maze_problem';

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
    const exploredSet = new Set(explored.map((s) => `${s.x},${s.y}`));
    const pathSet = new Set(path.map((s) => `${s.x},${s.y}`));

    return (
        <>
            {maze.map((row, y) => (
                <div className="maze-rows" key={y}>
                    {row.map((block, x) => {
                        const key = `${x},${y}`;
                        const isPath = pathSet.has(key);
                        const isExplored = exploredSet.has(key);

                        if (block === BLOCKS.BLOCK_VOID) {
                            return (
                                <img
                                    key={key}
                                    src={block.filename}
                                    className="maze-block"
                                    alt={block.name}
                                />
                            );
                        }

                        if (block === BLOCKS.BLOCK_START) {
                            return (
                                <img
                                    key={key}
                                    src={block.filename}
                                    className="maze-block"
                                    alt={block.name}
                                />
                            );
                        }

                        if (block === BLOCKS.BLOCK_GOAL) {
                            return (
                                <img
                                    key={key}
                                    src={block.filename}
                                    className="maze-block"
                                    alt={block.name}
                                />
                            );
                        }

                        if (isPath) {
                            return (
                                <img
                                    key={key}
                                    src="/blocks/diamond_block.png"
                                    className="maze-block"
                                    alt="Solution Path"
                                />
                            );
                        }

                        if (isExplored) {
                            return (
                                <img
                                    key={key}
                                    src="/blocks/light_blue_concrete.png"
                                    className="maze-block"
                                    alt="Explored"
                                />
                            );
                        }

                        return (
                            <img
                                key={key}
                                src={block.filename}
                                className="maze-block"
                                alt={block.name}
                            />
                        );
                    })}
                </div>
            ))}
        </>
    );
}