var BonusItem = cc.Sprite.extend({
  ctor: function(type) {
    this._super();
    this.initWithFile('res/images/bonus item.png');
    this.speed = 10;
    this.scheduleUpdate();
  },
});
