const Renderer = {
  config: {
    width: 1200,
    height: 650,
    mount: 'root',
  },
  canvas: null,
  init: function init() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.config.width;
    this.canvas.height = this.config.height;
    this.context = this.canvas.getContext('2d');
    document.getElementById(this.config.mount).appendChild(this.canvas);
  },
  render: function render(drawables) {
    this.clear();
    drawables.forEach((drawable) => {
      drawable.draw(this.context);
    });
  },
  clear: function clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};

export default Renderer;
