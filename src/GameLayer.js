var GameLayer = cc.LayerColor.extend({
  init: function() {
    this._super(new cc.Color(127, 127, 127, 255));
    this.setPosition(new cc.Point(0, 0));
    this.createObjects();
    this.addKeyboardHandlers();
    this.updateObject();
    this.scheduleUpdate();
    this.keyboardHandler = GameLayer.keyboard;
    this.pauseStat = GameLayer.playStatus.play;
    this.keyboardHandler = GameLayer.keyboardStatus.enable;
    this.bullets = [];
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
    this.createNumberInScoreLabel();
  },

  createHeadLineLabel: function() {
    this.scoreLabel = cc.LabelTTF.create('Score', 'Arial', 50);
    this.scoreLabel.setPosition(new cc.Point(200, GameLayer.SCREENHEIGHT - 60));
    this.addChild(this.scoreLabel, 2);
  },

  createNumberInScoreLabel: function() {
    this.score = 0;
    this.numScoreLabel = cc.LabelTTF.create('0', 'Arial', 50);
    this.numScoreLabel.setPosition(new cc.Point(200, GameLayer.SCREENHEIGHT - 120));
    this.addChild(this.numScoreLabel, 2);
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
        this.shoot();
      else if(keyCode == KEYCODE.P)
        this.pauseGame();
      else if(keyCode == KEYCODE.TEMP)
        this.player.addBarrier();
    }else if(keyCode == KEYCODE.P)
        this.pauseGame();
    //  else if(keyCode == KEYCODE.ESC)
      //  cc.director.popScene(theMenu);
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
    this.checkPlayerCollision();
    this.checkBulletsOutOfScreen();
    this.checkBulletsCollision();
  },

  checkPlayerCollision: function() {
    if(this.isCollide()) {
      this.player.reduceBarrier();
    }
    if(this.player.barrier < 0)
      this.gameOver();
  },

  isCollide: function() {
    if(this.checkHitCondition(this.player))
      return true;
    else
      return false;
  },

  checkHitCondition: function(focusObject) {
    return this.checkHitEnemy(focusObject, this.enemiesType1) ||
    this.checkHitEnemy(focusObject, this.enemiesType2) ||
    this.checkHitEnemy(focusObject, this.enemiesType3)
  },

  checkHitEnemy: function(focusObject,enemies) {
    for(var i = 0; i < enemies.length; i++) {
      if(enemies[i].hit(focusObject) && enemies[i].state == Enemy.STATE.normal) {
        enemies[i].gotDestroyed();
        return true;
      }
    }
    return false;
  },

  checkEnemy1Respawn: function() {
    if(this.enemiesType1[4].y <= GameLayer.RESPAWNY)
      for(var i = 0; i < this.enemiesType1.length; i++) {
        this.enemiesType1[i].canRe = true;
      }
  },

  shoot: function() {
    this.createBullet()
  },

  createBullet: function() {
    var thisBullet = new Bullet();
    thisBullet.setPosition(new cc.Point(this.player.x + addedXForBullet, this.player.y + playerYRadius));
    this.addChild(thisBullet, 2);
    this.bullets.push(thisBullet);
  },

  checkBulletsOutOfScreen: function() {
    for(var i = 0; i < this.bullets.length; i++) {
      this.checkEachBulletOutOfScreen(this.bullets[i]);
    }
  },

  checkEachBulletOutOfScreen: function(bullet) {
    if(bullet != null) {
      if(bullet.y >= bulletOutOfScreenY)
        this.removeBullet(bullet);
    }
  },

  removeBullet: function(bullet) {
    this.removeChild(bullet, true);
    bullet = null;
  },

  checkBulletsCollision: function() {
    if(this.isBulletsCollide()) {
      this.score += 100;
      this.setScore();
    }
  },

  isBulletsCollide: function() {
    for(var i = 0; i < this.bullets.length; i++) {
      if(this.bullets[i] != null) {
        if(this.checkHitCondition(this.bullets[i])) {
          this.removeChild(this.bullets[i], true);
          this.bullets[i] = null;
          return true;
        }
      }
    }
    return false;
  },

  gameOver: function() {
    this.removeChild(this.player, true);
    this.pauseGame();
  },

  reset: function() {
    this.score = 0;
    this.createPlayer();
    this.resetBackgroundsPos();
    this.resetAllEnemiesPos();
    this.resetHealth();
    this.clearObjectsInScreen();
    this.pauseGame();
  },

  resetAllEnemiesPos: function() {
    this.resetEnemiesPos(this.enemiesType1);
    this.resetEnemiesPos(this.enemiesType2);
    this.resetEnemiesPos(this.enemiesType3);
  },

  resetEnemiesPos: function(enemies) {
    for(var i = 0; i < enemie.length; i++) {
      enemies[i].setPos();
    }
  },

  resetBackgroundsPos: function() {
    for(var i = 0; i < this.backgrounds.length; i++) {
      this.backgrounds[i].setPos();
    }
  },

  clearObjectsInScreen: function() {

  },

  resetHealth: function() {
    //this.removeChild(this.player.healthBar);
    this.player.creathBarrierBar();
  },

  setScore: function() {
    this.numScoreLabel.setString(this.score);
  }

});

var GameScene = cc.Scene.extend({
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
  P: 80,
  SPACEBAR: 32,
  ESC: 27,
  TEMP: 192//temp temp temp eiseis
};

GameLayer.playStatus = {
  play: 1,
  pause: 2
};

GameLayer.keyboardStatus = {
  enable: true,
  disable: false
};

var playerYRadius = 120;
var addedXForBullet = 23;
var bulletOutOfScreenY = 1200;
