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
      if (keyCode == ENTER)
        cc.director.pushScene(new GameScene());
      else if(keyCode == MenuLayer.HKEY)
        this.showMessageBox();
  },

  addComponents: function() {
    this.addTitle();
    this.addDifficultyOption();
    this.addPressEnterToStartSprite();
    this.addSoundOption();
    this.addHowtoPlaySprite();
  },

  addTitle: function() {
    this.title = new Picture(Picture.PIC.titlePic);
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
  },

  addSoundOption: function() {
    this.soundOption = new Picture(Picture.PIC.soundOptionPic);
    this.soundOption.setPosition(new cc.Point(MenuLayer.SOUND_OPTION.xPos,
    MenuLayer.SOUND_OPTION.yPos));
    this.addChild(this.soundOption);
    this.soundOption.addMouseListener();
  },

  addHowtoPlaySprite: function() {
    this.howToPlaySprite = new Picture(Picture.PIC.howToPlayPic);
    this.howToPlaySprite.setPosition(new cc.Point(MenuLayer.HOW_TO_PIC.xPos,
    MenuLayer.HOW_TO_PIC.yPos));
    this.addChild(this.howToPlaySprite);
  },

  showMessageBox: function() {
    alert('-Press AWSD to move the player \n'
        + '-Press SPACEBAR to shoot \n'
        + '-Press P to pause or resume the game \n'
        + '-When the game is pause press R to restart or ESC to exit to menu screen \n'
        + '-You can change the difficulty of the game by clicking at the difficulty text below title \n'
        + '-You can click at sound icon to turn on/off the sound');
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
};

MenuLayer.SOUND_OPTION = {
  xPos: 1820,
  yPos: 50
};

MenuLayer.HOW_TO_PIC = {
    xPos: 300,
    yPos: 800
};

MenuLayer.HKEY = 72;
