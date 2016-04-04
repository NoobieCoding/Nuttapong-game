var Health = cc.Sprite.extend({
  ctor: function(order) {
    this._super();
    this.initWithFile('res/images/hearth.png' );
    this.order = order;
  },

  setPos: function() {
    if(this.order == 1)
      this.setPosition(new cc.Point(Health.FIRSTPOS.X, Health.FIRSTPOS.Y));
    else if(this.order == 2)
      this.setPosition(new cc.Point(Health.SECONDPOS.X, Health.SECONDPOS.Y));
    else if(this.order == 3)
      this.setPosition(new cc.Point(Health.THIRDPOS.X, Health.THIRDPOS.Y));
}
});
Health.FIRSTPOS = {
  X: 10,
  Y: 100
};
Health.SECONDPOS = {
  X: 80,
  Y: 0
};
Health.THIRDPOS = {
  X: 150,
  Y: 100
};
