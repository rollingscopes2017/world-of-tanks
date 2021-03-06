import Tank from './tank';
import ResourceManager from './resource-manager';

import { TANK_SCORE, TANK_HEALTH } from './constants';

import PlayState from './play-state';
import SoundManager from './sound-manager';

const Player = {
  tank: null,
  score: 0,
  init: function init() {
    this.score = 0;
    this.tank = new Tank(480, 520, ResourceManager.get('green_tank'), TANK_HEALTH * 10);
  },
  control: function control(action) {
    this.tank.control(action);
    if (action === 'SPACE') {
      SoundManager.play('shoot');
    }
  },
  addScore: function addScore() {
    this.score += TANK_SCORE;
    PlayState.checkStatus(this);
  },
  getHealth: function getHealth() {
    return this.tank.health;
  },
  destroy: function destroy() {
    PlayState.endGame();
  },
};

export default Player;
