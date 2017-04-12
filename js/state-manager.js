import { last } from './array-helpers';
// tmp
import MenuState from './menu-state';

const StateManager = {
  states: [MenuState],
  init: function init(...args) {
    last(this.states).init(...args);
  },
  update: function update(input) {
    last(this.states).update(input);
  },
  getDrawable: function getDrawable() {
    return last(this.states).getDrawable();
  },
  changeState: function changeState(state, ...args) {
    this.states.pop().destroy();
    this.states.push(state);
    this.init(...args);
  },
};

export default StateManager;
