var GameLayer = cc.LayerColor.extend({
  init: function() {
    this._super(new cc.Color( 127, 127, 127, 255));
    this.setPosition(new cc.Point(0, 0 ));
    this.createObjects();
    this.addKeyboardHandlers();
    this.updateObject();
    this.scheduleUpdate();
    this.pauseStat = GameLayer.playStatus.play;
    this.keyboardHandler = GameLayer.keyboardStatus.enable;
    return true;
  },

  createObjects: function() {
    this.createBackgrounds();
    this.createPlayer();
    this.createEnemies();
    this.createScoreLabel();
  },

  createBackgrounds: function() {
    this.backgrounds = new Array(3);
    for(var i = 0; i < this.backgrounds.length; i++) {
      this.backgrounds[i] = new Background(i + 1);
      this.backgrounds[i].setPos();
      this.addChild(this.backgrounds[i], 0);
      this.backgrounds[i].scheduleUpdate();
    }
  },

  createPlayer: function() {
    this.player = new Player();
    var xPos = GameLayer.SCREENWIDTH / 2;
    var yPos = GameLayer.STARTPOSY;
    this.player.setPosition(new cc.Point(xPos, yPos));
    this.addChild(this.player, 1);
  },

  createEnemies: function() {
    this.createEnemyType1();
    this.createEnemyType2();
    this.createEnemyType3();
  },

  createEnemyType1: function() {
    this.enemiesType1 = new Array(5);
    for(var i = 0; i < this.enemiesType1.length; i++) {
      this.enemiesType1[i] = new EnemyType1(i);
      this.enemiesType1[i].setPos();
      this.addChild(this.enemiesType1[i], 1);
    }
  },

  createEnemyType2: function() {
    this.enemiesType2 = new Array(2);
    for(var i = 0; i < this.enemiesType2.length; i++) {
      this.enemiesType2[i] = new EnemyType2(i + 1);
      this.enemiesType2[i].setPos();
      this.addChild(this.enemiesType2[i], 1);
    }
  },

  createEnemyType3: function() {
    this.enemiesType3 = new Array(2);
    for(var i = 0; i < this.enemiesType3.length; i++) {
      this.enemiesType3[i] = new EnemyType3(i + 1);
      this.enemiesType3[i].setPos();
      this.addChild(this.enemiesType3[i], 1);
    }
  },

  createScoreLabel: function() {
    this.createHeadLineLabel();
    this.scoreLabel = cc.LabelTTF.create('0', 'Arial', 50);
    this.scoreLabel.setPosition(new cc.Point(200, GameLayer.SCREENHEIGHT - 120));
    this.addChild(this.scoreLabel, 2);
  },

  createHeadLineLabel: function() {
    this.scoreLabel = cc.LabelTTF.create('Score', 'Arial', 50);
    this.scoreLabel.setPosition(new cc.Point(200, GameLayer.SCREENHEIGHT - 60));
    this.addChild(this.scoreLabel, 2);
  },

  updateObject: function() {
    this.player.scheduleUpdate();
    this.updateEnemies();
  },

  updateEnemies: function() {
    for(var i = 0; i < this.enemiesType1.length; i++) {
      this.enemiesType1[i].scheduleUpdate();
    }

    for(var i = 0; i < this.enemiesType2.length; i++) {
      this.enemiesType2[i].scheduleUpdate();
      this.enemiesType3[i].scheduleUpdate();
    }
  },

  addKeyboardHandlers: function() {
    var self = this;
    cc.eventManager.addListener({
      event: cc.EventListener.KEYBOARD,
      onKeyPressed : function(keyCode, event) {
        self.onKeyDown(keyCode, event);
      },
      onKeyReleased: function(keyCode, event) {
        self.onKeyUp(keyCode, event);
      }
    }, this);
  },

  onKeyDown: function(keyCode, event) {
    if(this.keyboardHandler == GameLayer.keyboardStatus.enable) {
      if (keyCode == KEYCODE.W)
        this.player.switchDirection(Player.DIR.UP);
      else if (keyCode == KEYCODE.D)
        this.player.switchDirection(Player.DIR.RIGHT);
      else if (keyCode == KEYCODE.A)
        this.player.switchDirection(Player.DIR.LEFT);
      else if(keyCode == KEYCODE.S)
        this.player.switchDirection(Player.DIR.DOWN);
      else if(keyCode == KEYCODE.SPACEBAR)
        this.pauseGame();
    }else if(keyCode == KEYCODE.SPACEBAR)
        this.pauseGame();
  },

  onKeyUp: function(keyCode, event) {
    this.player.switchDirection(Player.DIR.STILL);
  },

  pauseGame: function() {
    if(this.pauseStat == GameLayer.playStatus.play) {
      cc.director.pause();
      this.pauseStat = GameLayer.playStatus.pause;
      this.keyboardHandler = GameLayer.keyboardStatus.disable;
    } else {
      cc.director.resume();
      this.pauseStat = GameLayer.playStatus.play;
      this.keyboardHandler = GameLayer.keyboardStatus.enable;
    }
  },

  update: function(dt) {
    this.checkEnemy1Respawn();
  },

  checkEnemy1Respawn: function() {
    if(this.enemiesType1[4].y <= GameLayer.RESPAWNY)
      for(var i = 0; i < this.enemiesType1.length; i++) {
        this.enemiesType1[i].canRe = true;
      }
  },

});

var StartScene = cc.Scene.extend({
  onEnter: function() {
    this._super();
    var layer = new GameLayer();
    layer.init();
    this.addChild(layer);
  }
});

GameLayer.SCREENWIDTH = 1920;
GameLayer.SCREENHEIGHT = 1080;
GameLayer.STARTPOSY = 150;
GameLayer.RESPAWNY = -800;

var KEYCODE = {
  A: 65,
  W: 87,
  S: 83,
  D: 68,
  SPACEBAR: 32
};

GameLayer.playStatus = {
  play: 1,
  pause: 2
};

GameLayer.keyboardStatus = {
  enable: true,
  disable: false
};
