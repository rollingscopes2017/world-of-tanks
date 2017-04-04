import Entity from './entity'

const Block = function(size, x, y, color) {
    Entity.call(this, size, size, x, y, color);
}

Block.prototype = Object.create(Entity.prototype);
Block.prototype.constructor = Block;
Block.superclass = Entity.prototype

export default Block
