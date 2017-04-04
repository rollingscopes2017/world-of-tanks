import DynamicEntity from './dynamic-entity'
import Bullet from './bullet'

import { TANK_COOLDOWN, TANK_DAMAGE, TANK_HEALTH, TANK_HEIGHT, TANK_SPEED, TANK_WIDTH } from './constants'

//tmp
import World from './world'

const directions = {
    TOP: 'TOP',
    BOTTOM: 'BOTTOM',
    LEFT: 'LEFT',
    RIGHT: 'RIGHT'
}

const Tank = function(x, y) {
    DynamicEntity.call(this, TANK_WIDTH, TANK_HEIGHT, x, y, 'red');
    this.health = TANK_HEALTH;
    this.direction = directions.TOP;
    this.cooldown = TANK_COOLDOWN;
    this.isCooldown = false;
}

Tank.prototype = Object.create(DynamicEntity.prototype);
Tank.prototype.constructor = Tank;
Tank.superclass = DynamicEntity.prototype

Tank.prototype.control = function(action) {
    this.speed.x = this.speed.y = 0;
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
};

Tank.prototype.shoot = function() {
    if (this.isCooldown) {
        return;
    }
    World.entities.push(new Bullet(this, this.x, this.y, this.width, this.height, this.direction));
    this.isCooldown = true;
    setTimeout(() => this.isCooldown = false, this.cooldown)
};

Tank.prototype.hit = function(hitBy) {
    this.health -= TANK_DAMAGE;
    if (this.health <= 0) {
        if (this === World.player.tank) {
            console.log('Dead')
            return;
        }
        World.entities.remove(this);
        this.destroy();
        if (hitBy === World.player.tank) {
            World.player.addScore();
        }
    }
};

export { directions }

export default Tank
