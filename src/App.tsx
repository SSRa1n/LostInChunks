import { useState } from 'react'
import './App.css'

import { generateMaze } from './lib/generate_maze'
import RenderMaze from './lib/render_maze'

function App() {
  const [count, setCount] = useState(0)

  const maze = generateMaze(11, 9)

  return (
    <>
      <section id="center">
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Maze #{count}
        </button>
        <section className="maze-container">
          <RenderMaze maze={maze} />
        </section>
      </section>
    </>
  )
}

export default App
