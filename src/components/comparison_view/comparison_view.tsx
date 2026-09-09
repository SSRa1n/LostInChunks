import { useEffect, useState } from 'react';
import { generateMaze } from '../../lib/generate_maze';
import { type AlgorithmType, useMazeSearch } from '../../lib/use_maze_search';
import { useAnimation } from '../../lib/use_animation';
import AnimationController from '../animation_controller/animation_controller';
import MazeView from '../maze_view/maze_view';
import type { MazeData } from '../../lib/generate_maze';
import MetricsCard from '../metrics_card/metrics_card';

import styles from './comparison_view.module.css';

type ComparisonViewProps = {
  mazeData?: MazeData;
};

export default function ComparisonView({ mazeData } : ComparisonViewProps) {
  const [masterMaze, setMasterMaze] = useState(mazeData ? mazeData : generateMaze(15, 11));
  const [mazeVersion, setMazeVersion] = useState(0);
  const [showLabels, setShowLabels] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);

  useEffect(() => {
    if (!mazeData) return;

    setMasterMaze(mazeData);
    setMazeVersion(prev => prev + 1);
  }, [mazeData]);

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

  const getAlgorithmName = (type: AlgorithmType) => {
    switch (type) {
      case 'astar': return 'A* Search';
      case 'dfs': return 'Depth-First Search (DFS)';
      default: return type;
    }
  };

  return (
    <div className={styles.container}>

      <main className={styles.maze_section}>

        <div className={styles.util_container}>
          {!mazeData && (
            <button
              type="button"
              onClick={regenerateMaze}
              className="counter"
            >
              Regenerate Maze
            </button>
          )}

          <button
            type="button"
            onClick={() => setShowLabels(prev => !prev)}
            className="counter"
          >
            {showLabels ? 'Hide Labels' : 'Show Labels'}
          </button>
        </div>

        <div 
          className={styles.comparison_container}
          // onClick={() => setShowMetrics(prev => !prev)}
          // style={{ cursor: 'pointer' }}
        >
          <MazeView
            mazeData={masterMaze}
            algorithmType={algorithm1}
            onAlgorithmChange={setAlgorithm1}
            searchResult={searchResult1}
            animationResult={animationResult}
            onlySeekBar={true}
            renderCost={showLabels}
          />

          <MazeView
            mazeData={masterMaze}
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

        <button
          type="button"
          className={`counter ${styles.metrics_button}`}
          onClick={() => setShowMetrics(prev => !prev)}
        >
          {showMetrics ? 'Hide Search Metrics' : 'Show Search Metrics'}
        </button>

        <div
          className={`${styles.metrics_overlay} ${
            showMetrics ? styles.metrics_overlay_visible : ''
          }`}
          onClick={() => setShowMetrics(false)}
          aria-hidden={!showMetrics}
        >
          <div
            className={`${styles.metrics_modal} ${
              showMetrics ? styles.metrics_modal_visible : ''
            }`}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="false"
            aria-label="Maze metrics"
          >
            <div className={styles.metrics_header}>
              <h2>Search Metrics</h2>

              <button
                type="button"
                className={styles.close_button}
                onClick={() => setShowMetrics(false)}
                aria-label="Close metrics"
              >
                ×
              </button>
            </div>

            <div className={styles.metrics_container}>
              <MetricsCard
                title={`${getAlgorithmName(algorithm1)} Metrics`}
                searchResult={searchResult1}
              />

              <MetricsCard
                title={`${getAlgorithmName(algorithm2)} Metrics`}
                searchResult={searchResult2}
              />
            </div>
          </div>
        </div>

      </main>

    </div>
  );
}