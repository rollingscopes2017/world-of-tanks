import Animation from './animation'

class Entity {
    constructor(width, height, x, y, texture) {
        this.width = width
        this.height = height
        this.x = x
        this.y = y
        console.log(texture)
        this.animation = new Animation(texture.sheet, texture.base, texture.frames, texture.width, texture.height, texture.startFrame)
    }

    draw(context) {
        this.animation.step((texture, width, height, x, y) => {
            context.drawImage(texture, x, y, width, height, this.x, this.y, this.width, this.height)
        })
    }
}

export default Entity
