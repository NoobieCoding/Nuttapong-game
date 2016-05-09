var EnemyType1 = Enemy.extend({
  ctor: function(order, player, gameLayer) {
    this._super();
    this.initWithPic();
    this.order = order;
    this.player = player;
    this.gameLayer = gameLayer;
    this.initializeFields();
    this.randomPosition();
    this.determineSide();
    this.setDifficulty();
  },

  initWithPic: function() {
    this.initWithFile(res.enemy1_png);
  },

  initializeFields: function() {
    this.originalHP = EnemyType1.HP;
    this.hp = this.originalHP;
    this.speed  = EnemyType1.SPEED.y;
    this.xSpeed = EnemyType1.SPEED.x;
    this.score = EnemyType1.SCORE;
    this.bulletTimer = 0
    this.canRe = false;
  },

  randomPosition: function() {
    var range = EnemyType1.MAX_X;
    var min = EnemyType1.MIN_X;
    this.randomPosX = Math.floor(Math.random() * (range + 1)) + min;
  },

  determineSide: function() {
    if (this.randomPosX <= EnemyType1.ENEMY1.MID_LANE_X)
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
    this.explosionTimer += 1;
    this.bulletTimer += 1;
    this.changePosition();
    this.setPosition(new cc.Point(this.x, this.y));
    this.checkBounce();
    this.rePosition();
    this.checkEnemyInvisible();
    this.shoot();
  },

  changeXPosition: function() {
    if (this.side === EnemyType1.ENEMY1.LEFTSIDE)
      this.x += this.xSpeed;
    else
      this.x -= this.xSpeed;
  },

  rePosition: function() {
    if (this.canRe) {
      this.respawn();
      this.setPos();
      this.canRe = false;
    }
  },

  checkBounce: function() {
    if (this.x <= EnemyType1.ENEMY1.LEFT_BOARDER) {
      this.side = EnemyType1.ENEMY1.LEFTSIDE;
    }
    if (this.x >= EnemyType1.ENEMY1.RIGHT_BOARDER)
      this.side = EnemyType1.ENEMY1.RIGHTSIDE;
  },

  shoot: function() {
    if (this.shootCondition()) {
      this.createBullet();
      this.bulletTimer = 0;
    }
  },

  shootCondition: function() {
    return this.bulletTimer >= EnemyType1.BULLET_DELAY + (this.order * EnemyType1.DELAY_PER_ENEMY)
      &&  this.y < GameLayer.SCREENHEIGHT - 80 && this.y > 160 &&
      this.state === Enemy.STATE.normal;
  },

  createBullet: function() {
    var bulletType = random(1, 1);
    this.bullet = new EnemyBullet(bulletType, this.player, this.gameLayer);
    this.bullet.setPosition(new cc.Point(this.x, this.y - EnemyType1.RADIUS));
    this.gameLayer.addChild(this.bullet);
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

EnemyType1.SPEED = {
  x: 15,
  y: 8
};

EnemyType1.HP = 2;
EnemyType1.SCORE = 100;
EnemyType1.MAX_X = 1520;
EnemyType1.MIN_X = 200;
EnemyType1.BULLET_DELAY = 100;
EnemyType1.DELAY_PER_ENEMY = 10;
EnemyType1.RADIUS = 40;
