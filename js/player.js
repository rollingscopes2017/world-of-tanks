import Tank from './tank';
import ResourceManager from './resource-manager';

import { TANK_SCORE, TANK_HEALTH } from './constants';

// tmp
import PlayState from './play-state';

const Player = {
  tank: null,
  score: 0,
  init: function init() {
    this.score = 0;
    this.tank = new Tank(500, 500, ResourceManager.get('green_tank'), TANK_HEALTH * 10);
  },
  control: function control(action) {
    this.tank.control(action);
  },
  addScore: function addScore() {
    this.score += TANK_SCORE;
    PlayState.checkStatus(this);
  },
  getHealth: function getHealth() {
    return this.tank.health;
  },
};

export default Player;
