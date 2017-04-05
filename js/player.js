import Tank from './tank';
import ResourceManager from './resource-manager';

import { TANK_SCORE } from './constants';

// tmp
import PlayState from './play-state';

const Player = {
  tank: null,
  score: 0,
  init: function init() {
    this.score = 0;
    this.tank = new Tank(200, 200, ResourceManager.get('green_tank'));
  },
  control: function control(action) {
    this.tank.control(action);
  },
  addScore: function addScore() {
    this.score += TANK_SCORE;
    PlayState.checkStatus(this);
  },
};

export default Player;
