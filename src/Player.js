var Player = cc.Sprite.extend({
  ctor: function() {
    this._super();
    this.initWithFile(res.player_png);
    this.initializeFields();
    this.creathBarrierBar();
    this.setPos();
    this.scheduleUpdate();
    this.createAnimation();
  },

  switchDirection: function(keyboardInput) {
    this.direction = keyboardInput;
  },

  initializeFields: function() {
    this.direction = Player.DIR.STILL;
    this.state = Player.ALIVE;
    this.speed = Player.DEFAULT_SPEED;
  },

  setPos: function() {
    var xPos = GameLayer.SCREENWIDTH / 2;
    var yPos = GameLayer.STARTPOSY;
    this.setPosition(new cc.Point(xPos, yPos));
  },

  update(dt) {
    var pos = this.getPosition();
    pos = this.movePlayer(pos);
    this.setPosition(new cc.Point(pos.x, pos.y));
    this.checkBonusBulletEnd();
    this.checkBonusSpeedEnd();
  },

  movePlayer: function(pos) {
    if (this.direction !== Player.DIR.STILL) {
      this.determineDirection(pos);
    }
    return pos;
  },

  determineDirection: function(pos) {
    switch (this.direction) {
    case Player.DIR.UP:
      this.moveup(pos);
      break;
    case Player.DIR.DOWN:
      this.moveDown(pos);
      break;
    case Player.DIR.LEFT:
      this.moveLeft(pos);
      break;
    case Player.DIR.RIGHT:
      this.moveRight(pos);
      break;
    }
  },

  moveup: function(pos) {
    if (pos.y <= GameLayer.SCREENHEIGHT - 150)
      pos.y += this.speed;
  },

  moveDown: function(pos) {
    if (pos.y >= 160)
      pos.y -= this.speed;
  },

  moveLeft: function(pos) {
    if (pos.x >= 120)
      pos.x -= this.speed;
  },

  moveRight: function(pos) {
    if (pos.x <= GameLayer.SCREENWIDTH - 120)
      pos.x += this.speed;
  },

  creathBarrierBar: function() {
    this.barrier = 3;
    this.barrierBar = new Array(3);
    for (var i = 0; i < this.barrierBar.length; i++) {
      this.barrierBar[i] = new Barrier(i + 1);
      this.barrierBar[i].setPos();
      this.addChild(this.barrierBar[i]);
    }
  },

  reduceBarrier: function() {
    playEffect(res.barrierBreak_wav);
    this.barrier -= 1;
    this.reduceBarrierSprite();
  },

  reduceBarrierSprite: function() {
    if (this.barrier === 2)
      this.removeChild(this.barrierBar[2]);
    else if (this.barrier === 1)
      this.removeChild(this.barrierBar[1]);
    else if (this.barrier === 0)
      this.removeChild(this.barrierBar[0]);
  },

  addBarrier: function() {
    if (this.barrier < 3) {
      playEffect(res.barrierUp_wav);
      this.barrier += 1
      this.addbarrierSprite();
    }
  },

  addbarrierSprite: function() {
    if (this.barrier === 1) {
      this.addChild(this.barrierBar[0]);
      this.barrierBar[0].runAnimation();
    } else if (this.barrier === 2) {
      this.addChild(this.barrierBar[1]);
      this.barrierBar[1].runAnimation();
    } else if (this.barrier === 3) {
      this.addChild(this.barrierBar[2]);
      this.barrierBar[2].runAnimation();
    }
  },

  addSpeed: function() {
    playEffect(res.speedUp_mp3);
    this.speedBonusTimer = Player.MAX_BONUS_TIME;
    this.turnOnTurbo();
  },

  addBulletSpeed: function() {
    Player.poweredUp = true;
    playEffect(res.powerUp_wav);
    GameLayer.bulletDelay = 3.0;
    this.bulletBonusTimer = Player.MAX_BONUS_TIME;
  },

  checkBonusBulletEnd: function() {
    if (this.bulletBonusTimer > 0) {
      this.bulletBonusTimer -= 0.2;
    }

    if (this.bulletBonusTimer <= 0) {
      Player.poweredUp = false;
      GameLayer.bulletDelay = 5;
    }
  },

  checkBonusSpeedEnd: function() {
    if (this.speedBonusTimer > 0) {
      this.speedBonusTimer -= 0.2;
    }

    if (this.speedBonusTimer <= 0)
      this.turnOffTurbo();
  },

  turnOnTurbo: function() {
    this.speed = Player.TURBO_SPEED;
    this.initWithFile(res.playerTurboMode_png)
  },

  turnOffTurbo: function() {
    this.speed = Player.DEFAULT_SPEED;
    this.initWithFile(res.player_png);
  },

  gotDestroyed: function() {
    this.explosionTimer = 0;
    this.state = Player.DEAD;
    playEffect(res.playerExploded_wav);
    this.runAction(this.animation);
  },

  checkPlayerExplodingEnd: function() {
    if (this.state === Player.DEAD && this.explosionTimer > Player.EXPLOSION_TIME)
      this.removeFromParent();
  },

  createAnimation: function() {
    var animation = new cc.Animation.create();
    this.addImagesToAnimation(animation);
    animation.setDelayPerUnit(0.1);
    this.animation = cc.Animate.create(animation);
  },

  addImagesToAnimation: function(animation) {
    animation.addSpriteFrameWithFile(res.playerExplosion1_png);
    animation.addSpriteFrameWithFile(res.playerExplosion2_png);
    animation.addSpriteFrameWithFile(res.playerExplosion3_png);
    animation.addSpriteFrameWithFile(res.playerExplosion4_png);
    animation.addSpriteFrameWithFile(res.playerExplosion5_png);
    animation.addSpriteFrameWithFile(res.playerExplosion6_png);
    animation.addSpriteFrameWithFile(res.playerExplosion7_png);
  }
});

Player.DIR = {
  STILL: 0,
  UP: 1,
  RIGHT: 2,
  LEFT: 3,
  DOWN: 4
};

Player.poweredUp = false;

Player.ALIVE = 1;
Player.DEAD = 2;
Player.EXPLOSION_TIME = 50;
Player.DEFAULT_SPEED = 38;
Player.TURBO_SPEED = 60;
Player.MAX_BONUS_TIME = 100;
