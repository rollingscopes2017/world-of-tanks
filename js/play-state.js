import LevelManager from './level-manager';

import { MAX_ENEMIES_COUNT } from './constants';
// tmp
import AIEnemy from './ai-enemy';
import World from './world';
import StateManager from './state-manager';
import ResultsState from './results-state';

const PlayState = {
  levelManager: LevelManager,
  world: World,
  interval: null,
  init: function init() {
    try {
      this.world.init(this.levelManager.next());
    } catch (err) {
      throw new Error();
    }
    this.interval = setInterval(this.addEnemy.bind(this), 5000);
  },
  update: function update(input) {
    this.world.step(input);
  },
  getDrawable: function getDrawable() {
    return this.world.entities;
  },
  addEnemy: function addEnemy() {
    if (this.world.entities.filter(e => e instanceof AIEnemy).length > MAX_ENEMIES_COUNT) {
      return;
    }
    const newEnemy = new AIEnemy(50, 50);
    this.world.entities.push(newEnemy);
  },
  checkStatus: function checkStatus(player) {
    if (player.score >= this.levelManager.winScore()
      && this.world.entities.filter(e => e instanceof AIEnemy).length === 0) {
      StateManager.changeState(
        ResultsState,
        this.levelManager.current(),
        this.world.player.score);
    }
  },
  destroy: function destroy() {
    clearInterval(this.interval);
  },
};

export default PlayState;
