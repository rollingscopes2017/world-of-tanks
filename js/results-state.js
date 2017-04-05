import Text from './text';

// tmp
import StateManager from './state-manager';
import PlayState from './play-state';

const ResultsState = {
  components: [],
  init: function init(level, score) {
    this.components = [];
    this.components.push(new Text(`Level ${level}`, 600, 50));
    this.components.push(new Text(`Score: ${score}`, 600, 150));
    setTimeout(StateManager.changeState.bind(StateManager, PlayState), 5000);
  },
  update: function update() {

  },
  getDrawable: function getDrawable() {
    return this.components;
  },
  destroy: function destroy() {

  },
};

export default ResultsState;
