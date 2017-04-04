import Block from './block'
import DestroyableBlock from './destroyable-block'

import { BLOCK_SIZE } from './constants'

const Level = function(map) {
    this.map = map;
}

Level.prototype.getMap = function() {
    const tiles = {
        '#': {
            class: Block,
            texture: 'green'
        },
        '%': {
            class: DestroyableBlock,
            texture: 'blue'
        }
    }
    const width = this.map.split('\n')[0].length;
    return this.map.replace(/\n/g, '').split('').map((tile, i) => {
        if (tile in tiles) {
            return new tiles[tile].class(BLOCK_SIZE, BLOCK_SIZE * (i % width), BLOCK_SIZE * Math.floor(i / width), tiles[tile].texture);
        }
    }).filter(i => i);
};

export default Level
