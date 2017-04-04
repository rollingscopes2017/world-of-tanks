import Level from './level'

const LevelManager = {
    levels: [
    {
        map:
`########################
#  %        #       %  #
#  %        #       %  #
#  %                %  #
#  %                %  #
#  %                %  #
#                      #
#   %%%%%%%%%%%%%%%%   #
#                      #
####                ####
#                      #
#   %%%%%%%%%%%%%%%%   #
#     %          %     #
#     %          %     #
########################
`,
        score: 200
    },
    {
        map:
`########################
#                      #
#                      #
#  %                %  #
#  %                %  #
#  %                %  #
#                      #
#                      #
#                      #
####                ####
#                      #
#   %%%%%%%%%%%%%%%%   #
#     %          %     #
#     %          %     #
########################
`,
        score: 300
    }
    ],
    _current: -1,
    winScore: function() {
        return this.levels[this._current].score;
    },
    current: function() {
        return this._current + 1;
    },
    next: function() {
        if (++this._current >= this.levels.length) {
            this._current = -1;
            throw new Error('No more levels');
        }
        return new Level(this.levels[this._current].map);
    }
}

export default LevelManager
