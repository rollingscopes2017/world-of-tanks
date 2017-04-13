import Block from './block';

import { remove } from './array-helpers';
import { BLOCK_HEALTH, TANK_DAMAGE } from './constants';

import World from './world';

class DestroyableBlock extends Block {
  constructor(size, x, y, texture) {
    super(size, x, y, texture);
    this.health = BLOCK_HEALTH;
  }

  hit() {
    this.health -= TANK_DAMAGE;
    if (this.health <= 0) {
      remove(World.entities, this);
    }
  }
}

export default DestroyableBlock;
