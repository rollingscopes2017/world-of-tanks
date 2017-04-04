import Entity from './entity'

class Block extends Entity{
    constructor(size, x, y, texture) {
        super(size, size, x, y, texture)
    }
}

export default Block
