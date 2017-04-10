class ProgressBar {
  constructor(x, y, width, height, max, color = '#00cc00') {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.max = max;
    this.value = this.width;
  }

  draw(context) {
    context.save();
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.value, this.height);
    context.restore();
  }

  update(value) {
    const ratio = value / this.max;
    this.value = this.width * ratio;
    if (ratio >= 0.60 && ratio < 0.90) {
      this.color = '#99ff33';
    } else if (ratio >= 0.30 && ratio < 0.60) {
      this.color = '#ffff00';
    } else if (ratio < 0.30) {
      this.color = '#ff9900';
    }
  }
}

export default ProgressBar;
