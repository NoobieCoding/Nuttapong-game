var GameOverText = cc.Sprite.extend({
  ctor: function() {
    this._super();
    this.initWithFile('res/images/gameovertext.png');
    this.setPosition(new cc.Point(GameLayer.SCREENWIDTH / 2, GameLayer.SCREENHEIGHT / 2));
  }
});
