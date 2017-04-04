class Animation {
    constructor(tileSet, base, frames, width, height, startFrame=0) {
        this.tileSet = tileSet
        this.base = base
        this.frames = frames
        this.width = width
        this.height = height
        this.startFrame = startFrame
        this.currentFrame = startFrame
    }

    step(context, targetX, targetY, targetWidth, targetHeight, angle=0) {
        const x = Math.floor(this.currentFrame % this.base) * this.width
        const y = Math.floor(this.currentFrame / this.base) * this.height

        if (angle !== 0) {
            context.save()
            context.setTransform(1,0,0,1,0,0)
            context.translate(targetX + targetWidth / 2, targetY + targetHeight / 2)
            const angleInRadians = angle * Math.PI / 180
            context.rotate(angleInRadians)

            context.drawImage(this.tileSet, x, y, this.width, this.height, -targetWidth / 2, -targetHeight / 2, targetWidth, targetHeight)

            context.restore();
        } else {
            context.drawImage(this.tileSet, x, y, this.width, this.height, targetX, targetY, targetWidth, targetHeight)
        }

        this.currentFrame++
        if (this.currentFrame >= this.startFrame + this.frames) {
            this.currentFrame = this.startFrame
        }
    }
}

export default Animation
