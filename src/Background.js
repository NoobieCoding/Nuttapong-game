var Background = cc.Sprite.extend({
  ctor: function(order) {
    this._super();
    this.order = order
    this.initFiles();
  },

  initFiles: function() {
    switch(this.order) {
    case Background.ORDER.FIRST:
      this.initWithFile('res/images/background1.png' );
      break;
    case Background.ORDER.SECOND:
      this.initWithFile('res/images/background2.png' );
      break;
    case Background.ORDER.THIRD:
      this.initWithFile('res/images/background3.png' );
      break;
    }
  },

  update: function(dt) {
    this.y -= Background.SCROLLING_SPEED;
    this.rePosition();
  },

    checkOutOfBoarder: function() {
      return this.y <= - (GameLayer.SCREENHEIGHT / 2);
    },

    rePosition: function() {
      if(this.checkOutOfBoarder()) {
        this.setPosition(new cc.Point(GameLayer.SCREENWIDTH / 2,
        GameLayer.SCREENHEIGHT * 5 / 2));
      }
    }
});
Background.ORDER = {
  FIRST:1,
  SECOND: 2,
  THIRD: 3
};

Background.SCROLLING_SPEED = 4.0;
