const InputProcessor = {
  map: {
    37: 'LEFT',
    38: 'TOP',
    39: 'RIGHT',
    40: 'BOTTOM',
    32: 'SPACE',
  },
  keys: [],
  init: function init(handler) {
    handler.addEventListener('keydown', (e) => {
      if (!this.keys.includes(e.keyCode)) {
        this.keys.push(e.keyCode);
      }
    });
    handler.addEventListener('keyup', (e) => {
      this.keys.splice(this.keys.indexOf(e.keyCode), 1);
    });
  },
  process: function process() {
    return this.keys.map(key => this.map[key]);
  },
};

export default InputProcessor;
