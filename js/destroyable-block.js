import Block from './block'

import { BLOCK_HEALTH, TANK_DAMAGE } from './constants'

//tmp
import World from './world'

class DestroyableBlock extends Block {
    constructor(size, x, y, texture) {
        super(size, x, y, texture)
        this.health = BLOCK_HEALTH
    }

    hit() {
        this.health -= TANK_DAMAGE
        if (this.health <= 0) {
            World.entities.remove(this)
        }
    }
}

export default DestroyableBlock
