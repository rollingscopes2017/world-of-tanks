import Block from './block'

import { BLOCK_HEALTH, TANK_DAMAGE } from './constants'

//tmp
import World from './world'

const DestroyableBlock = function(size, x, y, color) {
    Block.call(this, size, x, y, color);
    this.health = BLOCK_HEALTH;
}

DestroyableBlock.prototype = Object.create(Block.prototype);
DestroyableBlock.prototype.constructor = DestroyableBlock;
DestroyableBlock.superclass = Block.prototype

DestroyableBlock.prototype.hit = function(first_argument) {
    this.health -= TANK_DAMAGE;
    if (this.health <= 0) {
        World.entities.remove(this);
    }
};

export default DestroyableBlock
