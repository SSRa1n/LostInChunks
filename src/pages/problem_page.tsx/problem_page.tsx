import styles from './problem_page.module.css'
import { BLOCKS, BLOCK_DESCRIPTION } from '../../lib/blocks';
import RenderMaze from '../../lib/render_maze';
import { PRESETS } from "../../presets/map_presets";

export default function ProblemPage() {
  return (
    <div className={styles.container}>
      <h1>Problem Context</h1>

      <section>
        --- maybe image of real mincraft setting here ---
        <h2>Origin of the Problem</h2>
        <p>
          This project models the problem of NPC pathfinding in a Minecraft-like
          environment. An NPC must travel from a starting location to a
          destination while navigating a randomly generated maze containing
          different types of terrain and hazards.
        </p>

        <p>
          In a simple pathfinding problem, the objective is usually to find the
          shortest route between two points. However, the shortest route is not
          necessarily the safest route. Some terrain may be traversable but
          dangerous, while other terrain may be completely impassable.
        </p>

        <p>
          This creates a more interesting search problem: the NPC must balance
          distance and danger when deciding which path to take. The project uses
          classic AI search algorithms to investigate how different strategies
          perform when searching for a low-cost path through this environment.
        </p>
      </section>

      <section>
        <h2>Problem Definition</h2>
        <p>
          The environment is represented as a two-dimensional grid. Each cell in
          the grid contains a block representing a type of terrain or object.
          The NPC occupies one cell at a time and can move between neighboring
          cells.
        </p>

        <p>
          The search problem consists of four main components:
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
      </section>

      <section>
        <h2>Goal</h2>
        <p>
          The goal is to find a path from the starting position to the destination
          with the lowest total cost.
        </p>

        <p>
          A path is therefore not judged only by how many cells the NPC travels
          through. Each block can have a different traversal cost, allowing the
          search algorithms to prefer safer routes when a dangerous shortcut is
          available.
        </p>

        <p>
          For example, an NPC may have the choice between taking a short route
          through water or taking a longer route across ordinary stone. If the
          additional danger of the water is greater than the cost of the extra
          movement, the optimal path should choose the safer route.
        </p>
      </section>

      <section>
        <h2>Actions</h2>
        <p>
          At every position, the NPC can attempt to move to one of its four
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
          Diagonal movement is not allowed. An action is only available when the
          destination cell is inside the maze and is traversable. Blocks with an
          infinite on-road cost are treated as impassable, meaning the NPC cannot
          move onto them.
        </p>
      </section>

      <section>
        <h2>Environment</h2>
        <p>
          The environment is a randomly generated maze made up of different
          Minecraft-inspired blocks. The maze initially consists of paths and
          empty space, after which obstacles and hazards are randomly placed.
        </p>

        <p>
          The random generation means that each search instance can produce a
          different environment. This allows the search algorithms to be tested
          across a variety of maze layouts rather than against one fixed map.
        </p>

        {Object.keys(BLOCKS).map((key) => {
          const block = BLOCKS[key as keyof typeof BLOCKS];

          return (
            <div className={styles.block_card} key={key}>
              <img
                src={block.filename}
                alt={block.name}
                className="maze-block"
              />

              <div>
                <h3>{block.name} ( Cost: {block.cost_onroad}, Adjacent: {block.cost_adjacent} )</h3>
                <p>{BLOCK_DESCRIPTION[key as keyof typeof BLOCKS]}</p>
              </div>
            </div>
          );
        })}
      </section>

      <section>
        <h2>Cost and Danger</h2>
        <p>
          One of the main differences between this problem and a simple shortest
          path problem is the cost model. Every cell has an associated traversal
          cost based on the type of block occupying it.
        </p>

        <p>
          A base movement cost is added to every cell. The cost of entering the
          destination block is then taken into account, meaning hazardous terrain
          can make a route more expensive even if it contains fewer steps.
        </p>

        <p>
          The environment can also take neighboring hazards into account. A cell
          near a dangerous block may receive an additional cost, representing the
          idea that an NPC is exposed to danger even when it does not directly
          step onto the hazard.
        </p>

        <p>
          As a result, the cost of a path is the sum of the costs incurred while
          moving through its cells. The optimal solution is therefore the path
          with the lowest total cost rather than necessarily the path with the
          fewest movements.
        </p>

        <RenderMaze maze={PRESETS[0]} renderCost={true}/>
      </section>
    </div>
  );
}