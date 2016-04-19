var Bullet = cc.Sprite.extend({
  ctor: function() {
    this._super();
    this.initWithFile('res/images/bullet.png');
    this.speed = 40;
    this.scheduleUpdate();
  },

  update: function(dt) {
    this.y += this.speed;

  }
});
