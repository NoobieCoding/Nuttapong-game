var EnemyType1 = Enemy.extend({
  ctor: function(order) {
    this._super();
    this.initWithFile('res/images/enemy1.png' );
    this.order = order;
    this.randomPosX = Math.floor(Math.random() * (range + 1)) + min;
    if(this.randomPosX <= EnemyType1.ENEMY1.MID_LANE_X)
      this.side = EnemyType1.ENEMY1.LEFTSIDE;
    else
      this.side = EnemyType1.ENEMY1.RIGHTSIDE;
    this.speed  = 12
    this.xSpeed = 12;
    this.canRe = false;
  },

  setPos: function() {
    this.setPosition(new cc.Point(this.randomPosX,
    EnemyType1.ENEMY1.FIRST_ENEMY_POSY + (this.order * EnemyType1.ENEMY1.GAP_PER_ENEMIY)));
  },

  update: function(dt) {
    this.changePosition();
    this.setPosition(new cc.Point(this.x, this.y));
    this.checkBounce();
    this.rePosition();
  },

  changePosition: function() {
    this.y -= this.speed;
    this.changeXPosition();
  },

  changeXPosition: function() {
    if(this.side == EnemyType1.ENEMY1.LEFTSIDE)
      this.x += this.xSpeed;
    else
      this.x -= this.xSpeed;
  },

  rePosition: function() {
    if(this.checkRespawnable()) {
      this.setPos();
      this.canRe = false;
    }
  },

  checkRespawnable: function() {
    if(this.canRe)
      return true;
    else
      return false;
},

  checkBounce: function() {
    if(this.x <= EnemyType1.ENEMY1.LEFT_BOARDER) {
      this.side = EnemyType1.ENEMY1.LEFTSIDE;
    }
    if(this.x >= EnemyType1.ENEMY1.RIGHT_BOARDER)
      this.side = EnemyType1.ENEMY1.RIGHTSIDE;
  }

});
var range = 1520;
var min = 200;

EnemyType1.ENEMY1 = {
  FIRST_ENEMY_POSY: 1200,
  GAP_PER_ENEMIY: 250,
  MID_LANE_X: 960,
  LEFTSIDE: 1,
  RIGHTSIDE: 2,
  LEFT_BOARDER: 300,
  RIGHT_BOARDER: 1620
};
