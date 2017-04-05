import Entity from './entity';

const axis = {
  X: 'X',
  Y: 'Y',
};

const directions = {
  TOP: 'TOP',
  BOTTOM: 'BOTTOM',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
};

const angles = {
  TOP: 0,
  BOTTOM: 180,
  LEFT: 270,
  RIGHT: 90,
};

class DynamicEntity extends Entity {
  constructor(width, height, x, y, texture) {
    super(width, height, x, y, texture);
    this.speed = {
      x: 0,
      y: 0,
    };
    this.direction = directions.TOP;
  }

  update(currentAxis) {
    if (currentAxis === axis.X) {
      this.x += this.speed.x;
    } else {
      this.y += this.speed.y;
    }
  }

  collide(object, currentAxis) {
    if (currentAxis === axis.X && this.speed.x !== 0) {
      if (this.x < object.x) {
        this.x = object.x - this.width;
      } else {
        this.x = object.x + object.width;
      }
      this.speed.x = 0;
    }
    if (currentAxis === axis.Y && this.speed.y !== 0) {
      if (this.y < object.y) {
        this.y = object.y - this.height;
      } else {
        this.y = object.y + object.height;
      }
      this.speed.y = 0;
    }
  }

  draw(context) {
    const isMove = this.speed.x !== 0 || this.speed.y !== 0;
    super.draw(context, angles[this.direction], isMove);
  }
}

export { axis, directions };

export default DynamicEntity;
