var Instruction = cc.Sprite.extend({
  ctor: function() {
    this._super();
    this.initWithFile(res.instruction_png);
    this.setPos();
    this.setVisible(false);
  },

  setPos: function() {
    this.setPosition(new cc.Point(GameLayer.SCREENWIDTH / 2, GameLayer.SCREENHEIGHT / 2));
  },

  openOrClose: function() {
    if (this.isVisible())
      this.setVisible(false);
    else
      this.setVisible(true);
  }
});
