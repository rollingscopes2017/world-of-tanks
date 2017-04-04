import Tank from './tank'
import ResourceManager from './resource-manager'

import { TANK_SCORE } from './constants'

//tmp
import PlayState from './play-state'

const Player = {
    tank: null,
    score: 0,
    init: function() {
        this.score = 0;
        this.tank = new Tank(200, 200, ResourceManager.get('green_tank'));
    },
    control: function(action) {
        this.tank.control(action);
    },
    addScore: function() {
        this.score += TANK_SCORE;
        PlayState.checkStatus(this);
        console.log(this.score)
    }
}

export default Player
