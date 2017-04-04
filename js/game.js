import InputProcessor from './input-processor'
import Renderer from './renderer'
import StateManager from './state-manager'

const Game = {
    config: {
        frameRate: 20
    },
    input: InputProcessor,
    renderer: Renderer,
    state: StateManager,
    start: function() {
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
