import Tank, { directions } from './tank'

const AIEnemy = function(x, y) {
    Tank.call(this, x, y);
    this.shootingInterval = setInterval(this.shoot.bind(this), this.cooldown);
}

AIEnemy.prototype = Object.create(Tank.prototype);
AIEnemy.prototype.constructor = AIEnemy;
AIEnemy.superclass = Tank.prototype

AIEnemy.prototype.control = function() {
    AIEnemy.superclass.control.call(this, this.direction);
};

AIEnemy.prototype.collide = function(object, axis) {
    AIEnemy.superclass.collide.call(this, object, axis);
    this.direction = Object.keys(directions).random();
};

AIEnemy.prototype.hit = function(hitBy) {
    if (!(hitBy instanceof AIEnemy)) {
        AIEnemy.superclass.hit.call(this, hitBy);
    }
};

AIEnemy.prototype.destroy = function() {
    clearInterval(this.shootingInterval);
};

export default AIEnemy
