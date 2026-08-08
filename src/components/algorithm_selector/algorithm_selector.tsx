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
                <option value="astar">A* Search</option>
                <option value="dfs">Depth-First Search (DFS)</option>
            </select>
        </div>
    )
}
