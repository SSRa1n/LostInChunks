import { useMemo } from 'react';
import { MazeAction, MazeProblem, type MazeState } from '../problems/maze_problem';
import { DepthFirstSearch } from '../algorithms/dfs';
import { AStarSearch } from '../algorithms/astar';
import { MazeManhattanHeuristic } from '../heuristics/manhattan_heuristic';
import type { Maze } from '../lib/generate_maze';

export type AlgorithmType = 'astar' | 'dfs';

export function useMazeSearch(
    initialMaze: Maze, 
    algorithmType: AlgorithmType = 'astar'
) {
    const maze = useMemo(() => {
        return structuredClone(initialMaze);
    }, [initialMaze]);

    const searchResult = useMemo(() => {
        const problem = new MazeProblem(maze);
        
        if (algorithmType === 'dfs') {
            const dfs = new DepthFirstSearch<MazeState, MazeAction>();
            return dfs.search(problem);
        } else {
            const heuristic = new MazeManhattanHeuristic(problem['goalState']);
            const astar = new AStarSearch<MazeState, MazeAction>(heuristic);
            return astar.search(problem);
        }
    }, [maze, algorithmType]);

    return searchResult;
}