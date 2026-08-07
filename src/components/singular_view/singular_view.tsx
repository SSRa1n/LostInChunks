import { useMazeSearch, type AlgorithmType } from '../../lib/use_maze_search';
import RenderMaze from '../../lib/render_maze';
import type { Maze } from '../../lib/generate_maze';

import styles from './singular_view.module.css';

type SingularViewProps = {
    maze: Maze;
    defaultAlgorithm?: AlgorithmType;
    renderCost?: boolean;
};

export default function SingularView({ maze, defaultAlgorithm = 'astar', renderCost = false }: SingularViewProps) {
    const {
        algorithmType,
        setAlgorithmType,
        searchResult,
        animationIndex,
        isAnimating,
        animatedExplored,
        displayedPath,
    } = useMazeSearch(maze, 20, defaultAlgorithm);

    return (
        <div className={styles.container}>
            
            <div className={styles.util_container}>
                Algorithm: 
                <select 
                    value={algorithmType} 
                    onChange={(e) => setAlgorithmType(e.target.value as AlgorithmType)}
                >
                    <option value="astar">A* Search</option>
                    <option value="dfs">Depth-First Search (DFS)</option>
                </select>
            </div>

            <div className={styles.status_container}>
                <span>{searchResult.found ? (isAnimating ? 'Exploring...' : 'Found!') : 'No Path'}</span> | 
                <span> Explored: {animationIndex}</span> | 
                <span> Path: {searchResult.path.length}</span>
            </div>

            <section className="maze-container">
                <RenderMaze 
                    maze={maze} 
                    explored={animatedExplored} 
                    path={displayedPath} 
                    renderCost={renderCost}
                />
            </section>
        </div>
    );
}