import type { Maze } from './generate_maze'
import { Block } from './blocks'

export class Cell {
    block: Block
    cost: number

    constructor(block: Block, cost: number) {
        this.block = block
        this.cost = cost
    }
}

export type CostMap = Cell[][];

export function calculateCost(maze: Maze): CostMap {
    const costMap: CostMap = maze.map(row => row.map(block => new Cell(block, block.cost_onroad)));
    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[y].length; x++) {
            const cell = costMap[y][x];
            cell.cost += 1; // Base cost

            const adj_offsets = [
                [-1, 0],
                [1, 0],
                [0, -1],
                [0, 1]
            ];
            const adj_costs: number[] = [];

            for (const [dx, dy] of adj_offsets) {
                const nx = x + dx;
                const ny = y + dy;
                if (nx >= 0 && nx < maze[y].length && ny >= 0 && ny < maze.length) {
                    adj_costs.push(costMap[ny][nx].block.cost_adjacent);
                }
            }

            cell.cost += Math.max(...adj_costs, 0);
        }
    }
    return costMap;
}