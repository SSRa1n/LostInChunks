import { useState, useEffect } from 'react';
import styles from './problem_page.module.css'
import { BLOCKS, BLOCK_DESCRIPTION } from '../../lib/blocks';
import RenderMaze from '../../components/render_maze/render_maze';
import { PRESETS } from "../../presets/map_presets";
import { enrichPreset } from '../../lib/generate_maze';
import SectionIndicator from '../../components/section_indicator/section_indicator';

const sections = [
  {
    id: 1,
    content:
      <div>
        {/* --- maybe image of real minecraft setting here --- */}
        <h2>Origin of the Problem</h2>
        <p>
          &emsp;This project models the problem of NPC pathfinding in a Minecraft-like
          environment. An NPC must travel from a starting location to a
          destination while navigating a randomly generated maze containing
          different types of terrain and hazards.
        </p>

        <p>
          &emsp;In a simple pathfinding problem, the objective is usually to find the
          shortest route between two points. However, the shortest route is not
          necessarily the safest route. Some terrain may be traversable but
          dangerous, while other terrain may be completely impassable.
        </p>

        <p>
          &emsp;This creates a more interesting search problem: the NPC must balance
          distance and danger when deciding which path to take. The project uses
          classic AI search algorithms to investigate how different strategies
          perform when searching for a low-cost path through this environment.
        </p>
      </div>
  },
  {
    id: 2,
    content:
      <div>
        <h2>Problem Definition</h2>
        <p>
          &emsp;The environment is represented as a two-dimensional grid. Each cell in
          the grid contains a block representing a type of terrain or object.
          The NPC occupies one cell at a time and can move between neighboring
          cells.
        </p>

        <p>
          &emsp;The search problem consists of four main components:
        </p>

        <ul>
          <li>
            <strong>Initial state:</strong> The location of the NPC at the start
            of the maze.
          </li>
          <li>
            <strong>Goal state:</strong> The destination that the NPC must reach.
          </li>
          <li>
            <strong>Actions:</strong> Moving one cell up, down, left, or right.
          </li>
          <li>
            <strong>Step cost:</strong> The danger or difficulty associated with
            entering a particular cell.
          </li>
        </ul>
      </div>
  },
  {
    id: 3,
    content:
      <div>
        <h2>Goal</h2>
        <p>
          &emsp;The goal is to find a path from the starting position to the destination
          with the lowest total cost.
        </p>

        <p>
          &emsp;A path is therefore not judged only by how many cells the NPC travels
          through. Each block can have a different traversal cost, allowing the
          search algorithms to prefer safer routes when a dangerous shortcut is
          available.
        </p>

        <p>
          &emsp;For example, an NPC may have the choice between taking a short route
          through water or taking a longer route across ordinary stone. If the
          additional danger of the water is greater than the cost of the extra
          movement, the optimal path should choose the safer route.
        </p>
      </div>
  },
  {
    id: 4,
    content:
      <div>
        <h2>Actions</h2>
        <p>
          &emsp;At every position, the NPC can attempt to move to one of its four
          neighboring cells:
        </p>

        <ul>
          <li>
            <strong>Up:</strong> Move one cell upward.
          </li>
          <li>
            <strong>Right:</strong> Move one cell to the right.
          </li>
          <li>
            <strong>Down:</strong> Move one cell downward.
          </li>
          <li>
            <strong>Left:</strong> Move one cell to the left.
          </li>
        </ul>

        <p>
          &emsp;Diagonal movement is not allowed. An action is only available when the
          destination cell is inside the maze and is traversable. Blocks with an
          infinite on-road cost are treated as impassable, meaning the NPC cannot
          move onto them.
        </p>
      </div>
  },
  {
    id: 5,
    content:
      <div>
        <h2>Environment</h2>
        <p>
          &emsp;The environment is a randomly generated maze made up of different
          Minecraft-inspired blocks. The maze initially consists of paths and
          empty space, after which obstacles and hazards are randomly placed.
        </p>

        <p>
          &emsp;The random generation means that each search instance can produce a
          different environment. This allows the search algorithms to be tested
          across a variety of maze layouts rather than against one fixed map.
        </p>
        <section className={styles.block_card_container}>
          {Object.keys(BLOCKS).map((key) => {
            const block = BLOCKS[key as keyof typeof BLOCKS];

            return (
              <div className={styles.block_card} key={key}>
                <img
                  src={block.filename}
                  alt={block.name}
                  className={styles.maze_block}
                />

                <div>
                  <h3>{block.name}</h3>
                  <p>( Cost: {block.cost_onroad}, Adjacent: {block.cost_adjacent} )</p>
                  <p>{BLOCK_DESCRIPTION[key as keyof typeof BLOCKS]}</p>
                </div>
              </div>
            );
          })}
        </section>
      </div>
  },
  {
    id: 6,
    content:
      <div>
        <h2>Cost and Danger</h2>
        <p>
          &emsp;One of the main differences between this problem and a simple shortest
          path problem is the cost model. Every cell has an associated traversal
          cost based on the type of block occupying it.
        </p>

        <p>
          &emsp;A base movement cost is added to every cell. The cost of entering the
          destination block is then taken into account, meaning hazardous terrain
          can make a route more expensive even if it contains fewer steps.
        </p>

        <p>
          &emsp;The environment can also take neighboring hazards into account. A cell
          near a dangerous block may receive an additional cost, representing the
          idea that an NPC is exposed to danger even when it does not directly
          step onto the hazard.
        </p>

        <p>
          &emsp;As a result, the cost of a path is the sum of the costs incurred while
          moving through its cells. The optimal solution is therefore the path
          with the lowest total cost rather than necessarily the path with the
          fewest movements.
        </p>
        <div className={styles.maze_container}>
          <RenderMaze mazeData={enrichPreset(PRESETS[0])} renderCost={true}/>
        </div> 
      </div>
  }
]

export default function ProblemPage() {
  // const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<"up" | "down">("down");

  const goToIndex = (index: number, dir: "up" | "down") => {
    if (index < 0 || index >= sections.length) return;
    setActiveIndex(index);
    setDirection(dir);
  };

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (event.deltaY > 0) {
        goToIndex(activeIndex + 1, "down");
      } else {
        goToIndex(activeIndex - 1, "up");
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        goToIndex(activeIndex + 1, "down");
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        goToIndex(activeIndex - 1, "up");
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex]);

  return (
    <div className={styles.container}>
      <div className={styles.sections}>
        {
          sections.map((section, index) => {
            const isActive = index === activeIndex;

            let state = '';

            if (isActive) {
              state = "page-active";
            } else if (index === activeIndex - 1 && direction === "down") {
              state = "exit-up";
            } else if (index === activeIndex + 1 && direction === "up") {
              state = "exit-down";
            } else if (index < activeIndex) {
              state = "exit-up";
            } else if (index > activeIndex) {
              state = "exit-down";
            }
            return (
              <section
                key={section.id}
                className={`${styles["page-section"]} ${state ? styles[state] : ""}`}
              >
                {section.content}
              </section>
            );
          })}    
      </div>
      <SectionIndicator length={sections.length} activeIndex={activeIndex} />
    </div>
  );
}