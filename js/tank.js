import DynamicEntity, { directions } from './dynamic-entity';
import Bullet from './bullet';

import { remove } from './array-helpers';
import { TANK_COOLDOWN, TANK_DAMAGE, TANK_HEALTH, TANK_HEIGHT, TANK_SPEED, TANK_WIDTH } from './constants';

import World from './world';
import SoundManager from './sound-manager';

class Tank extends DynamicEntity {
  constructor(x, y, texture, health = TANK_HEALTH) {
    super(TANK_WIDTH, TANK_HEIGHT, x, y, texture);
    this.health = health;
    this.cooldown = TANK_COOLDOWN;
    this.isCooldown = false;
  }

  control(action) {
    this.speed.x = 0;
    this.speed.y = 0;
    if (action === 'TOP') {
      this.direction = directions.TOP;
      this.speed.y = -TANK_SPEED;
    } else if (action === 'BOTTOM') {
      this.direction = directions.BOTTOM;
      this.speed.y = TANK_SPEED;
    } else if (action === 'LEFT') {
      this.direction = directions.LEFT;
      this.speed.x = -TANK_SPEED;
    } else if (action === 'RIGHT') {
      this.direction = directions.RIGHT;
      this.speed.x = TANK_SPEED;
    } else if (action === 'SPACE') {
      this.shoot();
    }
  }

  shoot() {
    if (this.isCooldown) {
      return;
    }
    World.entities.push(new Bullet(this, this.x, this.y, this.width, this.height, this.direction));
    this.isCooldown = true;
    setTimeout(() => { this.isCooldown = false; }, this.cooldown);
  }

  hit(hitBy) {
    this.health -= TANK_DAMAGE;
    SoundManager.play('hit');
    if (this.health <= 0) {
      if (this === World.player.tank) {
        World.player.destroy();
        return;
      }
      remove(World.entities, this);
      this.destroy();
      if (hitBy === World.player.tank) {
        World.player.addScore();
      }
    }
  }
}

export default Tank;
