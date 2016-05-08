var MenuLayer = cc.LayerColor.extend({
  init: function() {
    this._super(new cc.Color(126, 0, 122, 255));
    this.setPosition(new cc.Point(0, 0));
    this.addKeyboardHandlers();
    this.addComponents();
    cc.audioEngine.stopMusic();
    this.playBGM();
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
      if (keyCode === MenuLayer.ENTER)
        cc.director.pushScene(new GameScene());
      else if (keyCode === MenuLayer.HKEY)
        this.instruction.openOrClose();
  },

  addComponents: function() {
    this.addBackground();
    this.addTitle();
    this.addDifficultyOption();
    this.addPressEnterToStartSprite();
    this.addSoundOption();
    this.addHowtoPlaySprite();
    this.addHighScoreLabel(DIFFICULTY.easy);
    this.addHighScoreLabel(DIFFICULTY.normal);
    this.addInstruction();
  },

  addBackground: function() {
    this.background = new Background(Background.ORDER.menuBackground);
    this.background.setPos();
    this.addChild(this.background);
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

  addHighScoreLabel: function(difficulty) {
    if (difficulty === DIFFICULTY.easy) {
      this.createEasyHighScoreHeadLineLabel();
      this.createEasyHighScoreNumberLabel();
    } else if (difficulty === DIFFICULTY.normal) {
      this.createNormalHighScoreHeadLineLabel();
      this.createNormalHighScoreNumberLabel();
    }
  },

  createEasyHighScoreHeadLineLabel: function() {
    this.easyHighScoreHeadLineLabel = new cc.LabelTTF.create('High score [Easy]', 'Arial', 50);
    this.easyHighScoreHeadLineLabel.setPosition(new cc.Point(MenuLayer.HIGH_SCORE.easyXPos,
    MenuLayer.HIGH_SCORE.yPos));
    this.easyHighScoreHeadLineLabel.setColor(new cc.Color(136, 191, 28, 255));
    this.addChild(this.easyHighScoreHeadLineLabel);
  },

  createEasyHighScoreNumberLabel: function() {
    this.easyHighScoreNumberLabel = new cc.LabelTTF.create(easyHighScore + '', 'Arial', 60);
    this.easyHighScoreNumberLabel.setPosition(new cc.Point(MenuLayer.HIGH_SCORE.easyXPos,
    MenuLayer.HIGH_SCORE.yPos - MenuLayer.HIGH_SCORE.gap));
    this.easyHighScoreNumberLabel.setColor(new cc.Color(194, 229, 31, 255));
    this.addChild(this.easyHighScoreNumberLabel);
  },

  createNormalHighScoreHeadLineLabel: function() {
    this.normalHighScoreHeadLineLabel = new cc.LabelTTF.create('High score [Normal]', 'Arial', 50);
    this.normalHighScoreHeadLineLabel.setPosition(new cc.Point(MenuLayer.HIGH_SCORE.normalXPos,
    MenuLayer.HIGH_SCORE.yPos));
    this.normalHighScoreHeadLineLabel.setColor(new cc.Color(202, 34, 56, 255));
    this.addChild(this.normalHighScoreHeadLineLabel);
  },

  createNormalHighScoreNumberLabel: function() {
    this.normalHighScoreNumberLabel = new cc.LabelTTF.create(normalHighScore + '', 'Arial', 60);
    this.normalHighScoreNumberLabel.setPosition(new cc.Point(MenuLayer.HIGH_SCORE.normalXPos,
    MenuLayer.HIGH_SCORE.yPos - MenuLayer.HIGH_SCORE.gap));
    this.normalHighScoreNumberLabel.setColor(new cc.Color(213, 20, 78, 255));
    this.addChild(this.normalHighScoreNumberLabel);
  },

  addInstruction: function() {
    this.instruction = new Instruction();
    this.addChild(this.instruction);
  },

  playBGM: function() {
    setVolume(0.25);
    playMusic(res.menuBGM_mp3);
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
  xPos: 350,
  yPos: 200
};

MenuLayer.HIGH_SCORE = {
  easyXPos: 300,
  normalXPos: 1620,
  yPos: 1000,
  gap: 60
};

MenuLayer.ENTER = 13;
MenuLayer.HKEY = 72;
