import { useState } from 'react';
import { useMazeSearch, type AlgorithmType } from '../../lib/use_maze_search';
import type { Maze } from '../../lib/generate_maze';
import { useAnimation } from '../../lib/use_animation';
import MazeView from '../maze_view/maze_view';

import styles from './singular_view.module.css';

type SingularViewProps = {
    maze: Maze;
    defaultAlgorithm?: AlgorithmType;
    renderCost?: boolean;
};

export default function SingularView({ maze, defaultAlgorithm = 'astar', renderCost = false }: SingularViewProps) {
    const [algorithm, setAlgorithm] = useState<AlgorithmType>(defaultAlgorithm);

    const searchResult = useMazeSearch(maze, algorithm);

    const animationResult = useAnimation(searchResult.explored.length, 20);

    return (
        <div className={styles.container}>
            <MazeView
                maze={maze}
                algorithmType={algorithm}
                onAlgorithmChange={setAlgorithm}
                searchResult={searchResult}
                animationResult={animationResult}
                renderCost={renderCost}
            />
        </div>
    );
}