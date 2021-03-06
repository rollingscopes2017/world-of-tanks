import Tank from './tank';
import { directions } from './dynamic-entity';
import ResourceManager from './resource-manager';
import { random } from './array-helpers';

class AIEnemy extends Tank {
  constructor(x, y) {
    super(x, y, ResourceManager.get('blue_tank'));
    this.shootingInterval = setInterval(this.shoot.bind(this), this.cooldown);
  }

  control() {
    super.control.call(this, this.direction);
  }

  collide(object, axis) {
    super.collide.call(this, object, axis);
    this.direction = random(Object.keys(directions));
  }

  hit(hitBy) {
    if (!(hitBy instanceof AIEnemy)) {
      super.hit.call(this, hitBy);
    }
  }

  destroy() {
    clearInterval(this.shootingInterval);
  }
}

export default AIEnemy;
