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

    step(callback, isRun=true) {
        const x = Math.floor(this.currentFrame % this.base) * this.width
        const y = Math.floor(this.currentFrame / this.base) * this.height

        callback(this.tileSet, x, y, this.width, this.height)

        if (!isRun) {
            return
        }

        this.currentFrame++
        if (this.currentFrame >= this.startFrame + this.frames) {
            this.currentFrame = this.startFrame
        }
    }
}

export default Animation
