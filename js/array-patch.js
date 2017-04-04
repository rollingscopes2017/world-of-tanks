Array.prototype.last = function() {
    return this.length > 0 ? this[this.length - 1] : undefined;
};

Array.prototype.remove = function(item) {
    const index = this.indexOf(item);
    if (index >= 0) {
        this.splice(index, 1);
    }
};

Array.prototype.next = function(item) {
    let index = this.indexOf(item);
    if (++index === this.length) {
        index = 0;
    }
    return this[index];
}

Array.prototype.random = function() {
    return this[Math.floor(Math.random() * this.length)];
};
