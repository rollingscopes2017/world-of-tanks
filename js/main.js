const Entity = function(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;
    this.speed = {
        x: 0,
        y: 0
    };
}

Entity.prototype.update = function() {
    this.x += this.speed.x;
    this.y += this.speed.y;
};

Entity.prototype.control = function(directions) {
    this.speed.x = this.speed.y = 0;
    directions.forEach(direction => {
        if (direction === 'UP') {
            this.speed.y = -5;
        } else if (direction === 'DOWN') {
            this.speed.y = 5;
        } else if (direction === 'LEFT') {
            this.speed.x = -5;
        } else if (direction === 'RIGHT') {
            this.speed.x = 5;
        }
    });
};


const Renderer = {
    config: {
        width: 480,
        height: 270,
        mount: 'root'
    },
    canvas: null,
    init: function() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.config.width;
        this.canvas.height = this.config.height;
        this.context = this.canvas.getContext('2d');
        document.getElementById(this.config.mount).append(this.canvas);
    },
    render: function(entities) {
        this.clear();
        entities.forEach(entity => {
            this.context.fillStyle = entity.color;
            this.context.fillRect(entity.x, entity.y, entity.width, entity.height);
        });
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}


const InputProcessor = {
    map: {
        37: 'LEFT',
        38: 'UP',
        39: 'RIGHT',
        40: 'DOWN'
    },
    keys: [],
    init: function(handler) {
        handler.addEventListener('keydown', e => {
            if (!this.keys.includes(e.keyCode)) {
                this.keys.push(e.keyCode);
            }
        });
        handler.addEventListener('keyup', e => {
            this.keys.splice(this.keys.indexOf(e.keyCode), 1);
        });
    },
    process: function() {
        return this.keys.map(key => this.map[key]);
    }
}


const Game = {
    config: {
        frameRate: 20
    },
    input: InputProcessor,
    renderer: Renderer,
    entities: [],
    player: null,
    start: function() {
        this.input.init(window);
        this.renderer.init();
        this.interval = setInterval(this.update, this.config.frameRate);

        this.entities = [
            new Entity(50, 50, 'red', 10, 10),
            new Entity(50, 50, 'green', 80, 10),
            new Entity(50, 50, 'blue', 10, 50)
        ]
        this.player = this.entities[0];
    },
    update: function() {
        Game.player.control(Game.input.process());
        Game.entities.forEach(entity => entity.update());
        Game.renderer.render(Game.entities);
    }
}


Game.start();
