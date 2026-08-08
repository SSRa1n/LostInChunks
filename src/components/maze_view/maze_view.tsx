import { useMemo } from "react";
import type { AlgorithmType } from "../../lib/use_maze_search";
import type { AnimationResult } from "../../lib/use_animation";
import type { Maze } from '../../lib/generate_maze';
import RenderMaze from "../../lib/render_maze";
import AnimationController from '../animation_controller/animation_controller';
import AnimationStatus from '../animation_status/animation_status';
import AlgorithmSelector from '../algorithm_selector/algorithm_selector';
import type { SearchResult } from "../../core/search_result";
import type { MazeAction, MazeState } from "../../problems/maze_problem";

import styles from './maze_view.module.css'

type MazeViewProps = {
    maze: Maze;
    algorithmType: AlgorithmType;
    onAlgorithmChange: (alg: AlgorithmType) => void;
    searchResult: SearchResult<MazeState, MazeAction>;
    animationResult: AnimationResult;
    onlySeekBar?: boolean;
    renderCost?: boolean;
};

export default function MazeView({ 
    maze, 
    algorithmType, 
    onAlgorithmChange, 
    searchResult, 
    animationResult,
    onlySeekBar = false,
    renderCost = false 
}: MazeViewProps) {

    const animatedExplored = useMemo(() => {
        return searchResult.explored.slice(0, animationResult.animationIndex);
    }, [searchResult.explored, animationResult.animationIndex]);

    const displayedPath = useMemo(() => {
        if (animationResult.animationIndex < searchResult.explored.length) {
            return [];
        }
        return searchResult.path;
    }, [animationResult.animationIndex, searchResult.explored.length, searchResult.path]);

    return (
        <div className={styles.container}>
            <AlgorithmSelector
                algorithm={algorithmType}
                onChange={onAlgorithmChange}
            />

            <AnimationStatus
                found={searchResult.found}
                status={animationResult.status}
                animationIndex={animationResult.animationIndex}
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
                isPlaying={animationResult.isAnimating} 
                speedMs={animationResult.speedMs}
                animationIndex={animationResult.animationIndex}
                maxSteps={searchResult.explored.length}
                onlySeekBar={onlySeekBar}
                onPlayPause={animationResult.togglePlay}
                onSpeedChange={animationResult.changeSpeed}
                onSeek={animationResult.handleSeek}
            />
        </div>
    );
}