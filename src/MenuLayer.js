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
    this.addDifficultyOption();
    this.addPressEnterToStartSprite();
  },

  addTitle: function() {
    this.title = new Picture(Picture.PIC.title);
    this.title.setPosition(new cc.Point(MenuLayer.TITLE.xPos, MenuLayer.TITLE.yPos));
    this.addChild(this.title);
  },

  addDifficultyOption: function() {
    this.createDifficultyLabel();
  },

  createDifficultyLabel: function() {
    this.difficultyLabel = new DifficultyLabel();
    this.difficultyLabel.setPosition(new cc.Point(MenuLayer.DIFFICULTY_LABEL.xPos,
    MenuLayer.DIFFICULTY_LABEL.yPos));
    this.addChild(this.difficultyLabel);
  },

  addPressEnterToStartSprite: function() {
    this.pressEnterSprite = new Picture(Picture.PIC.pressEnterPic);
    this.pressEnterSprite.setPosition(new cc.Point(MenuLayer.PRESS_ENTER.xPos,
    MenuLayer.PRESS_ENTER.yPos));
    this.addChild(this.pressEnterSprite);
    this.pressEnterSprite.runAction(cc.RepeatForever.create(new cc.Blink(1, 1)));
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

MenuLayer.DIFFICULTY_LABEL = {
  xPos: GameLayer.SCREENWIDTH / 2,
  yPos: 400
};

MenuLayer.PRESS_ENTER = {
  xPos: GameLayer.SCREENWIDTH / 2,
  yPos: 250
}
