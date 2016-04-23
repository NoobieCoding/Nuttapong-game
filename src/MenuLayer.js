var MenuLayer = cc.LayerColor.extend({
  init: function() {
    this._super(new cc.Color(126, 0, 122, 255));
    this.setPosition(new cc.Point(0, 0));
    this.addKeyboardHandlers();
    this.addComponents();
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

  addComponents: function() {
    this.addTitle();
    this.addPressEnterToStartSprite();
  },

  addTitle: function() {
    this.title = new Picture(Picture.PIC.title);
    this.title.setPosition(new cc.Point(MenuLayer.TITLE.xPos, MenuLayer.TITLE.yPos));
    this.addChild(this.title);
  },

  addPressEnterToStartSprite: function() {

  }
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

MenuLayer.TITLE = {
  xPos: GameLayer.SCREENWIDTH / 2,
  yPos: 750
};
