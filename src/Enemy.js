var Enemy = cc.Sprite.extend({
  ctor: function() {
    this._super();
    this.state = Enemy.STATE.normal;
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
    if(focusObject instanceof Player)
      return this.hitBetweenPlayerAndThisEnemy(focusObject);
    else
      return this.hitBetweenBulletAndThisEnemy(focusObject);
  },

  hitBetweenPlayerAndThisEnemy: function(player) {
    if(checkPlayerEnemyCollision(player, this)) {
      return true;
    }
    else
      return false;
  },

  hitBetweenBulletAndThisEnemy: function(bullet) {
    if(checkBulletEnemyCollision(bullet, this)) {
      return true;
    }
    else
      return false;
  },

  gotDestroyed: function() {
    this.state = Enemy.STATE.destroyed;
    this.setVisible(false);
  },

  respawn: function() {
    this.setVisible(true);
    this.state = Enemy.STATE.normal;
  }
});
Enemy.STATE = {
  normal: 1,
  destroyed: 2
};
