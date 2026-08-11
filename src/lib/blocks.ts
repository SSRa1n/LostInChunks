export class Block {
    name: string
    filename: string
    cost_onroad: number
    cost_adjacent: number
    is_obstacle: boolean

    path_spawn_chance: number
    void_spawn_chance: number
    path_spread_chance: number
    void_spread_chance: number
    max_spread: number

    constructor(name: string, filename: string, cost_onroad: number, cost_adjacent: number, is_obstacle: boolean = false, path_spawn_chance: number = 0, void_spawn_chance: number = 0, path_spread_chance: number = 0, void_spread_chance: number = 0, max_spread: number = 4) {
        this.name = name
        this.filename = filename
        this.cost_onroad = cost_onroad
        this.cost_adjacent = cost_adjacent
        this.is_obstacle = is_obstacle

        this.path_spawn_chance = path_spawn_chance
        this.void_spawn_chance = void_spawn_chance
        this.path_spread_chance = path_spread_chance
        this.void_spread_chance = void_spread_chance
        this.max_spread = max_spread
    }
}

export const BLOCKS = {
    BLOCK_GOAL : new Block('Goal', './blocks/gold_block.png', 0, 0),
    BLOCK_START : new Block('Start', './blocks/beacon.png', 0, 0),
    BLOCK_VOID : new Block('Void', './blocks/end_portal.png', Infinity, 0),
    BLOCK_PATH : new Block('Path', './blocks/stone.png', 0, 0),
    BLOCK_WATER : new Block('Water', './blocks/water.png', 8, 8, true, 0.1, 0.1, 0.25, 0.5),
    BLOCK_CACTUS : new Block('Cactus', './blocks/cactus.png', Infinity, 8, true, 0.05, 0.1, 0, 0),
    BLOCK_HONEY : new Block('Honey', './blocks/honey.png', 6, 0, true, 0.25, 0, 0.5, 0),
    BLOCK_MAGMA : new Block('Magma', './blocks/magma.png', Infinity, 16, true, 0.05, 0.1, 0, 0.5),
    BLOCK_LAVA : new Block('Lava', './blocks/lava.png', Infinity, 16, true, 0.05, 0.1, 0, 0.5),
    BLOCK_MAGMA_ZOMBIE : new Block('Magma Zombie', './blocks/magma.png', 16, 8),
    BLOCK_LAVA_ZOMBIE : new Block('Lava Zombie', './blocks/lava.png', 16, 8)
} as const