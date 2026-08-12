import { useState } from 'react';
import { useMazeSearch, type AlgorithmType } from '../../lib/use_maze_search';
import type { MazeData } from '../../lib/generate_maze';
import { useAnimation } from '../../lib/use_animation';
import MazeView from '../maze_view/maze_view';

import styles from './singular_view.module.css';

type SingularViewProps = {
    mazeData: MazeData;
    defaultAlgorithm?: AlgorithmType;
    renderCost?: boolean;
};

export default function SingularView({ mazeData, defaultAlgorithm = 'astar', renderCost = false }: SingularViewProps) {
    const [algorithm, setAlgorithm] = useState<AlgorithmType>(defaultAlgorithm);

    const searchResult = useMazeSearch(mazeData, algorithm);

    const animationResult = useAnimation(searchResult.explored.length, 20);

    return (
        <div className={styles.container}>
            <MazeView
                mazeData={mazeData}
                algorithmType={algorithm}
                onAlgorithmChange={setAlgorithm}
                searchResult={searchResult}
                animationResult={animationResult}
                renderCost={renderCost}
            />
        </div>
    );
}