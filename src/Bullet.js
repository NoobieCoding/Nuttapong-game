var Bullet = cc.Sprite.extend({
  ctor: function(type) {
    this._super();
    this.initWithPicture(type);
    this.speed = Bullet.SPEED;
    this.scheduleUpdate();
  },

  initWithPicture: function(type) {
    if (type === Bullet.TYPE.normal)
      this.initWithFile(res.bullet_png);
    else
      this.initWithFile(res.bullet2_png);
  },

  update: function(dt) {
    this.y += this.speed;
  }
});

Bullet.SPEED = 40;

Bullet.TYPE = {
  normal: 1,
  poweredUp: 2
};
