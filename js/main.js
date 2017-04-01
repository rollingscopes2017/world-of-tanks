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


BLOCK_SIZE = 40;
BLOCK_HEALTH = 100;
TANK_WIDTH = 40;
TANK_HEIGHT = 40;
TANK_SPEED = 3;
TANK_HEALTH = 100;
TANK_COOLDOWN = 1000;
TANK_DAMAGE = 100;
BULLET_SIZE = 5;
BULLET_SPEED = 10;
TANK_SCORE = 50;
MAX_ENEMIES_COUNT = 2;


const Entity = function(width, height, x, y, color) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;
}


const Block = function(size, x, y, color) {
    Entity.call(this, size, size, x, y, color);
}

Block.prototype = Object.create(Entity.prototype);
Block.prototype.constructor = Block;
Block.superclass = Entity.prototype


const DestroyableBlock = function(size, x, y, color) {
    Block.call(this, size, x, y, color);
    this.health = BLOCK_HEALTH;
}

DestroyableBlock.prototype = Object.create(Block.prototype);
DestroyableBlock.prototype.constructor = DestroyableBlock;
DestroyableBlock.superclass = Block.prototype

DestroyableBlock.prototype.hit = function(first_argument) {
    this.health -= TANK_DAMAGE;
    if (this.health <= 0) {
        World.entities.remove(this);
    }
};

const DynamicEntity = function(width, height, x, y, color) {
    Entity.call(this, width, height, x, y, color);
    this.speed = {
        x: 0,
        y: 0
    };
}

DynamicEntity.prototype = Object.create(Entity.prototype);
DynamicEntity.prototype.constructor = DynamicEntity;
DynamicEntity.superclass = Entity.prototype

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
        this.speed.x = 0;
    }
    if (this.speed.y !== 0) {
        if (this.y < object.y) {
            this.y = object.y - this.height;
        } else {
            this.y = object.y + object.height;
        }
        this.speed.y = 0;
    }
};


const directions = {
    TOP: 'TOP',
    BOTTOM: 'BOTTOM',
    LEFT: 'LEFT',
    RIGHT: 'RIGHT'
}

const Tank = function(x, y) {
    DynamicEntity.call(this, TANK_WIDTH, TANK_HEIGHT, x, y, 'red');
    this.health = TANK_HEALTH;
    this.direction = directions.TOP;
    this.cooldown = TANK_COOLDOWN;
    this.isCooldown = false;
}

Tank.prototype = Object.create(DynamicEntity.prototype);
Tank.prototype.constructor = Tank;
Tank.superclass = DynamicEntity.prototype

Tank.prototype.control = function(action) {
    this.speed.x = this.speed.y = 0;
    if (action === 'TOP') {
        this.direction = directions.TOP;
        this.speed.y = -TANK_SPEED;
    } else if (action === 'BOTTOM') {
        this.direction = directions.BOTTOM;
        this.speed.y = TANK_SPEED;
    } else if (action === 'LEFT') {
        this.direction = directions.LEFT;
        this.speed.x = -TANK_SPEED;
    } else if (action === 'RIGHT') {
        this.direction = directions.RIGHT;
        this.speed.x = TANK_SPEED;
    } else if (action === 'SPACE') {
        this.shoot();
    }
};

Tank.prototype.shoot = function() {
    if (this.isCooldown) {
        return;
    }
    World.entities.push(new Bullet(this, this.x, this.y, this.width, this.height, this.direction));
    this.isCooldown = true;
    setTimeout(() => this.isCooldown = false, this.cooldown)
};

Tank.prototype.hit = function(hitBy) {
    this.health -= TANK_DAMAGE;
    if (this.health <= 0) {
        if (this === World.player.tank) {
            return;
        }
        World.entities.remove(this);
        this.destroy();
        if (hitBy === World.player.tank) {
            World.player.addScore();
        }
    }
};


const AIEnemy = function(x, y) {
    Tank.call(this, x, y);
    this.shootingInterval = setInterval(this.shoot.bind(this), this.cooldown);
}

AIEnemy.prototype = Object.create(Tank.prototype);
AIEnemy.prototype.constructor = AIEnemy;
AIEnemy.superclass = Tank.prototype

AIEnemy.prototype.control = function() {
    AIEnemy.superclass.control.call(this, this.direction);
};

AIEnemy.prototype.collide = function(object) {
    if (object instanceof Bullet) {
        return;
    }
    AIEnemy.superclass.collide.call(this, object);
    this.direction = Object.keys(directions).random();
};

AIEnemy.prototype.destroy = function() {
    clearInterval(this.shootingInterval);
};


const Bullet = function(owner, x, y, tankWidth, tankHeight, direction) {
    DynamicEntity.call(this, BULLET_SIZE, BULLET_SIZE, x, y, 'black');
    this.owner = owner;
    if (direction === directions.TOP) {
        this.x = x + tankWidth / 2;
        this.y = y;
        this.speed.y = -BULLET_SPEED;
    } else if (direction === directions.BOTTOM) {
        this.x = x + tankWidth / 2;
        this.y = y + tankHeight;
        this.speed.y = BULLET_SPEED;
    } else if (direction === directions.LEFT) {
        this.x = x;
        this.y = y + tankHeight / 2;
        this.speed.x = -BULLET_SPEED;
    } else if (direction === directions.RIGHT) {
        this.x = x + tankWidth;
        this.y = y + tankHeight / 2;
        this.speed.x = BULLET_SPEED;
    }
}

Bullet.prototype = Object.create(DynamicEntity.prototype);
Bullet.prototype.constructor = Bullet;
Bullet.superclass = DynamicEntity.prototype

Bullet.prototype.collide = function(object) {
    World.entities.remove(this);
    if (typeof object.hit === 'function') {
        object.hit(this.owner);
    }
};


const Player = {
    tank: null,
    score: 0,
    init: function() {
        this.tank = new Tank(200, 200);
    },
    control: function(action) {
        this.tank.control(action);
    },
    addScore: function() {
        this.score += TANK_SCORE;
        console.log(this.score)
    }
}


const Level = function(map) {
    this.map = map;
}

Level.prototype.getMap = function() {
    const tiles = {
        '#': {
            class: Block,
            texture: 'green'
        },
        '%': {
            class: DestroyableBlock,
            texture: 'blue'
        }
    }
    const width = this.map.split('\n')[0].length;
    return this.map.replace(/\n/g, '').split('').map((tile, i) => {
        if (tile in tiles) {
            return new tiles[tile].class(BLOCK_SIZE, BLOCK_SIZE * (i % width), BLOCK_SIZE * Math.floor(i / width), tiles[tile].texture);
        }
    }).filter(i => i);
};


const LevelManager = {
    levels: [
`########################
#  %        #       %  #
#  %        #       %  #
#  %                %  #
#  %                %  #
#  %                %  #
#                      #
#   %%%%%%%%%%%%%%%%   #
#                      #
####                ####
#                      #
#   %%%%%%%%%%%%%%%%   #
#     %          %     #
#     %          %     #
########################
`,
`########################
#                      #
#                      #
#  %                %  #
#  %                %  #
#  %                %  #
#                      #
#                      #
#                      #
####                ####
#                      #
#   %%%%%%%%%%%%%%%%   #
#     %          %     #
#     %          %     #
########################
`
    ],
    current: -1,
    next: function() {
        return new Level(this.levels[++this.current]);
    }
}


// const StateManager = {

// }


const World = {
    entities: [],
    player: Player,
    init: function(level) {
        this.entities = level.getMap();
        this.player.init();
        this.entities.push(this.player.tank);
    },
    step: function(input) {
        this.player.control(input.pop());
        this.entities.filter(entity => entity instanceof AIEnemy).forEach(entity => entity.control());
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


const PlayState = {
    levelManager: LevelManager,
    world: World,
    init: function() {
        this.world.init(this.levelManager.next());
        setInterval(this.addEnemy.bind(this), 5000);
    },
    update: function(input) {
        this.world.step(input);
    },
    getDrawable: function() {
        return this.world.entities;
    },
    addEnemy: function() {
        if (this.world.entities.filter(e => e instanceof AIEnemy).length > MAX_ENEMIES_COUNT) {
            return;
        }
        const newEnemy = new AIEnemy(50, 50);
        this.world.entities.push(newEnemy);
    }
}


const Renderer = {
    config: {
        width: 1200,
        height: 600,
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
        38: 'TOP',
        39: 'RIGHT',
        40: 'BOTTOM',
        32: 'SPACE'
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
    state: PlayState,
    start: function() {
        this.input.init(window);
        this.renderer.init();
        this.state.init();
        this.update();
    },
    update: function() {
        this.state.update(this.input.process());
        this.renderer.render(this.state.getDrawable());
        requestAnimationFrame(this.update.bind(this));
    }
}


Game.start();
