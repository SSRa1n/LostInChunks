import { useMemo } from 'react';
import { MazeAction, MazeProblem, type MazeState } from '../problems/maze_problem';
import { DepthFirstSearch } from '../algorithms/dfs';
import { AStarSearch } from '../algorithms/astar';
import { MazeManhattanHeuristic } from '../heuristics/manhattan_heuristic';
import type { MazeData } from '../lib/generate_maze';

export type AlgorithmType = 'astar' | 'dfs';

export function useMazeSearch(
    mazeData: MazeData, 
    algorithmType: AlgorithmType = 'astar'
) {
    const searchResult = useMemo(() => {
        const problem = new MazeProblem(mazeData);
        
        if (algorithmType === 'dfs') {
            const dfs = new DepthFirstSearch<MazeState, MazeAction>();
            return dfs.search(problem);
        } else {
            const heuristic = new MazeManhattanHeuristic(problem.goalState());
            const astar = new AStarSearch<MazeState, MazeAction>(heuristic);
            return astar.search(problem);
        }
    }, [mazeData, algorithmType]);

    return searchResult;
}