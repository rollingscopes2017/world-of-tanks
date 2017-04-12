import Button from './button';
import Text, { alignments } from './text';

import StateManager from './state-manager';
import MenuState from './menu-state';

const results = {
  win: {
    label: 'Victory',
  },
  lose: {
    label: 'Game over',
  },
};

const EndState = {
  components: [],
  init: function init(result) {
    this.eventsHandler = this.mouseClick.bind(this);
    window.addEventListener('click', this.eventsHandler);
    this.components = [];
    this.components.push(new Text(results[result].label, 600, 150, alignments.CENTER));
    this.components.push(new Button('Back to menu', 600, 350, () => {
      StateManager.changeState(MenuState);
    }));
  },
  update: function update() {

  },
  getDrawable: function getDrawable() {
    return this.components;
  },
  destroy: function destroy() {
    window.removeEventListener('click', this.eventsHandler);
  },
  mouseClick: function mouseClick(event) {
    this.components.filter(c => c instanceof Button).forEach(component => component.click(event));
  },
};

export default EndState;
