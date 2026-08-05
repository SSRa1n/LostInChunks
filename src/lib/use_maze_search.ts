import { useState, useMemo, useEffect } from 'react';
import { MazeProblem, type MazeState } from '../problems/maze_problem';
import { DepthFirstSearch } from '../algorithms/dfs';
import { AStarSearch } from '../algorithms/astar';
import { MazeManhattanHeuristic } from '../heuristics/manhattan_heuristic';
import type { Maze } from '../lib/generate_maze';

export type AlgorithmType = 'astar' | 'dfs';

export function useMazeSearch(
    initialMaze: Maze, 
    speedMs = 20, 
    defaultAlgorithm: AlgorithmType = 'astar'
) {
    const [algorithmType, setAlgorithmType] = useState<AlgorithmType>(defaultAlgorithm);
    const [animationIndex, setAnimationIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const maze = useMemo(() => {
        return structuredClone(initialMaze);
    }, [initialMaze]);

    const searchResult = useMemo(() => {
        const problem = new MazeProblem(maze);
        
        if (algorithmType === 'dfs') {
            const dfs = new DepthFirstSearch<MazeState, string>();
            return dfs.search(problem);
        } else {
            const heuristic = new MazeManhattanHeuristic(problem['goalState']);
            const astar = new AStarSearch<MazeState, string>(heuristic);
            return astar.search(problem);
        }
    }, [maze, algorithmType]);

    useEffect(() => {
        setAnimationIndex(0);
        if (!searchResult.found) return;

        setIsAnimating(true);
        const interval = setInterval(() => {
            setAnimationIndex((prev) => {
                if (prev < searchResult.explored.length) {
                    return prev + 1;
                }
                clearInterval(interval);
                setIsAnimating(false);
                return prev;
            });
        }, speedMs);

        return () => clearInterval(interval);
    }, [searchResult, speedMs]);

    return {
        maze,
        algorithmType,
        setAlgorithmType,
        searchResult,
        animationIndex,
        isAnimating,
        animatedExplored: searchResult.explored.slice(0, animationIndex),
        displayedPath: isAnimating ? [] : searchResult.path,
    };
}