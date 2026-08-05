import { useState, useMemo, useEffect } from 'react'
import './App.css'

import { generateMaze } from './lib/generate_maze'
import RenderMaze from './lib/render_maze'
import { generateObstacles } from './lib/generate_obstacles'
import { MazeProblem, type MazeState } from './problems/maze_problem'
import { DepthFirstSearch } from './algorithms/dfs'
import { AStarSearch } from './algorithms/astar'
import { MazeManhattanHeuristic } from './heuristics/manhattan_heuristic'

function App() {
  const [seed, setSeed] = useState(0)
  const [algorithmType, setAlgorithmType] = useState<'dfs' | 'astar'>('astar')

  const maze = useMemo(() => {
    const m = generateMaze(15, 11)
    generateObstacles(m)
    return m
  }, [seed])

  const searchResult = useMemo(() => {
    const problem = new MazeProblem(maze)
    
    if (algorithmType === 'dfs') {
      const dfs = new DepthFirstSearch<MazeState, string>()
      return dfs.search(problem)
    } else {
      const heuristic = new MazeManhattanHeuristic(problem['goalState'])
      const astar = new AStarSearch<MazeState, string>(heuristic)
      return astar.search(problem)
    }
  }, [maze, algorithmType])

  const [animationIndex, setAnimationIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

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
    }, 20);

    return () => clearInterval(interval);
  }, [searchResult]);

  const animatedExplored = searchResult.explored.slice(0, animationIndex);
  const displayedPath = isAnimating ? [] : searchResult.path;

  return (
    <>
      <section id="center">
        <div className="controls" style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
          <button
            type="button"
            onClick={() => setSeed((s) => s + 1)}
          >
            Generate New Maze
          </button>
          
          <select 
            value={algorithmType} 
            onChange={(e) => setAlgorithmType(e.target.value as 'dfs' | 'astar')}
          >
            <option value="astar">A* Search</option>
            <option value="dfs">Depth-First Search (DFS)</option>
          </select>
        </div>

        <div className="stats" style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>
          <span>Status: {searchResult.found ? (isAnimating ? 'Exploring...' : 'Path Found!') : 'No Path'}</span> | 
          <span> Explored: {animationIndex} / {searchResult.explored.length}</span> | 
          <span> Path Length: {searchResult.path.length}</span>
        </div>

        <section className="maze-container">
          <RenderMaze 
            maze={maze} 
            explored={animatedExplored} 
            path={displayedPath} 
          />
        </section>
      </section>
    </>
  )
}

export default App