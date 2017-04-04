import InputProcessor from './input-processor'
import Renderer from './renderer'
import StateManager from './state-manager'
import ResourceManager from './resource-manager'

import { TEXTURE_PATH, TEXTURE_BASE, TEXTURE_TILE_SIZE } from './constants'

const Game = {
    config: {
        frameRate: 20
    },
    input: InputProcessor,
    renderer: Renderer,
    state: StateManager,
    resources: ResourceManager,
    start: function() {
        this.resources.init(TEXTURE_PATH, TEXTURE_BASE, TEXTURE_TILE_SIZE, TEXTURE_TILE_SIZE);
        this.input.init(window);
        this.renderer.init();
        this.state.init();
        this.update();
    },
    update: function() {
        this.state.update(this.input.process());
        this.renderer.render(this.state.getDrawable());
        requestAnimationFrame(this.update.bind(this));
    }
}

export default Game
