import LevelManager from './level-manager'

import { MAX_ENEMIES_COUNT } from './constants'
//tmp
import AIEnemy from './ai-enemy'
import World from './world'
import StateManager from './state-manager'
import ResultsState from './results-state'
import WinState from './win-state'

const PlayState = {
    levelManager: LevelManager,
    world: World,
    interval: null,
    init: function() {
        try {
            this.world.init(this.levelManager.next());
        } catch(err) {
            StateManager.changeState(WinState);
        }
        this.interval = setInterval(this.addEnemy.bind(this), 5000);
    },
    update: function(input) {
        this.world.step(input);
    },
    getDrawable: function() {
        return this.world.entities;
    },
    addEnemy: function() {
        if (this.world.entities.filter(e => e instanceof AIEnemy).length > MAX_ENEMIES_COUNT) {
            return;
        }
        const newEnemy = new AIEnemy(50, 50);
        this.world.entities.push(newEnemy);
    },
    checkStatus: function(player) {
        if (player.score >= this.levelManager.winScore() && this.world.entities.filter(e => e instanceof AIEnemy).length === 0) {
            StateManager.changeState(ResultsState, this.levelManager.current(), this.world.player.score);
        }
    },
    destroy: function() {
        clearInterval(this.interval);
    }
}

export default PlayState
