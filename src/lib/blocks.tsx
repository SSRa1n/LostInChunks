class Block {
    id: number
    name: string
    filename: string
    cost_onroad: number
    cost_adjacent: number

    constructor(id: number, name: string, filename: string, cost_onroad: number, cost_adjacent: number) {
        this.id = id
        this.name = name
        this.filename = filename
        this.cost_onroad = cost_onroad
        this.cost_adjacent = cost_adjacent
    }
}

export const BLOCK_GOAL = new Block(-2, 'Goal', '/blocks/gold_block.png', 0, 0)
export const BLOCK_START = new Block(-1, 'Start', '/blocks/beacon.png', 0, 0)
export const BLOCK_VOID = new Block(0, 'Void', '/blocks/suspicious_sand_3.png', 0, 0)
export const BLOCK_PATH = new Block(1, 'Path', '/blocks/lime_concrete.png', 1, 0)
export const BLOCK_WATER = new Block(2, 'Water', '/blocks/water.png', 8, 8)
export const BLOCK_CACTUS = new Block(3, 'Cactus', '/blocks/cactus.png', -1, 8)
export const BLOCK_HONEY = new Block(4, 'Honey', '/blocks/honey.png', 6, 0)
export const BLOCK_MAGMA = new Block(5, 'Magma', '/blocks/magma.png', -1, 16)
export const BLOCK_MAGMA_ZOMBIE = new Block(6, 'Magma Zombie', '/blocks/magma.png', 16, 8)
export const BLOCK_LAVA = new Block(7, 'Lava', '/blocks/lava.png', -1, 16)
export const BLOCK_LAVA_ZOMBIE = new Block(8, 'Lava Zombie', '/blocks/lava.png', 16, 8)