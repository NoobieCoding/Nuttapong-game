var Background = cc.Sprite.extend({
  ctor: function(order) {
    this._super();
    this.order = order
    this.initFiles();
  },

  initFiles: function() {
    switch (this.order) {
    case Background.ORDER.FIRST:
      this.initWithFile(res.background1_png);
      break;
    case Background.ORDER.SECOND:
      this.initWithFile(res.background2_png);
      break;
    case Background.ORDER.THIRD:
      this.initWithFile(res.background3_png);
      break;
    }
  },

  setPos: function() {
    var posX = GameLayer.SCREENWIDTH / 2;
    var posY;
    switch (this.order) {
    case Background.ORDER.FIRST:
      posY = GameLayer.SCREENHEIGHT / 2;
      break;
    case Background.ORDER.SECOND:
      posY = GameLayer.SCREENHEIGHT * 3 / 2;
      break;
    case Background.ORDER.THIRD:
      posY = GameLayer.SCREENHEIGHT * 5 / 2;
      break;
    }
    this.setPosition(new cc.Point(posX, posY));
  },

  update: function(dt) {
    this.y -= Background.SCROLLING_SPEED;
    this.rePosition();
  },

  checkOutOfBoarder: function() {
    return this.y <= - (GameLayer.SCREENHEIGHT / 2);
  },

  rePosition: function() {
    var xPos = GameLayer.SCREENWIDTH / 2;
    var yPos = GameLayer.SCREENHEIGHT * 5 / 2
    if (this.checkOutOfBoarder())
      this.setPosition(new cc.Point(xPos, yPos));
  }
});
Background.ORDER = {
  FIRST:1,
  SECOND: 2,
  THIRD: 3
};

Background.SCROLLING_SPEED = 4.0;
