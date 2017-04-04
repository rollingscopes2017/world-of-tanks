//tmp
import PlayState from './play-state'

const StateManager = {
    states: [PlayState],
    init: function(...args) {
        this.states.last().init(...args);
    },
    update: function(input) {
        this.states.last().update(input);
    },
    getDrawable: function() {
        return this.states.last().getDrawable();
    },
    changeState: function(state, ...args) {
        this.states.pop().destroy();
        this.states.push(state);
        this.init(...args);
    }
}

export default StateManager
