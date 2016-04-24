var EnemyType1 = Enemy.extend({
  ctor: function(order) {
    this._super();
    this.initWithFile('res/images/enemy1.png');
    this.order = order;
    this.randomPosition();
    this.determineSide();
    this.originalHP = EnemyType1.HP;
    this.hp = this.originalHP;
    this.speed  = 8
    this.xSpeed = 15;
    this.setDifficulty();
    this.canRe = false;
  },

  randomPosition: function() {
    var range = 1520;
    var min = 200;
    this.randomPosX = Math.floor(Math.random() * (range + 1)) + min;
  },

  determineSide: function() {
    if(this.randomPosX <= EnemyType1.ENEMY1.MID_LANE_X)
      this.side = EnemyType1.ENEMY1.LEFTSIDE;
    else
      this.side = EnemyType1.ENEMY1.RIGHTSIDE;
  },

  setPos: function() {
    var xPos = this.randomPosX;
    var yPos = EnemyType1.ENEMY1.FIRST_ENEMY_POSY + (this.order * EnemyType1.ENEMY1.GAP_PER_ENEMIY)
    this.setPosition(new cc.Point(xPos, yPos));
  },

  update: function(dt) {
    this.changePosition();
    this.setPosition(new cc.Point(this.x, this.y));
    this.checkBounce();
    this.rePosition();
  },

  changeXPosition: function() {
    if(this.side == EnemyType1.ENEMY1.LEFTSIDE)
      this.x += this.xSpeed;
    else
      this.x -= this.xSpeed;
  },

  rePosition: function() {
    if(this.canRe) {
      this.respawn();
      this.setPos();
      this.canRe = false;
    }
  },

  checkBounce: function() {
    if(this.x <= EnemyType1.ENEMY1.LEFT_BOARDER) {
      this.side = EnemyType1.ENEMY1.LEFTSIDE;
    }
    if(this.x >= EnemyType1.ENEMY1.RIGHT_BOARDER)
      this.side = EnemyType1.ENEMY1.RIGHTSIDE;
  }
});

EnemyType1.ENEMY1 = {
  FIRST_ENEMY_POSY: 1200,
  GAP_PER_ENEMIY: 250,
  MID_LANE_X: 960,
  LEFTSIDE: 1,
  RIGHTSIDE: 2,
  LEFT_BOARDER: 40,
  RIGHT_BOARDER: 1880
};
EnemyType1.HP = 1;
