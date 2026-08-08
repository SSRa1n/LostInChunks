import { useState, useMemo } from 'react';
import { MazeProblem, type MazeState } from '../problems/maze_problem';
import { DepthFirstSearch } from '../algorithms/dfs';
import { AStarSearch } from '../algorithms/astar';
import { MazeManhattanHeuristic } from '../heuristics/manhattan_heuristic';
import type { Maze } from '../lib/generate_maze';

export type AlgorithmType = 'astar' | 'dfs';

export function useMazeSearch(
    initialMaze: Maze, 
    defaultAlgorithm: AlgorithmType = 'astar'
) {
    const [algorithmType, setAlgorithmType] = useState<AlgorithmType>(defaultAlgorithm);

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

    return {
        maze,
        algorithmType,
        setAlgorithmType,
        searchResult,
    };
}