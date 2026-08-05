export class Block {
    name: string
    filename: string
    cost_onroad: number
    cost_adjacent: number

    constructor(name: string, filename: string, cost_onroad: number, cost_adjacent: number) {
        this.name = name
        this.filename = filename
        this.cost_onroad = cost_onroad
        this.cost_adjacent = cost_adjacent
    }
}

export const BLOCKS = {
    BLOCK_GOAL : new Block('Goal', '/blocks/gold_block.png', 0, 0),
    BLOCK_START : new Block('Start', '/blocks/beacon.png', 0, 0),
    BLOCK_VOID : new Block('Void', '/blocks/suspicious_sand_3.png', 0, 0),
    BLOCK_PATH : new Block('Path', '/blocks/lime_concrete.png', 1, 0),
    BLOCK_WATER : new Block('Water', '/blocks/water.png', 8, 8),
    BLOCK_CACTUS : new Block('Cactus', '/blocks/cactus.png', -1, 8),
    BLOCK_HONEY : new Block('Honey', '/blocks/honey.png', 6, 0),
    BLOCK_MAGMA : new Block('Magma', '/blocks/magma.png', -1, 16),
    BLOCK_MAGMA_ZOMBIE : new Block('Magma Zombie', '/blocks/magma.png', 16, 8),
    BLOCK_LAVA : new Block('Lava', '/blocks/lava.png', -1, 16),
    BLOCK_LAVA_ZOMBIE : new Block('Lava Zombie', '/blocks/lava.png', 16, 8)
} as const