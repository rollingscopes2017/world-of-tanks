import Player from './player';
import DynamicEntity, { axis } from './dynamic-entity';
import AIEnemy from './ai-enemy';
import Bullet from './bullet';

const World = {
  entities: [],
  player: Player,
  init: function init(level) {
    this.entities = level.getMap();
    this.player.init();
    this.entities.push(this.player.tank);
  },
  step: function step(input) {
    this.player.control(input.pop());
    this.entities.filter(entity => entity instanceof AIEnemy)
    .forEach(entity => entity.control());
    this.entities.filter(entity => entity instanceof DynamicEntity)
    .forEach(entity => entity.update(axis.X));
    this.checkCollision(axis.X);
    this.entities.filter(entity => entity instanceof DynamicEntity)
    .forEach(entity => entity.update(axis.Y));
    this.checkCollision(axis.Y);
  },
  checkCollision: function checkCollision(currentAxis) {
    this.entities.filter(entity => entity instanceof DynamicEntity)
    .forEach(entity =>
      this.entities.filter(e => !(e instanceof Bullet))
      .forEach((e) => {
        if (entity !== e) {
          if (entity.x < e.x + e.width &&
            entity.x + entity.width > e.x &&
            entity.y < e.y + e.height &&
            entity.height + entity.y > e.y) {
            entity.collide(e, currentAxis);
          }
        }
      }));
  },
};

export default World;
