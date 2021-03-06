var Enemy = cc.Sprite.extend({
  ctor: function() {
    this._super();
    this.state = Enemy.STATE.normal;
    this.createAnimation();
  },

  setDifficulty: function() {
    if (currentDifficulty === DIFFICULTY.easy)
      this.speed -= Enemy.EASY_SPEED_DECREASE;
  },

  changePosition: function() {
    this.y -= this.speed;
    this.changeXPosition();
  },

  rePosition: function() {
    this.respawn();
    this.setPos();
  },

  hit: function(focusObject) {
    if (focusObject instanceof Player)
      return this.hitBetweenPlayerAndThisEnemy(focusObject);
    else
      return this.hitBetweenBulletAndThisEnemy(focusObject);
  },

  hitBetweenPlayerAndThisEnemy: function(player) {
    if (checkPlayerEnemyCollision(player, this) && player.state === Player.ALIVE)
      return true;
    else
      return false;
  },

  hitBetweenBulletAndThisEnemy: function(bullet) {
    if (checkBulletEnemyCollision(bullet, this))
      return true;
    else
      return false;
  },

  gotHit: function() {
    this.hp -= 1;
    if (this.hp <= 0)
      this.gotDestroyed();
  },

  gotDestroyed: function() {
    this.explosionTimer = 0;
    this.runAction(this.animation);
    playEffect(res.enemyExploded_wav);
    this.state = Enemy.STATE.destroyed;
  },

  checkEnemyInvisible: function() {
    if (this.state === Enemy.STATE.destroyed && this.isVisible() &&
      this.explosionTimer > Enemy.EXPLOSION_TIME)
      this.setVisible(false);
  },

  respawn: function() {
    this.initWithPic();
    this.setVisible(true);
    this.state = Enemy.STATE.normal;
    this.hp = this.originalHP;
  },

  getScore: function() {
    return this.score;
  },

  createAnimation: function() {
    var animation = new cc.Animation.create();
    this.addImagesToAnimation(animation);
    animation.setDelayPerUnit(0.1);
    this.animation = cc.Animate.create(animation);
  },

  addImagesToAnimation: function(animation) {
    animation.addSpriteFrameWithFile(res.enemyExplosion1_png);
    animation.addSpriteFrameWithFile(res.enemyExplosion2_png);
    animation.addSpriteFrameWithFile(res.enemyExplosion3_png);
    animation.addSpriteFrameWithFile(res.enemyExplosion4_png);
    animation.addSpriteFrameWithFile(res.enemyExplosion5_png);
  }
});
Enemy.STATE = {
  normal: 1,
  destroyed: 2
};

Enemy.EASY_SPEED_DECREASE = 5;
Enemy.EXPLOSION_TIME = 25;
