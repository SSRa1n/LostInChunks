import { useMemo } from 'react';
import { MazeAction, MazeProblem, type MazeState } from '../problems/maze_problem';
import { DepthFirstSearch } from '../algorithms/dfs';
import { AStarSearch } from '../algorithms/astar';
import { MazeManhattanHeuristic } from '../heuristics/manhattan_heuristic';
import type { MazeData } from '../lib/generate_maze';
import { GreedyBestFirstSearch } from '../algorithms/gbfs';
import { UniformCostSearch } from '../algorithms/ucs';
import { IterativeDeepeningSearch } from '../algorithms/ids';
import { BreadthFirstSearch } from '../algorithms/bfs';

export type AlgorithmType = 'astar' | 'dfs' | 'weighted-astar-3' | 'weighted-astar-8' | 'gbfs' | 'ucs' | 'bfs' | 'ids';

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
        } else if (algorithmType === 'weighted-astar-8') {
            const heuristic = new MazeManhattanHeuristic(problem.goalState());
            const astar = new AStarSearch<MazeState, MazeAction>(heuristic, 8);
            return astar.search(problem);
        } else if (algorithmType === 'weighted-astar-3') {
            const heuristic = new MazeManhattanHeuristic(problem.goalState());
            const astar = new AStarSearch<MazeState, MazeAction>(heuristic, 3);
            return astar.search(problem);
        } else if (algorithmType === 'gbfs') {
            const heuristic = new MazeManhattanHeuristic(problem.goalState());
            const gbfs = new GreedyBestFirstSearch<MazeState, MazeAction>(heuristic);
            return gbfs.search(problem);
        } else if (algorithmType === 'ucs') {
            const ucs = new UniformCostSearch<MazeState, MazeAction>();
            return ucs.search(problem);
        } else if (algorithmType === 'ids') {
            const ids = new IterativeDeepeningSearch<MazeState, MazeAction>();
            return ids.search(problem);
        } else {
            const bfs = new BreadthFirstSearch<MazeState, MazeAction>();
            return bfs.search(problem);
        }
    }, [mazeData, algorithmType]);

    return searchResult;
}