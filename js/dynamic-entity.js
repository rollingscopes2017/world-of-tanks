import Entity from './entity'

const axis = {
    X: 'X',
    Y: 'Y'
}

class DynamicEntity extends Entity {
    constructor(width, height, x, y, texture) {
        super(width, height, x, y, texture)
        this.speed = {
            x: 0,
            y: 0
        }
    }

    update(axis) {
        if (axis === 'X') {
            this.x += this.speed.x
        } else {
            this.y += this.speed.y
        }
    }

    collide(object, currentAxis) {
        if (currentAxis === axis.X && this.speed.x !== 0) {
            if (this.x < object.x) {
                this.x = object.x - this.width
            } else {
                this.x = object.x + object.width
            }
            this.speed.x = 0
        }
        if (currentAxis === axis.Y && this.speed.y !== 0) {
            if (this.y < object.y) {
                this.y = object.y - this.height
            } else {
                this.y = object.y + object.height
            }
            this.speed.y = 0
        }
    }
}

export { axis }

export default DynamicEntity
