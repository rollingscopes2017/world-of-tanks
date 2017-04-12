import Text, { alignments } from './text';

class Button extends Text {
  constructor(text, x, y, callback) {
    super(text, x, y, alignments.CENTER);
    this.event = null;
    this.handler = callback;
  }

  click(event) {
    if (event.pageY > this.y - this.height && event.pageY < this.y) {
      this.handler();
    }
  }
}

export default Button;
