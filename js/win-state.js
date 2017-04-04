const WinState = {
    init: function() {

    },
    update: function(input) {

    },
    getDrawable: function() {
        return [
            {
                text: 'Congratulation!!!',
                draw: function(ctx) {
                    ctx.font = '30px Arial';
                    ctx.fillText(this.text, 600, 50);
                }
            },
            {
                text: 'Score',
                draw: function(ctx) {
                    ctx.font = '30px Arial';
                    ctx.fillText(this.text, 600, 150);
                }
            }
        ];
    },
    destroy: function() {

    }
}

export default WinState
