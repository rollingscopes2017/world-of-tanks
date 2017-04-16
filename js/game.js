import InputProcessor from './input-processor';
import Renderer from './renderer';
import StateManager from './state-manager';
import ResourceManager from './resource-manager';
import SoundManager from './sound-manager';

import { TEXTURE_PATH, TEXTURE_BASE, TEXTURE_TILE_SIZE, SOUNDS } from './constants';

const Game = {
  input: InputProcessor,
  renderer: Renderer,
  state: StateManager,
  resources: ResourceManager,
  sounds: SoundManager,
  start: function start() {
    this.resources.init(TEXTURE_PATH, TEXTURE_BASE, TEXTURE_TILE_SIZE, TEXTURE_TILE_SIZE);
    this.sounds.init(SOUNDS);
    this.input.init(window);
    this.renderer.init();
    this.state.init();
    this.update();
  },
  update: function update() {
    this.state.update(this.input.process());
    this.renderer.render(this.state.getDrawable());
    requestAnimationFrame(this.update.bind(this));
  },
};

export default Game;
