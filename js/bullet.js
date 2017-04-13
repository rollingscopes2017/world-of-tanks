import DynamicEntity, { directions } from './dynamic-entity';
import ResourceManager from './resource-manager';
import { remove } from './array-helpers';

import World from './world';

import { BULLET_SIZE, BULLET_SPEED } from './constants';

class Bullet extends DynamicEntity {
  constructor(owner, x, y, tankWidth, tankHeight, direction) {
    super(BULLET_SIZE, BULLET_SIZE, x, y, ResourceManager.get('bullet'));
    this.owner = owner;
    this.direction = direction;
    if (direction === directions.TOP) {
      this.x = x + ((tankWidth - this.width) / 2);
      this.y = y - this.height;
      this.speed.y = -BULLET_SPEED;
    } else if (direction === directions.BOTTOM) {
      this.x = x + ((tankWidth - this.width) / 2);
      this.y = y + tankHeight;
      this.speed.y = BULLET_SPEED;
    } else if (direction === directions.LEFT) {
      this.x = x - this.width;
      this.y = y + ((tankWidth - this.height) / 2);
      this.speed.x = -BULLET_SPEED;
    } else if (direction === directions.RIGHT) {
      this.x = x + tankWidth;
      this.y = y + ((tankWidth - this.height) / 2);
      this.speed.x = BULLET_SPEED;
    }
  }

  collide(object) {
    remove(World.entities, this);
    if (typeof object.hit === 'function') {
      object.hit(this.owner);
    }
  }
}

export default Bullet;
