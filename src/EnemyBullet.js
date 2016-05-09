var EnemyBullet = cc.Sprite.extend({
  ctor: function(type, player, gameLayer) {
    this._super();
    this.type = type;
    this.gameLayer = gameLayer
    this.initWithPicture();
    this.speed = EnemyBullet.SPEED;
    this.player = player;
    this.scheduleUpdate();
  },

  initWithPicture: function() {
    if (this.type === EnemyBullet.TYPE.right)
      this.initWithFile(res.enemyBullet1_png);
    else
      this.initWithFile(res.enemyBullet2_png);
  },

  update: function(dt) {
    this.changePosition();
    this.checkOutOfTheScreen();
    this.checkHitPlayer();
  },

  changePosition: function() {
    this.y -= this.speed;
    this.changeXPosition();
    this.setPosition(new cc.Point(this.x, this.y));
  },

  changeXPosition: function() {
    if (this.type === EnemyBullet.TYPE.right)
      this.x += this.speed;
    else
      this.x -= this.speed;
  },

  checkOutOfTheScreen: function() {
    if (this.x < -EnemyBullet.OUT_OF_SCREEN_VALUE ||
      this.x > GameLayer.SCREENWIDTH + EnemyBullet.OUT_OF_SCREEN_VALUE ||
      this.y < -EnemyBullet.OUT_OF_SCREEN_VALUE)
      this.removeFromParent();
  },

  checkHitPlayer: function() {
    if (checkHitBulletAndPlayer(this, this.player)) {
      this.removeFromParent();
      this.player.reduceBarrier();
      this.dealDamageToPlayer();
    }
  },

  dealDamageToPlayer: function() {
    if (this.player.barrier < 0 && this.player.state === Player.ALIVE) {
      this.player.gotDestroyed();
      this.gameLayer.gameOver();
    }
  },
});

EnemyBullet.SPEED = 15;

EnemyBullet.OUT_OF_SCREEN_VALUE = 100;

EnemyBullet.TYPE = {
  right: 1,
  left: 2
};
