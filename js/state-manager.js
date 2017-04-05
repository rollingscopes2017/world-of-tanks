// tmp
import PlayState from './play-state';

const StateManager = {
  states: [PlayState],
  init: function init(...args) {
    this.states.last().init(...args);
  },
  update: function update(input) {
    this.states.last().update(input);
  },
  getDrawable: function getDrawable() {
    return this.states.last().getDrawable();
  },
  changeState: function changeState(state, ...args) {
    this.states.pop().destroy();
    this.states.push(state);
    this.init(...args);
  },
};

export default StateManager;
