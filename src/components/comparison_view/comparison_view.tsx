import { useState } from 'react';
import SingularView from '../singular_view/singular_view';
import { generateMaze } from '../../lib/generate_maze';

import styles from './comparison_view.module.css';

export default function ComparisonView() {
  const createMaze = () => {
    const m = generateMaze(15, 11);
    return m;
  };

  const [masterMaze, setMasterMaze] = useState(createMaze);
  const [showLabels, setShowLabels] = useState(false);

  return (
    <div className={styles.container}>
      
      <div className={styles.util_container}>
        <button type="button" onClick={() =>  setMasterMaze(createMaze())} className="counter">
          Regenerate Maze
        </button>
        <button
                onClick={() => setShowLabels((prev) => !prev)}
                className="counter"
            >
                {showLabels ? "Hide Labels" : "Show Labels"}
            </button>
      </div>

      <div className={styles.comparison_container}>
        <SingularView 
          maze={masterMaze} 
          defaultAlgorithm="dfs" 
          renderCost={showLabels}
        />

        <SingularView 
          maze={masterMaze} 
          defaultAlgorithm="astar" 
          renderCost={showLabels}
        />
      </div>
    </div>
  );
}