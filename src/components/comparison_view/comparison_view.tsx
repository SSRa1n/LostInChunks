import { useState } from 'react';
import { generateMaze } from '../../lib/generate_maze';
import { type AlgorithmType, useMazeSearch } from '../../lib/use_maze_search';
import { useAnimation } from '../../lib/use_animation';
import AnimationController from '../animation_controller/animation_controller';
import MazeView from '../maze_view/maze_view';

import styles from './comparison_view.module.css';

export default function ComparisonView() {
  const [masterMaze, setMasterMaze] = useState(generateMaze(15, 11));
  const [mazeVersion, setMazeVersion] = useState(0);
  const [showLabels, setShowLabels] = useState(false);

  const regenerateMaze = () => {
    setMasterMaze(generateMaze(15, 11));
    setMazeVersion(prev => prev + 1);
  };

  const [algorithm1, setAlgorithm1] = useState<AlgorithmType>('dfs');
  const [algorithm2, setAlgorithm2] = useState<AlgorithmType>('astar');

  const searchResult1 = useMazeSearch(masterMaze, algorithm1);
  const searchResult2 = useMazeSearch(masterMaze, algorithm2);

  const maxSteps = Math.max(
    searchResult1.explored.length, 
    searchResult2.explored.length
  );

  const resetKey = `${mazeVersion}-${algorithm1}-${algorithm2}`;
  const animationResult = useAnimation(maxSteps, 20, resetKey);

  return (
    <div className={styles.container}>
      
      <div className={styles.util_container}>
        <button type="button" onClick={() => regenerateMaze()} className="counter">
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
        <MazeView
          maze={masterMaze}
          algorithmType={algorithm1}
          onAlgorithmChange={setAlgorithm1}
          searchResult={searchResult1}
          animationResult={animationResult}
          onlySeekBar={true}
          renderCost={showLabels}
        />

        <MazeView
          maze={masterMaze}
          algorithmType={algorithm2}
          onAlgorithmChange={setAlgorithm2}
          searchResult={searchResult2}
          animationResult={animationResult}
          onlySeekBar={true}
          renderCost={showLabels}
        />
      </div>

      <AnimationController 
        className={styles.animation_controller}
        isPlaying={animationResult.isAnimating} 
        speedMs={animationResult.speedMs}
        animationIndex={animationResult.animationIndex}
        maxSteps={maxSteps}
        onPlayPause={animationResult.togglePlay}
        onSpeedChange={animationResult.changeSpeed}
        onSeek={animationResult.handleSeek}
      />
    </div>
  );
}