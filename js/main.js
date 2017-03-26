const Entity = function(width, height, x, y, color) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;
}


const DynamicEntity = function(width, height, x, y, color) {
    Entity.call(this, width, height, x, y, color);
    this.speed = {
        x: 0,
        y: 0
    };
}

DynamicEntity.prototype = Object.create(Entity.prototype);
DynamicEntity.prototype.constructor = DynamicEntity;

DynamicEntity.prototype.update = function() {
    this.x += this.speed.x;
    this.y += this.speed.y;
};

DynamicEntity.prototype.collide = function(object) {
    if (this.speed.x !== 0) {
        if (this.x < object.x) {
            this.x = object.x - this.width;
        } else {
            this.x = object.x + object.width;
        }
    }
    if (this.speed.y !== 0) {
        if (this.y < object.y) {
            this.y = object.y - this.height;
        } else {
            this.y = object.y + object.height;
        }
    }
};

DynamicEntity.prototype.control = function(direction) {
    this.speed.x = this.speed.y = 0;
    if (direction === 'UP') {
        this.speed.y = -5;
    } else if (direction === 'DOWN') {
        this.speed.y = 5;
    } else if (direction === 'LEFT') {
        this.speed.x = -5;
    } else if (direction === 'RIGHT') {
        this.speed.x = 5;
    }
};


const World = {
    entities: [],
    player: null,
    init: function() {
        this.entities = [
            new DynamicEntity(50, 50, 200, 200, 'red'),
            new DynamicEntity(50, 50, 0, 200, 'red'),
            new Entity(50, 50, 80, 10, 'green'),
            new Entity(50, 50, 130, 10, 'green'),
            new Entity(50, 50, 180, 10, 'green'),
            new Entity(50, 50, 230, 10, 'green'),
            new Entity(50, 50, 280, 10, 'green'),
            new Entity(50, 50, 10, 50, 'blue')
        ]
        this.player = this.entities[0];
    },
    step: function(input) {
        this.player.control(input.pop());
        this.entities.filter(entity => entity instanceof DynamicEntity).forEach(entity => entity.update());
        this.checkCollision();
    },
    checkCollision: function() {
        this.entities.filter(entity => entity instanceof DynamicEntity).forEach(entity => this.entities.forEach(e => {
            if (entity !== e) {
                if (entity.x < e.x + e.width &&
                entity.x + entity.width > e.x &&
                entity.y < e.y + e.height &&
                entity.height + entity.y > e.y) {
                    entity.collide(e);
                }
            }
        }));
    }
}


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
    world: World,
    start: function() {
        this.input.init(window);
        this.renderer.init();
        this.interval = setInterval(this.update.bind(this), this.config.frameRate);
        this.world.init();
    },
    update: function() {
        this.world.step(this.input.process());
        this.renderer.render(this.world.entities);
    }
}


Game.start();
