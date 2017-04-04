import Animation from './animation'

class Entity {
    constructor(width, height, x, y, texture) {
        this.width = width
        this.height = height
        this.x = x
        this.y = y
        this.animation = new Animation(texture.sheet, texture.base, texture.frames, texture.width, texture.height, texture.startFrame)
    }

    draw(context, angle=0, play=true) {
        this.animation.step((texture, x, y, width, height) => {
            if (angle !== 0) {
                context.save()
                context.setTransform(1,0,0,1,0,0)
                context.translate(this.x + this.width / 2, this.y + this.height / 2)
                const angleInRadians = angle * Math.PI / 180
                context.rotate(angleInRadians)

                context.drawImage(texture, x, y, width, height, -this.width / 2, -this.height / 2, this.width, this.height)

                context.restore();
            } else {
                context.drawImage(texture, x, y, width, height, this.x, this.y, this.width, this.height)
            }
        }, play)
    }
}

export default Entity
