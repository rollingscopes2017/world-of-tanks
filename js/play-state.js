import LevelManager from './level-manager';

import { MAX_ENEMIES_COUNT } from './constants';

import AIEnemy from './ai-enemy';
import World from './world';
import StateManager from './state-manager';
import ResultsState from './results-state';
import EndState from './end-state';
import Text, { alignments } from './text';
import ProgressBar from './progress-bar';

const PlayState = {
  levelManager: LevelManager,
  world: World,
  interval: null,
  healthBar: null,
  init: function init() {
    try {
      this.world.init(this.levelManager.next());
    } catch (err) {
      StateManager.changeState(EndState, 'win');
    }
    this.interval = setInterval(this.addEnemy.bind(this), 5000);
    this.healthBar = new ProgressBar(0, 600, 1200, 50, this.world.player.getHealth());
    this.scoreLabel = new Text('Score', 1150, 100, alignments.RIGHT);
    this.scoreValue = new Text(0, 1150, 150, alignments.RIGHT);
  },
  update: function update(input) {
    this.world.step(input);
    this.healthBar.update(this.world.player.getHealth());
    this.scoreValue.text = this.world.player.score;
  },
  getDrawable: function getDrawable() {
    return [...this.world.entities, this.healthBar, this.scoreLabel, this.scoreValue];
  },
  addEnemy: function addEnemy() {
    if (this.world.entities.filter(e => e instanceof AIEnemy).length > MAX_ENEMIES_COUNT) {
      return;
    }
    const newEnemy = new AIEnemy(480, 50);
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
    this.world.entities.filter(e => e instanceof AIEnemy).forEach(entity => entity.destroy());
  },
  endGame: function endGame() {
    StateManager.changeState(EndState, 'lose');
    this.levelManager.reset();
  },
};

export default PlayState;
