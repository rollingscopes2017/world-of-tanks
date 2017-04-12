const alignments = {
  LEFT: 'LEFT',
  CENTER: 'CENTER',
  RIGHT: 'RIGHT',
};

class Text {
  static get align() {
    const result = {};
    result[alignments.LEFT] = x => x;
    result[alignments.CENTER] = (x, width) => x - (width / 2);
    result[alignments.RIGHT] = (x, width) => x - width;
    return result;
  }

  constructor(text, x, y, align = alignments.LEFT, size = 30, color = 'black') {
    this.x = x;
    this.y = y;
    this.content = text;
    this.align = align;
    this.height = size;
    this.color = color;
  }

  draw(context) {
    context.save();
    context.fillStyle = this.color;
    context.font = `${this.height}px "Press Start 2P", cursive`;
    context.fillText(
      this.content,
      Text.align[this.align](this.x, this.content.length * this.height),
      this.y);
    context.restore();
  }

  set text(value) {
    this.content = value.toString();
  }
}

export { alignments };

export default Text;
