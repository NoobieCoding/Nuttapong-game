var GameLayer = cc.LayerColor.extend({
  init: function() {
    this._super(new cc.Color( 127, 127, 127, 255));
    this.setPosition(new cc.Point(0, 0 ));
    this.player = new Player();
    this.player.setPosition(new cc.Point(screenWidth / 2, startPositionY));
    this.addChild(this.player, 1);
    return true;
  }
});

var StartScene = cc.Scene.extend({
  onEnter: function() {
    this._super();
    var layer = new GameLayer();
    layer.init();
    this.addChild( layer );
  }
});

var screenWidth = 1920;
var startPositionY = 100;
