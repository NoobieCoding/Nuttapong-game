var Bullet = cc.Sprite.extend({
  ctor: function() {
    this._super();
    this.initWithFile('res/images/bullet.png');
    this.speed = 10;
  },

  update: function(dt) {
    this.y += this.speed;
  },

});
