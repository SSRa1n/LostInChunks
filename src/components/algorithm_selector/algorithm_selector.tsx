import type { AlgorithmType } from "../../lib/use_maze_search";

import styles from "./algorithm_selector.module.css"

type AlgorithmSelectorProps = {
    algorithm: AlgorithmType;
    onChange: (algorithm: AlgorithmType) => void;
};

export default function AlgorithmSelector({algorithm, onChange}: AlgorithmSelectorProps) {
    return (
        <div className={styles.container}>
            Algorithm: 
            <select 
                value={algorithm} 
                onChange={(e) => onChange(e.target.value as AlgorithmType)}
            >
                <option value="bfs">Breadth-First Search (BFS)</option>
                <option value="dfs">Depth-First Search (DFS)</option>
                <option value="ids">Iterative Deepening Search (IDS)</option>
                <option value="ucs">Uniform Cost Search (UCS)</option>
                <option value="astar">A* Search</option>
                <option value="weighted-astar-3">Weighted A* Search (3x)</option>
                <option value="weighted-astar-8">Weighted A* Search (8x)</option>
                <option value="gbfs">Greedy Best-First Search</option>
            </select>
        </div>
    )
}
