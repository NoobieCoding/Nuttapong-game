var MenuLayer = cc.LayerColor.extend({
  init: function() {
    this._super(new cc.Color(126, 0, 122, 255));
    this.setPosition(new cc.Point(0, 0));
    this.addKeyboardHandlers();
  },

  addKeyboardHandlers: function() {
    var self = this;
    cc.eventManager.addListener({
      event: cc.EventListener.KEYBOARD,
      onKeyPressed : function(keyCode, event) {
        self.onKeyDown(keyCode, event);
      },
    }, this);
  },

  onKeyDown: function(keyCode, event) {
      if (keyCode == ENTER) {
        cc.director.pushScene(new GameScene());
      }
  },
});

var MenuScene = cc.Scene.extend({
  onEnter: function() {
    this._super();
    var layer = new MenuLayer();
    layer.init();
    this.addChild(layer);
  }
});
var ENTER = 13;
