import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

import { generateMaze } from './lib/generate_maze'
import RenderMaze from './lib/render_maze'

function App() {
  const [count, setCount] = useState(0)

  const maze = generateMaze(16, 16)

  return (
    <>
      <section id="center">
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
        <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <RenderMaze maze={maze} />
        </section>
      </section>
    </>
  )
}

export default App
