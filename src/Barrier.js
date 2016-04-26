var Barrier = cc.Sprite.extend({
  ctor: function(order) {
    this._super();
    this.initWithFile('res/images/barrier.png' );
    this.order = order;
  },

  setPos: function() {
    if (this.order == 1)
      this.setPosition(new cc.Point(Barrier.FIRSTPOS.X, Barrier.FIRSTPOS.Y));
    else if (this.order == 2)
      this.setPosition(new cc.Point(Barrier.SECONDPOS.X, Barrier.SECONDPOS.Y));
    else if (this.order == 3)
      this.setPosition(new cc.Point(Barrier.THIRDPOS.X, Barrier.THIRDPOS.Y));
}
});
Barrier.FIRSTPOS = {
  X: 10,
  Y: 100
};
Barrier.SECONDPOS = {
  X: 80,
  Y: 0
};
Barrier.THIRDPOS = {
  X: 150,
  Y: 100
};
