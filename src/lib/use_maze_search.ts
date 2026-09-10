import { useMemo } from 'react';
import { MazeAction, MazeProblem, type MazeState } from '../problems/maze_problem';
import { DepthFirstSearch } from '../algorithms/dfs';
import { AStarSearch } from '../algorithms/astar';
import { MazeManhattanHeuristic } from '../heuristics/manhattan_heuristic';
import type { MazeData } from '../lib/generate_maze';
import { GreedyBestFirstSearch } from '../algorithms/gbfs';
import { UniformCostSearch } from '../algorithms/ucs';

export type AlgorithmType = 'astar' | 'dfs' | 'weighted-astar' | 'gbfs' | 'ucs';

export function useMazeSearch(
    mazeData: MazeData, 
    algorithmType: AlgorithmType = 'astar'
) {
    const searchResult = useMemo(() => {
        const problem = new MazeProblem(mazeData);
        
        if (algorithmType === 'dfs') {
            const dfs = new DepthFirstSearch<MazeState, MazeAction>();
            return dfs.search(problem);
        } else if (algorithmType === 'astar') {
            const heuristic = new MazeManhattanHeuristic(problem.goalState());
            const astar = new AStarSearch<MazeState, MazeAction>(heuristic);
            return astar.search(problem);
        } else if (algorithmType === 'weighted-astar') {
            const heuristic = new MazeManhattanHeuristic(problem.goalState());
            const astar = new AStarSearch<MazeState, MazeAction>(heuristic, 8);
            return astar.search(problem);
        } else if (algorithmType === 'gbfs') {
            const heuristic = new MazeManhattanHeuristic(problem.goalState());
            const gbfs = new GreedyBestFirstSearch<MazeState, MazeAction>(heuristic);
            return gbfs.search(problem);
        } else {
            const ucs = new UniformCostSearch<MazeState, MazeAction>();
            return ucs.search(problem);
        }
    }, [mazeData, algorithmType]);

    return searchResult;
}