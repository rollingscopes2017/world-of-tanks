import Animation from './animation'

class Entity {
    constructor(width, height, x, y, texture) {
        this.width = width
        this.height = height
        this.x = x
        this.y = y
        this.animation = new Animation(texture.sheet, texture.base, texture.frames, texture.width, texture.height, texture.startFrame)
    }

    draw(context, angle=0) {
        this.animation.step(context, this.x, this.y, this.width, this.height, angle)
    }
}

export default Entity
