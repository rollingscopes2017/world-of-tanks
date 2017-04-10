import Level from './level';

const LevelManager = {
  levels: [
    {
      map:
`########################
#  %        #       %  #
#  %        #       %  #
#  %                %  #
#  % %############% %  #
#  %  %          %  %  #
#     %          %     #
#   %%%%%%%%%%%%%%%%   #
#                      #
#### %%%%%%%%%%%%%% ####
#          %%          #
#   %%%%%%%%%%%%%%%%   #
#     %          %     #
#     %          %     #
########################
`,
      score: 200,
    },
    {
      map:
`########################
#                      #
#      %%%%%%%%%%      #
#  %                %  #
#  %                %  #
#%%%%%%%%%%%%%%%%%%%%%%#
#         % %          #
#######   % %    #######
#         % %          #
####      % %       ####
#         % %          #
#   %%%%%%%%%%%%%%%%   #
#     %          %     #
#     %          %     #
########################
`,
      score: 300,
    },
  ],
  currentLevel: -1,
  winScore: function winScore() {
    return this.levels[this.currentLevel].score;
  },
  current: function current() {
    return this.currentLevel + 1;
  },
  next: function next() {
    this.currentLevel += 1;
    if (this.currentLevel >= this.levels.length) {
      this.currentLevel = -1;
      throw new Error('No more levels');
    }
    return new Level(this.levels[this.currentLevel].map);
  },
};

export default LevelManager;
