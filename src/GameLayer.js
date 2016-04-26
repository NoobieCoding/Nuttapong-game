var GameLayer = cc.LayerColor.extend({
  init: function() {
    this._super(new cc.Color(127, 127, 127, 255));
    this.setPosition(new cc.Point(0, 0));
    this.highScore = currentHighScore;
    this.createObjects();
    this.addKeyboardHandlers();
    this.updateObject();
    this.scheduleUpdate();
    this.keyboardHandler = GameLayer.keyboard;
    this.pauseStat = GameLayer.playStatus.play;
    this.keyboardHandler = GameLayer.keyboardStatus.enable;
    this.bullets = [];
    this.bonusItems = [];
    this.timer = 0;
    this.scoreFactor = 1;
    return true;
  },

  createObjects: function() {
    this.createBackgrounds();
    this.createPlayer();
    this.createEnemies();
    this.createScoreLabel();
    this.createHighScoreLabel();
  },

  createBackgrounds: function() {
    this.backgrounds = new Array(3);
    for (var i = 0; i < this.backgrounds.length; i++) {
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
    for (var i = 0; i < this.enemiesType1.length; i++) {
      this.enemiesType1[i] = new EnemyType1(i);
      this.enemiesType1[i].setPos();
      this.addChild(this.enemiesType1[i], 1);
    }
  },

  createEnemyType2: function() {
    this.enemiesType2 = new Array(2);
    for (var i = 0; i < this.enemiesType2.length; i++) {
      this.enemiesType2[i] = new EnemyType2(i + 1);
      this.enemiesType2[i].setPos();
      this.addChild(this.enemiesType2[i], 1);
    }
  },

  createEnemyType3: function() {
    this.enemiesType3 = new Array(2);
    for (var i = 0; i < this.enemiesType3.length; i++) {
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
    this.updateEnemies();
  },

  updateEnemies: function() {
    for (var i = 0; i < this.enemiesType1.length; i++) {
      this.enemiesType1[i].scheduleUpdate();
    }

    for (var i = 0; i < this.enemiesType2.length; i++) {
      this.enemiesType2[i].scheduleUpdate();
      this.enemiesType3[i].scheduleUpdate();
    }
  },

  addKeyboardHandlers: function() {
    this.keys = [];
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
    this.keys[keyCode] = KEYBOARD.keyDown;
    this.doKeysAction(keyCode);

  },

  doKeysAction: function(keyCode) {
    if (this.keys[KEYCODE.R] && this.player.state == Player.DEATH)
      this.resetGame();
    if (this.keyboardHandler == GameLayer.keyboardStatus.enable)
      this.keyActionWhenNotPaused(keyCode);
    else
      this.keyActionWhenPaused(keyCode);
  },

  keyActionWhenNotPaused: function() {
    if (this.keys[KEYCODE.P])
      this.pauseGame();
    if (this.keys[KEYCODE.TEMP])
      this.player.addBarrier();
  },

  keyActionWhenPaused: function() {
    if (this.keys[KEYCODE.P])
        this.pauseGame();
    else if (this.keys[KEYCODE.R]) {
        this.removeChild(this.player);
        this.resetGame();
    }
    else if (this.keys[KEYCODE.ESC]) {
      cc.director.pushScene(new MenuScene());
      this.resetBulletDelay();
      cc.director.resume();
    }
  },

  movementAndShootAction: function() {
    if (this.keyboardHandler == GameLayer.keyboardStatus.enable) {
      this.movementAction();
      if (this.keys[KEYCODE.SPACEBAR])
        this.shoot();
    }
  },

  movementAction: function() {
    if (this.keys[KEYCODE.W])
      this.player.switchDirection(Player.DIR.UP);
    if (this.keys[KEYCODE.D])
      this.player.switchDirection(Player.DIR.RIGHT);
    if (this.keys[KEYCODE.A])
      this.player.switchDirection(Player.DIR.LEFT);
    if(this.keys[KEYCODE.S])
      this.player.switchDirection(Player.DIR.DOWN);
  },

  onKeyUp: function(keyCode, event) {
    this.keys[keyCode] = KEYBOARD.keyReleased;
    this.player.switchDirection(Player.DIR.STILL);
  },

  pauseGame: function() {
    if (this.pauseStat == GameLayer.playStatus.play) {
      cc.director.pause();
      this.pauseStat = GameLayer.playStatus.pause;
      this.keyboardHandler = GameLayer.keyboardStatus.disable;
    } else {
      cc.director.resume();
      this.pauseStat = GameLayer.playStatus.play;
      if(this.player.state == Player.ALIVE)
        this.keyboardHandler = GameLayer.keyboardStatus.enable;
    }
  },

  update: function(dt) {
    this.movementAndShootAction();
    this.checkEnemy1Respawn();
    this.checkPlayerEnemyCollision();
    this.checkBulletsOutOfScreen();
    this.checkBonusItemsOutOfScreen();
    this.isBulletsCollide();
    this.checkBonusItemsCollision();
    this.timer += 1;
  },

  checkPlayerEnemyCollision: function() {
    if (this.isCollide()) {
      this.player.reduceBarrier();
      this.scoreFactor = 1;
    }
    if (this.player.barrier < 0 && this.player.state == Player.ALIVE)
      this.gameOver();
  },

  isCollide: function() {
    if (this.checkHitCondition(this.player))
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
    for (var i = 0; i < enemies.length; i++) {
      if (enemies[i].hit(focusObject) && enemies[i].state == Enemy.STATE.normal) {
        this.enemyIsHit(focusObject, enemies[i]);
        return true;
      }
    }
    return false;
  },

  enemyIsHit: function(focusObject, enemy) {
    if (focusObject instanceof Player)
      enemy.gotDestroyed();
    else {
      enemy.gotHit();
      if (enemy.state == Enemy.STATE.destroyed) {
        this.score = this.score + Math.round(enemy.getScore() * this.scoreFactor);
        this.afterEnemygotDestroyed();
      }
    }
  },

  checkEnemy1Respawn: function() {
    if (this.enemiesType1[4].y <= GameLayer.RESPAWNY)
      for (var i = 0; i < this.enemiesType1.length; i++) {
        this.enemiesType1[i].canRe = true;
      }
  },

  shoot: function() {
    if (this.timer >= GameLayer.bulletDelay) {
      this.createBullet()
      this.timer = 0;
    }
  },

  createBullet: function() {
    var thisBullet = new Bullet();
    thisBullet.setPosition(new cc.Point(this.player.x + addedXForBullet, this.player.y + playerYRadius));
    this.addChild(thisBullet, 2);
    this.bullets.push(thisBullet);
  },

  checkBulletsOutOfScreen: function() {
    for (var i = 0; i < this.bullets.length; i++) {
      this.checkEachBulletOutOfScreen(this.bullets[i]);
    }
  },

  checkEachBulletOutOfScreen: function(bullet) {
    if (bullet != null) {
      if (bullet.y >= bulletOutOfScreenY)
        this.removeObject(bullet);
    }
  },

  removeObject: function(object) {
    this.removeChild(object, true);
    object = null;
  },

  afterEnemygotDestroyed: function() {
      this.randomDropBonusItem();
      this.scoreFactor += 0.2;
      this.checkBeatHighScore();
      this.setScore();
  },

  isBulletsCollide: function() {
    for (var i = this.bullets.indexOf(null); i < this.bullets.length; i++) {
      if (this.bullets[i] != null) {
        if (this.checkHitCondition(this.bullets[i])) {
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
    this.keyboardHandler = GameLayer.keyboardStatus.disable;
    this.player.state = Player.DEATH;
    this.createGameOverText();
    currentHighScore = this.highScore;
    determineDifficultyOfCurrentHighScore();
  },

  resetGame: function() {
    this.keyboardHandler = GameLayer.keyboardStatus.enable;
    cc.director.resume();
    this.player.state = Player.ALIVE;
    this.score = 0;
    this.resetBulletDelay();
    this.removeGameOverText();
    this.setScore();
    this.createPlayer();
    this.resetBackgroundsPos();
    this.resetAllEnemiesPos();
    this.clearObjectsInScreen();
  },

  createGameOverText: function() {
    this.gameOverText = new Picture(Picture.PIC.gameOverPic);
    this.gameOverText.setPosition(new cc.Point(GameLayer.SCREENWIDTH / 2, GameLayer.SCREENHEIGHT / 2));
    this.addChild(this.gameOverText);
  },

  removeGameOverText: function() {
    this.removeChild(this.gameOverText, true);
  },

  resetAllEnemiesPos: function() {
    this.resetEnemiesPos(this.enemiesType1);
    this.resetEnemiesPos(this.enemiesType2);
    this.resetEnemiesPos(this.enemiesType3);
  },

  resetEnemiesPos: function(enemies) {
    for (var i = 0; i < enemies.length; i++) {
      enemies[i].setPos();
    }
  },

  resetBackgroundsPos: function() {
    for (var i = 0; i < this.backgrounds.length; i++) {
      this.backgrounds[i].setPos();
    }
  },

  clearObjectsInScreen: function() {
    this.clearBullets();
    this.clearBonusItems();
  },

  clearBullets: function() {
    for (var i = 0; i < this.bullets.length;i++) {
      this.removeChild(this.bullets[i], true);
    }
    this.bullets = [];
  },

  clearBonusItems: function(){
    for (var i = 0; i < this.bonusItems.length;i++) {
      this.removeChild(this.bonusItems[i], true);
    }
    this.bonusItems = [];
  },

  setScore: function() {
    this.numScoreLabel.setString(this.score);
  },

  randomDropBonusItem: function() {
    var range = 6;
    var min = 1;
    var randomValue = random(range, min);
    if (randomValue == 1)
      this.dropBonusItem();
  },

  dropBonusItem: function() {
    var bonusItem = new BonusItem();
    bonusItem.setPlayer(this.player);
    this.addChild(bonusItem);
    this.bonusItems.push(bonusItem);
  },

  checkBonusItemsOutOfScreen: function() {
    for (var i = 0; i < this.bonusItems.length; i++) {
      this.checkEachBonusItemsOutOfScreen(this.bonusItems[i]);
    }
  },

  checkEachBonusItemsOutOfScreen: function(bonusItem) {
    if (bonusItem != null) {
      if (bonusItem.y <= bonusItemOutOfScreenY)
        this.removeObject(bonusItem);
    }
  },

  checkBonusItemsCollision: function() {
    for (var i = this.bonusItems.indexOf(null); i < this.bonusItems.length;i++) {
      if (this.bonusItems[i] != null)
        this.bonusItems[i] = this.checkEachBonusItemCollision(this.bonusItems[i]);
    }
  },

  checkEachBonusItemCollision: function(bonusItem) {
    if (bonusItem.hit(this.player)) {
      bonusItem.applyEffect();
      this.removeChild(bonusItem, true);
      bonusItem = null;
    }
    return bonusItem;
  },

  createHighScoreLabel: function() {
    this.createHighScoreHeadLineLabel();
    this.createHighScoreNumberLabel();
  },

  createHighScoreHeadLineLabel: function() {
    this.highScoreHeadLineLabel = new cc.LabelTTF.create('High score', 'Arial', 50);
    this.highScoreHeadLineLabel.setPosition(new cc.Point(GameLayer.HIGH_SCORE.xPos,
    GameLayer.HIGH_SCORE.yPos));
    this.addChild(this.highScoreHeadLineLabel,2);
  },

  createHighScoreNumberLabel: function() {
    this.highScoreNumberLabel = new cc.LabelTTF.create(this.highScore+'', 'Arial', 50);
    this.highScoreNumberLabel.setPosition(new cc.Point(GameLayer.HIGH_SCORE.xPos,
    GameLayer.HIGH_SCORE.yPos - GameLayer.HIGH_SCORE.gap));
    this.addChild(this.highScoreNumberLabel,2);
  },

  checkBeatHighScore: function() {
    if (this.score > this.highScore) {
      this.highScore = this.score;
      this.highScoreNumberLabel.setString(this.highScore);
    }
  },

  resetBulletDelay: function() {
    GameLayer.bulletDelay = 5;
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
GameLayer.RESPAWNY = -300;

var KEYCODE = {
  A: 65,
  W: 87,
  S: 83,
  D: 68,
  P: 80,
  R: 82,
  SPACEBAR: 32,
  ESC: 27,
  TEMP: 192
};

GameLayer.playStatus = {
  play: 1,
  pause: 2
};

GameLayer.keyboardStatus = {
  enable: true,
  disable: false
};

GameLayer.HIGH_SCORE = {
  xPos: 500,
  yPos: GameLayer.SCREENHEIGHT - 60,
  gap: 60
};

GameLayer.bulletDelay = 5;
var KEYBOARD = {
  keyDown: true,
  keyReleased: false
};

var playerYRadius = 120;
var addedXForBullet = 23;
var bulletOutOfScreenY = 1200;
var bonusItemOutOfScreenY = -100;
