/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 22);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var BLOCK_SIZE = exports.BLOCK_SIZE = 40;
var BLOCK_HEALTH = exports.BLOCK_HEALTH = 100;
var TANK_WIDTH = exports.TANK_WIDTH = 40;
var TANK_HEIGHT = exports.TANK_HEIGHT = 40;
var TANK_SPEED = exports.TANK_SPEED = 3;
var TANK_HEALTH = exports.TANK_HEALTH = 50;
var TANK_COOLDOWN = exports.TANK_COOLDOWN = 1000;
var TANK_DAMAGE = exports.TANK_DAMAGE = 100;
var BULLET_SIZE = exports.BULLET_SIZE = 20;
var BULLET_SPEED = exports.BULLET_SPEED = 10;
var TANK_SCORE = exports.TANK_SCORE = 50;
var MAX_ENEMIES_COUNT = exports.MAX_ENEMIES_COUNT = 4;
var TEXTURE_PATH = exports.TEXTURE_PATH = './images/tiles.png';
var TEXTURE_BASE = exports.TEXTURE_BASE = 8;
var TEXTURE_TILE_SIZE = exports.TEXTURE_TILE_SIZE = 84;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var last = function last(array) {
  return array.length > 0 ? array[array.length - 1] : undefined;
};

var remove = function remove(array, item) {
  var index = array.indexOf(item);
  if (index >= 0) {
    array.splice(index, 1);
  }
};

var random = function random(array) {
  return array[Math.floor(Math.random() * array.length)];
};

exports.last = last;
exports.remove = remove;
exports.random = random;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var ResourceManager = {
  sheet: null,
  base: 1,
  width: 0,
  height: 0,
  config: {
    block: {
      frames: 1,
      startFrame: 26
    },
    destroyable_block: {
      frames: 1,
      startFrame: 30
    },
    bullet: {
      frames: 1,
      startFrame: 20
    },
    green_tank: {
      frames: 8,
      startFrame: 1
    },
    blue_tank: {
      frames: 8,
      startFrame: 9
    }
  },
  init: function init(path, base, width, height) {
    this.sheet = new Image();
    // tileSheet.addEventListener('load', eventSheetLoaded , false);
    this.sheet.src = path;
    this.base = base;
    this.width = width;
    this.height = height;
  },
  get: function get(key) {
    return Object.assign({
      sheet: this.sheet,
      base: this.base,
      width: this.width,
      height: this.height
    }, this.config[key]);
  }
};

exports.default = ResourceManager;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _arrayHelpers = __webpack_require__(1);

var _menuState = __webpack_require__(13);

var _menuState2 = _interopRequireDefault(_menuState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StateManager = {
  states: [_menuState2.default],
  init: function init() {
    var _last;

    (_last = (0, _arrayHelpers.last)(this.states)).init.apply(_last, arguments);
  },
  update: function update(input) {
    (0, _arrayHelpers.last)(this.states).update(input);
  },
  getDrawable: function getDrawable() {
    return (0, _arrayHelpers.last)(this.states).getDrawable();
  },
  changeState: function changeState(state) {
    this.states.pop().destroy();
    this.states.push(state);

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    this.init.apply(this, args);
  }
};
// tmp
exports.default = StateManager;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var alignments = {
  LEFT: 'LEFT',
  CENTER: 'CENTER',
  RIGHT: 'RIGHT'
};

var Text = function () {
  _createClass(Text, null, [{
    key: 'align',
    get: function get() {
      var result = {};
      result[alignments.LEFT] = function (x) {
        return x;
      };
      result[alignments.CENTER] = function (x, width) {
        return x - width / 2;
      };
      result[alignments.RIGHT] = function (x, width) {
        return x - width;
      };
      return result;
    }
  }]);

  function Text(text, x, y) {
    var align = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : alignments.LEFT;
    var size = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 30;
    var color = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'black';

    _classCallCheck(this, Text);

    this.x = x;
    this.y = y;
    this.content = text;
    this.align = align;
    this.height = size;
    this.color = color;
  }

  _createClass(Text, [{
    key: 'draw',
    value: function draw(context) {
      context.save();
      context.fillStyle = this.color;
      context.font = this.height + 'px "Press Start 2P", cursive';
      context.fillText(this.content, Text.align[this.align](this.x, this.content.length * this.height), this.y);
      context.restore();
    }
  }, {
    key: 'text',
    set: function set(value) {
      this.content = value.toString();
    }
  }]);

  return Text;
}();

exports.alignments = alignments;
exports.default = Text;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.directions = exports.axis = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _entity = __webpack_require__(12);

var _entity2 = _interopRequireDefault(_entity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var axis = {
  X: 'X',
  Y: 'Y'
};

var directions = {
  TOP: 'TOP',
  BOTTOM: 'BOTTOM',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT'
};

var angles = {
  TOP: 0,
  BOTTOM: 180,
  LEFT: 270,
  RIGHT: 90
};

var DynamicEntity = function (_Entity) {
  _inherits(DynamicEntity, _Entity);

  function DynamicEntity(width, height, x, y, texture) {
    _classCallCheck(this, DynamicEntity);

    var _this = _possibleConstructorReturn(this, (DynamicEntity.__proto__ || Object.getPrototypeOf(DynamicEntity)).call(this, width, height, x, y, texture));

    _this.speed = {
      x: 0,
      y: 0
    };
    _this.direction = directions.TOP;
    return _this;
  }

  _createClass(DynamicEntity, [{
    key: 'update',
    value: function update(currentAxis) {
      if (currentAxis === axis.X) {
        this.x += this.speed.x;
      } else {
        this.y += this.speed.y;
      }
    }
  }, {
    key: 'collide',
    value: function collide(object, currentAxis) {
      if (currentAxis === axis.X && this.speed.x !== 0) {
        if (this.x < object.x) {
          this.x = object.x - this.width;
        } else {
          this.x = object.x + object.width;
        }
        this.speed.x = 0;
      }
      if (currentAxis === axis.Y && this.speed.y !== 0) {
        if (this.y < object.y) {
          this.y = object.y - this.height;
        } else {
          this.y = object.y + object.height;
        }
        this.speed.y = 0;
      }
    }
  }, {
    key: 'draw',
    value: function draw(context) {
      var isMove = this.speed.x !== 0 || this.speed.y !== 0;
      _get(DynamicEntity.prototype.__proto__ || Object.getPrototypeOf(DynamicEntity.prototype), 'draw', this).call(this, context, angles[this.direction], isMove);
    }
  }]);

  return DynamicEntity;
}(_entity2.default);

exports.axis = axis;
exports.directions = directions;
exports.default = DynamicEntity;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _player = __webpack_require__(23);

var _player2 = _interopRequireDefault(_player);

var _dynamicEntity = __webpack_require__(5);

var _dynamicEntity2 = _interopRequireDefault(_dynamicEntity);

var _aiEnemy = __webpack_require__(8);

var _aiEnemy2 = _interopRequireDefault(_aiEnemy);

var _bullet = __webpack_require__(10);

var _bullet2 = _interopRequireDefault(_bullet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var World = {
  entities: [],
  player: _player2.default,
  init: function init(level) {
    this.entities = level.getMap();
    this.player.init();
    this.entities.push(this.player.tank);
  },
  step: function step(input) {
    this.player.control(input.pop());
    this.entities.filter(function (entity) {
      return entity instanceof _aiEnemy2.default;
    }).forEach(function (entity) {
      return entity.control();
    });
    this.entities.filter(function (entity) {
      return entity instanceof _dynamicEntity2.default;
    }).forEach(function (entity) {
      return entity.update(_dynamicEntity.axis.X);
    });
    this.checkCollision(_dynamicEntity.axis.X);
    this.entities.filter(function (entity) {
      return entity instanceof _dynamicEntity2.default;
    }).forEach(function (entity) {
      return entity.update(_dynamicEntity.axis.Y);
    });
    this.checkCollision(_dynamicEntity.axis.Y);
  },
  checkCollision: function checkCollision(currentAxis) {
    var _this = this;

    this.entities.filter(function (entity) {
      return entity instanceof _dynamicEntity2.default;
    }).forEach(function (entity) {
      return _this.entities.filter(function (e) {
        return !(e instanceof _bullet2.default);
      }).forEach(function (e) {
        if (entity !== e) {
          if (entity.x < e.x + e.width && entity.x + entity.width > e.x && entity.y < e.y + e.height && entity.height + entity.y > e.y) {
            entity.collide(e, currentAxis);
          }
        }
      });
    });
  }
};

exports.default = World;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _levelManager = __webpack_require__(20);

var _levelManager2 = _interopRequireDefault(_levelManager);

var _constants = __webpack_require__(0);

var _aiEnemy = __webpack_require__(8);

var _aiEnemy2 = _interopRequireDefault(_aiEnemy);

var _world = __webpack_require__(6);

var _world2 = _interopRequireDefault(_world);

var _stateManager = __webpack_require__(3);

var _stateManager2 = _interopRequireDefault(_stateManager);

var _resultsState = __webpack_require__(26);

var _resultsState2 = _interopRequireDefault(_resultsState);

var _endState = __webpack_require__(18);

var _endState2 = _interopRequireDefault(_endState);

var _text = __webpack_require__(4);

var _text2 = _interopRequireDefault(_text);

var _progressBar = __webpack_require__(24);

var _progressBar2 = _interopRequireDefault(_progressBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
// tmp


var PlayState = {
  levelManager: _levelManager2.default,
  world: _world2.default,
  interval: null,
  healthBar: null,
  init: function init() {
    try {
      this.world.init(this.levelManager.next());
    } catch (err) {
      _stateManager2.default.changeState(_endState2.default, 'win');
    }
    this.interval = setInterval(this.addEnemy.bind(this), 5000);
    this.healthBar = new _progressBar2.default(0, 600, 1200, 50, this.world.player.getHealth());
    this.scoreLabel = new _text2.default('Score', 1150, 100, _text.alignments.RIGHT);
    this.scoreValue = new _text2.default(0, 1150, 150, _text.alignments.RIGHT);
  },
  update: function update(input) {
    this.world.step(input);
    this.healthBar.update(this.world.player.getHealth());
    this.scoreValue.text = this.world.player.score;
  },
  getDrawable: function getDrawable() {
    return [].concat(_toConsumableArray(this.world.entities), [this.healthBar, this.scoreLabel, this.scoreValue]);
  },
  addEnemy: function addEnemy() {
    if (this.world.entities.filter(function (e) {
      return e instanceof _aiEnemy2.default;
    }).length > _constants.MAX_ENEMIES_COUNT) {
      return;
    }
    var newEnemy = new _aiEnemy2.default(480, 50);
    this.world.entities.push(newEnemy);
  },
  checkStatus: function checkStatus(player) {
    if (player.score >= this.levelManager.winScore() && this.world.entities.filter(function (e) {
      return e instanceof _aiEnemy2.default;
    }).length === 0) {
      _stateManager2.default.changeState(_resultsState2.default, this.levelManager.current(), this.world.player.score);
    }
  },
  destroy: function destroy() {
    clearInterval(this.interval);
    this.world.entities.filter(function (e) {
      return e instanceof _aiEnemy2.default;
    }).forEach(function (entity) {
      return entity.destroy();
    });
  },
  endGame: function endGame() {
    _stateManager2.default.changeState(_endState2.default, 'lose');
    this.levelManager.reset();
  }
};

exports.default = PlayState;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _tank = __webpack_require__(14);

var _tank2 = _interopRequireDefault(_tank);

var _dynamicEntity = __webpack_require__(5);

var _resourceManager = __webpack_require__(2);

var _resourceManager2 = _interopRequireDefault(_resourceManager);

var _arrayHelpers = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AIEnemy = function (_Tank) {
  _inherits(AIEnemy, _Tank);

  function AIEnemy(x, y) {
    _classCallCheck(this, AIEnemy);

    var _this = _possibleConstructorReturn(this, (AIEnemy.__proto__ || Object.getPrototypeOf(AIEnemy)).call(this, x, y, _resourceManager2.default.get('blue_tank')));

    _this.shootingInterval = setInterval(_this.shoot.bind(_this), _this.cooldown);
    return _this;
  }

  _createClass(AIEnemy, [{
    key: 'control',
    value: function control() {
      _get(AIEnemy.prototype.__proto__ || Object.getPrototypeOf(AIEnemy.prototype), 'control', this).call(this, this.direction);
    }
  }, {
    key: 'collide',
    value: function collide(object, axis) {
      _get(AIEnemy.prototype.__proto__ || Object.getPrototypeOf(AIEnemy.prototype), 'collide', this).call(this, object, axis);
      this.direction = (0, _arrayHelpers.random)(Object.keys(_dynamicEntity.directions));
    }
  }, {
    key: 'hit',
    value: function hit(hitBy) {
      if (!(hitBy instanceof AIEnemy)) {
        _get(AIEnemy.prototype.__proto__ || Object.getPrototypeOf(AIEnemy.prototype), 'hit', this).call(this, hitBy);
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      clearInterval(this.shootingInterval);
    }
  }]);

  return AIEnemy;
}(_tank2.default);

exports.default = AIEnemy;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _entity = __webpack_require__(12);

var _entity2 = _interopRequireDefault(_entity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Block = function (_Entity) {
  _inherits(Block, _Entity);

  function Block(size, x, y, texture) {
    _classCallCheck(this, Block);

    return _possibleConstructorReturn(this, (Block.__proto__ || Object.getPrototypeOf(Block)).call(this, size, size, x, y, texture));
  }

  return Block;
}(_entity2.default);

exports.default = Block;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dynamicEntity = __webpack_require__(5);

var _dynamicEntity2 = _interopRequireDefault(_dynamicEntity);

var _resourceManager = __webpack_require__(2);

var _resourceManager2 = _interopRequireDefault(_resourceManager);

var _arrayHelpers = __webpack_require__(1);

var _world = __webpack_require__(6);

var _world2 = _interopRequireDefault(_world);

var _constants = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// tmp


var Bullet = function (_DynamicEntity) {
  _inherits(Bullet, _DynamicEntity);

  function Bullet(owner, x, y, tankWidth, tankHeight, direction) {
    _classCallCheck(this, Bullet);

    var _this = _possibleConstructorReturn(this, (Bullet.__proto__ || Object.getPrototypeOf(Bullet)).call(this, _constants.BULLET_SIZE, _constants.BULLET_SIZE, x, y, _resourceManager2.default.get('bullet')));

    _this.owner = owner;
    _this.direction = direction;
    if (direction === _dynamicEntity.directions.TOP) {
      _this.x = x + (tankWidth - _this.width) / 2;
      _this.y = y - _this.height;
      _this.speed.y = -_constants.BULLET_SPEED;
    } else if (direction === _dynamicEntity.directions.BOTTOM) {
      _this.x = x + (tankWidth - _this.width) / 2;
      _this.y = y + tankHeight;
      _this.speed.y = _constants.BULLET_SPEED;
    } else if (direction === _dynamicEntity.directions.LEFT) {
      _this.x = x - _this.width;
      _this.y = y + (tankWidth - _this.height) / 2;
      _this.speed.x = -_constants.BULLET_SPEED;
    } else if (direction === _dynamicEntity.directions.RIGHT) {
      _this.x = x + tankWidth;
      _this.y = y + (tankWidth - _this.height) / 2;
      _this.speed.x = _constants.BULLET_SPEED;
    }
    return _this;
  }

  _createClass(Bullet, [{
    key: 'collide',
    value: function collide(object) {
      (0, _arrayHelpers.remove)(_world2.default.entities, this);
      if (typeof object.hit === 'function') {
        object.hit(this.owner);
      }
    }
  }]);

  return Bullet;
}(_dynamicEntity2.default);

exports.default = Bullet;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _text = __webpack_require__(4);

var _text2 = _interopRequireDefault(_text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button = function (_Text) {
  _inherits(Button, _Text);

  function Button(text, x, y, callback) {
    _classCallCheck(this, Button);

    var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, text, x, y, _text.alignments.CENTER));

    _this.event = null;
    _this.handler = callback;
    return _this;
  }

  _createClass(Button, [{
    key: 'click',
    value: function click(event) {
      if (event.pageY > this.y - this.height && event.pageY < this.y) {
        this.handler();
      }
    }
  }]);

  return Button;
}(_text2.default);

exports.default = Button;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _animation = __webpack_require__(16);

var _animation2 = _interopRequireDefault(_animation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Entity = function () {
  function Entity(width, height, x, y, texture) {
    _classCallCheck(this, Entity);

    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.animation = new _animation2.default(texture.sheet, texture.base, texture.frames, texture.width, texture.height, texture.startFrame);
  }

  _createClass(Entity, [{
    key: 'draw',
    value: function draw(context) {
      var _this = this;

      var angle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var play = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      this.animation.step(function (texture, x, y, width, height) {
        if (angle !== 0) {
          context.save();
          context.setTransform(1, 0, 0, 1, 0, 0);
          context.translate(_this.x + _this.width / 2, _this.y + _this.height / 2);
          var angleInRadians = angle * Math.PI / 180;
          context.rotate(angleInRadians);

          context.drawImage(texture, x, y, width, height, -_this.width / 2, -_this.height / 2, _this.width, _this.height);

          context.restore();
        } else {
          context.drawImage(texture, x, y, width, height, _this.x, _this.y, _this.width, _this.height);
        }
      }, play);
    }
  }]);

  return Entity;
}();

exports.default = Entity;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _button = __webpack_require__(11);

var _button2 = _interopRequireDefault(_button);

var _text = __webpack_require__(4);

var _text2 = _interopRequireDefault(_text);

var _stateManager = __webpack_require__(3);

var _stateManager2 = _interopRequireDefault(_stateManager);

var _playState = __webpack_require__(7);

var _playState2 = _interopRequireDefault(_playState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MenuState = {
  components: [],
  init: function init() {
    this.eventsHandler = this.mouseClick.bind(this);
    window.addEventListener('click', this.eventsHandler);
    this.components = [];
    this.components.push(new _text2.default('World of Tanks', 600, 150, _text.alignments.CENTER));
    this.components.push(new _button2.default('Play', 600, 350, function () {
      _stateManager2.default.changeState(_playState2.default);
    }));
  },
  update: function update() {},
  getDrawable: function getDrawable() {
    return this.components;
  },
  destroy: function destroy() {
    window.removeEventListener('click', this.eventsHandler);
  },
  mouseClick: function mouseClick(event) {
    this.components.filter(function (c) {
      return c instanceof _button2.default;
    }).forEach(function (component) {
      return component.click(event);
    });
  }
};

exports.default = MenuState;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dynamicEntity = __webpack_require__(5);

var _dynamicEntity2 = _interopRequireDefault(_dynamicEntity);

var _bullet = __webpack_require__(10);

var _bullet2 = _interopRequireDefault(_bullet);

var _arrayHelpers = __webpack_require__(1);

var _constants = __webpack_require__(0);

var _world = __webpack_require__(6);

var _world2 = _interopRequireDefault(_world);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// tmp


var Tank = function (_DynamicEntity) {
  _inherits(Tank, _DynamicEntity);

  function Tank(x, y, texture) {
    var health = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _constants.TANK_HEALTH;

    _classCallCheck(this, Tank);

    var _this = _possibleConstructorReturn(this, (Tank.__proto__ || Object.getPrototypeOf(Tank)).call(this, _constants.TANK_WIDTH, _constants.TANK_HEIGHT, x, y, texture));

    _this.health = health;
    _this.cooldown = _constants.TANK_COOLDOWN;
    _this.isCooldown = false;
    return _this;
  }

  _createClass(Tank, [{
    key: 'control',
    value: function control(action) {
      this.speed.x = 0;
      this.speed.y = 0;
      if (action === 'TOP') {
        this.direction = _dynamicEntity.directions.TOP;
        this.speed.y = -_constants.TANK_SPEED;
      } else if (action === 'BOTTOM') {
        this.direction = _dynamicEntity.directions.BOTTOM;
        this.speed.y = _constants.TANK_SPEED;
      } else if (action === 'LEFT') {
        this.direction = _dynamicEntity.directions.LEFT;
        this.speed.x = -_constants.TANK_SPEED;
      } else if (action === 'RIGHT') {
        this.direction = _dynamicEntity.directions.RIGHT;
        this.speed.x = _constants.TANK_SPEED;
      } else if (action === 'SPACE') {
        this.shoot();
      }
    }
  }, {
    key: 'shoot',
    value: function shoot() {
      var _this2 = this;

      if (this.isCooldown) {
        return;
      }
      _world2.default.entities.push(new _bullet2.default(this, this.x, this.y, this.width, this.height, this.direction));
      this.isCooldown = true;
      setTimeout(function () {
        _this2.isCooldown = false;
      }, this.cooldown);
    }
  }, {
    key: 'hit',
    value: function hit(hitBy) {
      this.health -= _constants.TANK_DAMAGE;
      if (this.health <= 0) {
        if (this === _world2.default.player.tank) {
          _world2.default.player.destroy();
          return;
        }
        (0, _arrayHelpers.remove)(_world2.default.entities, this);
        this.destroy();
        if (hitBy === _world2.default.player.tank) {
          _world2.default.player.addScore();
        }
      }
    }
  }]);

  return Tank;
}(_dynamicEntity2.default);

exports.default = Tank;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inputProcessor = __webpack_require__(19);

var _inputProcessor2 = _interopRequireDefault(_inputProcessor);

var _renderer = __webpack_require__(25);

var _renderer2 = _interopRequireDefault(_renderer);

var _stateManager = __webpack_require__(3);

var _stateManager2 = _interopRequireDefault(_stateManager);

var _resourceManager = __webpack_require__(2);

var _resourceManager2 = _interopRequireDefault(_resourceManager);

var _constants = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Game = {
  input: _inputProcessor2.default,
  renderer: _renderer2.default,
  state: _stateManager2.default,
  resources: _resourceManager2.default,
  // sounds: SoundManager,
  start: function start() {
    this.resources.init(_constants.TEXTURE_PATH, _constants.TEXTURE_BASE, _constants.TEXTURE_TILE_SIZE, _constants.TEXTURE_TILE_SIZE);
    // this.sounds.init(['sound.wav']);
    this.input.init(window);
    this.renderer.init();
    this.state.init();
    this.update();
  },
  update: function update() {
    this.state.update(this.input.process());
    this.renderer.render(this.state.getDrawable());
    requestAnimationFrame(this.update.bind(this));
  }
};
// import SoundManager from './sound-manager';

exports.default = Game;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Animation = function () {
  function Animation(tileSet, base, frames, width, height) {
    var startFrame = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

    _classCallCheck(this, Animation);

    this.tileSet = tileSet;
    this.base = base;
    this.frames = frames;
    this.width = width;
    this.height = height;
    this.startFrame = startFrame;
    this.currentFrame = startFrame;
  }

  _createClass(Animation, [{
    key: "step",
    value: function step(callback) {
      var isRun = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var x = Math.floor(this.currentFrame % this.base) * this.width;
      var y = Math.floor(this.currentFrame / this.base) * this.height;

      callback(this.tileSet, x, y, this.width, this.height);

      if (!isRun) {
        return;
      }

      this.currentFrame += 1;
      if (this.currentFrame >= this.startFrame + this.frames) {
        this.currentFrame = this.startFrame;
      }
    }
  }]);

  return Animation;
}();

exports.default = Animation;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _block = __webpack_require__(9);

var _block2 = _interopRequireDefault(_block);

var _arrayHelpers = __webpack_require__(1);

var _constants = __webpack_require__(0);

var _world = __webpack_require__(6);

var _world2 = _interopRequireDefault(_world);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// tmp


var DestroyableBlock = function (_Block) {
  _inherits(DestroyableBlock, _Block);

  function DestroyableBlock(size, x, y, texture) {
    _classCallCheck(this, DestroyableBlock);

    var _this = _possibleConstructorReturn(this, (DestroyableBlock.__proto__ || Object.getPrototypeOf(DestroyableBlock)).call(this, size, x, y, texture));

    _this.health = _constants.BLOCK_HEALTH;
    return _this;
  }

  _createClass(DestroyableBlock, [{
    key: 'hit',
    value: function hit() {
      this.health -= _constants.TANK_DAMAGE;
      if (this.health <= 0) {
        (0, _arrayHelpers.remove)(_world2.default.entities, this);
      }
    }
  }]);

  return DestroyableBlock;
}(_block2.default);

exports.default = DestroyableBlock;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _button = __webpack_require__(11);

var _button2 = _interopRequireDefault(_button);

var _text = __webpack_require__(4);

var _text2 = _interopRequireDefault(_text);

var _stateManager = __webpack_require__(3);

var _stateManager2 = _interopRequireDefault(_stateManager);

var _menuState = __webpack_require__(13);

var _menuState2 = _interopRequireDefault(_menuState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var results = {
  win: {
    label: 'Victory'
  },
  lose: {
    label: 'Game over'
  }
};

var EndState = {
  components: [],
  init: function init(result) {
    this.eventsHandler = this.mouseClick.bind(this);
    window.addEventListener('click', this.eventsHandler);
    this.components = [];
    this.components.push(new _text2.default(results[result].label, 600, 150, _text.alignments.CENTER));
    this.components.push(new _button2.default('Back to menu', 600, 350, function () {
      _stateManager2.default.changeState(_menuState2.default);
    }));
  },
  update: function update() {},
  getDrawable: function getDrawable() {
    return this.components;
  },
  destroy: function destroy() {
    window.removeEventListener('click', this.eventsHandler);
  },
  mouseClick: function mouseClick(event) {
    this.components.filter(function (c) {
      return c instanceof _button2.default;
    }).forEach(function (component) {
      return component.click(event);
    });
  }
};

exports.default = EndState;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var InputProcessor = {
  map: {
    37: 'LEFT',
    38: 'TOP',
    39: 'RIGHT',
    40: 'BOTTOM',
    32: 'SPACE'
  },
  keys: [],
  init: function init(handler) {
    var _this = this;

    handler.addEventListener('keydown', function (e) {
      if (!_this.keys.includes(e.keyCode)) {
        _this.keys.push(e.keyCode);
      }
    });
    handler.addEventListener('keyup', function (e) {
      _this.keys.splice(_this.keys.indexOf(e.keyCode), 1);
    });
  },
  process: function process() {
    var _this2 = this;

    return this.keys.map(function (key) {
      return _this2.map[key];
    });
  }
};

exports.default = InputProcessor;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _level = __webpack_require__(21);

var _level2 = _interopRequireDefault(_level);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LevelManager = {
  levels: [{
    map: '########################\n#  %                %  #\n#  %        #       %  #\n#  %                %  #\n#  % %############% %  #\n#  %  %          %  %  #\n#     %          %     #\n#   %%%%%%%%%%%%%%%%   #\n#                      #\n#### %%%%%%%%%%%%%% ####\n#          %%          #\n#   %%%%%%%%%%%%%%%%   #\n#     %          %     #\n#     %          %     #\n########################\n',
    score: 200
  }, {
    map: '########################\n#                      #\n#      %%%%%%%%%%      #\n#  %                %  #\n#  %                %  #\n#%%%%%%%%%%%%%%%%%%%%%%#\n#         % %          #\n#######   % %    #######\n#         % %          #\n####      % %       ####\n#         % %          #\n#   %%%%%%%%%%%%%%%%   #\n#     %          %     #\n#     %          %     #\n########################\n',
    score: 300
  }],
  currentLevel: -1,
  winScore: function winScore() {
    return this.levels[this.currentLevel].score;
  },
  current: function current() {
    return this.currentLevel + 1;
  },
  next: function next() {
    this.currentLevel += 1;
    if (this.currentLevel >= this.levels.length) {
      this.currentLevel = -1;
      throw new Error('No more levels');
    }
    return new _level2.default(this.levels[this.currentLevel].map);
  },
  reset: function reset() {
    this.currentLevel = -1;
  }
};

exports.default = LevelManager;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _block = __webpack_require__(9);

var _block2 = _interopRequireDefault(_block);

var _destroyableBlock = __webpack_require__(17);

var _destroyableBlock2 = _interopRequireDefault(_destroyableBlock);

var _resourceManager = __webpack_require__(2);

var _resourceManager2 = _interopRequireDefault(_resourceManager);

var _constants = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Level = function () {
  function Level(map) {
    _classCallCheck(this, Level);

    this.map = map;
  }

  _createClass(Level, [{
    key: 'getMap',
    value: function getMap() {
      var tiles = {
        '#': {
          class: _block2.default,
          texture: _resourceManager2.default.get('block')
        },
        '%': {
          class: _destroyableBlock2.default,
          texture: _resourceManager2.default.get('destroyable_block')
        }
      };
      var width = this.map.split('\n')[0].length;
      return this.map.replace(/\n/g, '').split('').map(function (tile, i) {
        if (tile in tiles) {
          var Class = tiles[tile].class;
          return new Class(_constants.BLOCK_SIZE, _constants.BLOCK_SIZE * (i % width), _constants.BLOCK_SIZE * Math.floor(i / width), tiles[tile].texture);
        }
        return null;
      }).filter(function (i) {
        return i;
      });
    }
  }]);

  return Level;
}();

exports.default = Level;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game = __webpack_require__(15);

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.onload = function ready() {
  _game2.default.start();
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tank = __webpack_require__(14);

var _tank2 = _interopRequireDefault(_tank);

var _resourceManager = __webpack_require__(2);

var _resourceManager2 = _interopRequireDefault(_resourceManager);

var _constants = __webpack_require__(0);

var _playState = __webpack_require__(7);

var _playState2 = _interopRequireDefault(_playState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Player = {
  tank: null,
  score: 0,
  init: function init() {
    this.score = 0;
    this.tank = new _tank2.default(480, 500, _resourceManager2.default.get('green_tank'), _constants.TANK_HEALTH * 10);
  },
  control: function control(action) {
    this.tank.control(action);
  },
  addScore: function addScore() {
    this.score += _constants.TANK_SCORE;
    _playState2.default.checkStatus(this);
  },
  getHealth: function getHealth() {
    return this.tank.health;
  },
  destroy: function destroy() {
    _playState2.default.endGame();
  }
};

// tmp
exports.default = Player;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProgressBar = function () {
  function ProgressBar(x, y, width, height, max) {
    var color = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : '#00cc00';

    _classCallCheck(this, ProgressBar);

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.max = max;
    this.value = this.width;
  }

  _createClass(ProgressBar, [{
    key: 'draw',
    value: function draw(context) {
      context.save();
      context.fillStyle = this.color;
      context.fillRect(this.x, this.y, this.value, this.height);
      context.restore();
    }
  }, {
    key: 'update',
    value: function update(value) {
      var ratio = value / this.max;
      this.value = this.width * ratio;
      if (ratio >= 0.60 && ratio < 0.90) {
        this.color = '#99ff33';
      } else if (ratio >= 0.30 && ratio < 0.60) {
        this.color = '#ffff00';
      } else if (ratio < 0.30) {
        this.color = '#ff9900';
      }
    }
  }]);

  return ProgressBar;
}();

exports.default = ProgressBar;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var Renderer = {
  config: {
    width: 1200,
    height: 650,
    mount: 'root'
  },
  canvas: null,
  init: function init() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.config.width;
    this.canvas.height = this.config.height;
    this.context = this.canvas.getContext('2d');
    document.getElementById(this.config.mount).append(this.canvas);
  },
  render: function render(drawables) {
    var _this = this;

    this.clear();
    drawables.forEach(function (drawable) {
      drawable.draw(_this.context);
    });
  },
  clear: function clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
};

exports.default = Renderer;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _text = __webpack_require__(4);

var _text2 = _interopRequireDefault(_text);

var _stateManager = __webpack_require__(3);

var _stateManager2 = _interopRequireDefault(_stateManager);

var _playState = __webpack_require__(7);

var _playState2 = _interopRequireDefault(_playState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// tmp
var ResultsState = {
  components: [],
  init: function init(level, score) {
    this.components = [];
    // this.components.push(new Text('', 600, 50, 'center'));
    this.components.push(new _text2.default('Level ' + level, 600, 150, _text.alignments.CENTER));
    this.components.push(new _text2.default('Score: ' + score, 600, 250, _text.alignments.CENTER));
    setTimeout(_stateManager2.default.changeState.bind(_stateManager2.default, _playState2.default), 5000);
  },
  update: function update() {},
  getDrawable: function getDrawable() {
    return this.components;
  },
  destroy: function destroy() {}
};

exports.default = ResultsState;

/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.js.map