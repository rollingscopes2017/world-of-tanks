import Button from './button';
import Text, { alignments } from './text';

import StateManager from './state-manager';
import PlayState from './play-state';

const MenuState = {
  components: [],
  init: function init() {
    this.eventsHandler = this.mouseClick.bind(this);
    window.addEventListener('click', this.eventsHandler);
    this.components = [];
    this.components.push(new Text('World of Tanks', 600, 150, alignments.CENTER));
    this.components.push(new Button('Play', 600, 350, () => {
      StateManager.changeState(PlayState);
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

export default MenuState;
