import Text from './text'

//tmp
import StateManager from './state-manager'
import PlayState from './play-state'

const ResultsState = {
    components: [],
    init: function(level, score) {
        this.components = [];
        this.components.push(new Text(`Level ${level}`, 600, 50));
        this.components.push(new Text(`Score: ${score}`, 600, 150));
        setTimeout(StateManager.changeState.bind(StateManager, PlayState), 5000);
    },
    update: function(input) {

    },
    getDrawable: function() {
        return this.components;
    },
    destroy: function() {

    }
}

export default ResultsState
