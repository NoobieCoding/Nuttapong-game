var Enemy = cc.Sprite.extend({
  ctor: function() {
    this._super();
  },

  changePosition: function() {
    this.y -= this.speed;
    this.changeXPosition();
  },

  hit: function(player) {
    return checkPlayerEnemyCollision(player, this);
  }

});
