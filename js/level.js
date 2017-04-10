import Block from './block';
import DestroyableBlock from './destroyable-block';
import ResourceManager from './resource-manager';

import { BLOCK_SIZE } from './constants';

class Level {
  constructor(map) {
    this.map = map;
  }

  getMap() {
    const tiles = {
      '#': {
        class: Block,
        texture: ResourceManager.get('block'),
      },
      '%': {
        class: DestroyableBlock,
        texture: ResourceManager.get('destroyable_block'),
      },
    };
    const width = this.map.split('\n')[0].length;
    return this.map.replace(/\n/g, '').split('').map((tile, i) => {
      if (tile in tiles) {
        const Class = tiles[tile].class;
        return new Class(
          BLOCK_SIZE,
          BLOCK_SIZE * (i % width),
          BLOCK_SIZE * Math.floor(i / width),
          tiles[tile].texture);
      }
      return null;
    }).filter(i => i);
  }
}

export default Level;
