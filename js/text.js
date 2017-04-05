class Text {
  constructor(text, x, y, color = 'black') {
    this.x = x;
    this.y = y;
    this.text = text;
    this.color = color;
  }

  draw(context) {
    context.fillStyle = this.color;
    context.font = '30px Arial';
    context.fillText(this.text, this.x, this.y);
  }
}

export default Text;
