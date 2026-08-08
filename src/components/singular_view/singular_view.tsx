import { useMemo } from 'react';
import { useMazeSearch, type AlgorithmType } from '../../lib/use_maze_search';
import RenderMaze from '../../lib/render_maze';
import type { Maze } from '../../lib/generate_maze';
import AnimationController from '../animation_controller/animation_controller';
import AnimationStatus from '../animation_status/animation_status';
import AlgorithmSelector from '../algorithm_selector/algorithm_selector';
import { useAnimation } from '../../lib/use_animation';

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
    } = useMazeSearch(maze, defaultAlgorithm);

    const {
        animationIndex,
        isAnimating,
        status,
        speedMs,
        handleSeek,
        togglePlay,
        changeSpeed,
    } = useAnimation(searchResult.explored.length, 20);

    const animatedExplored = useMemo(() => {
        return searchResult.explored.slice(0, animationIndex);
    }, [searchResult.explored, animationIndex]);

    const displayedPath = useMemo(() => {
        if (animationIndex < searchResult.explored.length) {
            return [];
        }

        return searchResult.path;
    }, [animationIndex, searchResult.explored.length, searchResult.path]);

    return (
        <div className={styles.container}>
            <AlgorithmSelector
                algorithm={algorithmType}
                onChange={setAlgorithmType}
            />

            <AnimationStatus
                found={searchResult.found}
                status={status}
                animationIndex={animationIndex}
                maxSteps={searchResult.explored.length}
                pathLength={searchResult.path.length}
            />

            <RenderMaze 
                maze={maze} 
                explored={animatedExplored} 
                path={displayedPath} 
                renderCost={renderCost}
            />

            <AnimationController 
                isPlaying={isAnimating} 
                speedMs={speedMs}
                animationIndex={animationIndex}
                maxSteps={searchResult.explored.length}
                onPlayPause={togglePlay}
                onSpeedChange={changeSpeed}
                onSeek={handleSeek}
            />
        </div>
    );
}