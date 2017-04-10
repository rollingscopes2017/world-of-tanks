class Text {
  static get align() {
    return {
      left: x => x,
      center: (x, width) => x - (width / 2),
      right: (x, width) => x - width,
    };
  }

  constructor(text, x, y, align = 'left', color = 'black') {
    this.x = x;
    this.y = y;
    this.content = text;
    this.align = align;
    this.color = color;
  }

  draw(context) {
    context.save();
    context.fillStyle = this.color;
    context.font = '30px "Press Start 2P", cursive';
    context.fillText(
      this.content,
      Text.align[this.align](this.x, this.content.length * 30),
      this.y);
    context.restore();
  }

  set text(value) {
    this.content = value.toString();
  }
}

export default Text;
