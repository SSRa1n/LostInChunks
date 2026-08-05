import { type JSX } from 'react';
import type { Maze } from './generate_maze';
import type { MazeState } from '../problems/maze_problem';

type RenderMazeProps = {
    maze: Maze;
    explored?: MazeState[];
    path?: MazeState[];
};

export default function RenderMaze({ maze, explored = [], path = [] }: RenderMazeProps): JSX.Element {
    const exploredSet = new Set(explored.map(s => `${s.x},${s.y}`));
    const pathSet = new Set(path.map(s => `${s.x},${s.y}`));

    return (
        <>
            {maze.map((row, y) => (
                <div className="maze-rows" key={y}>
                    {row.map((tile, x) => {
                        const key = `${x},${y}`;
                        const isPath = pathSet.has(key);
                        const isExplored = exploredSet.has(key);

                        if (tile === 0) {
                            return <img key={key} src="/blocks/suspicious_sand_3.png" alt="Void" />;
                        }
                        if (tile === -1) {
                            return <img key={key} src="/blocks/beacon.png" alt="Start" />;
                        }
                        if (tile === -2) {
                            return <img key={key} src="/blocks/gold_block.png" alt="Goal" />;
                        }

                        if (isPath) {
                            return <img key={key} src="/blocks/diamond_block.png" alt="Solution Path" />;
                        }
                        if (isExplored) {
                            return <img key={key} src="/blocks/light_blue_concrete.png" alt="Explored" />;
                        }

                        return <img key={key} src="/blocks/lime_concrete.png" alt="Path" />;
                    })}
                </div>
            ))}
        </>
    );
}