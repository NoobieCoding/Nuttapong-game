var GameLayer = cc.LayerColor.extend({
  init: function() {
    this._super(new cc.Color( 127, 127, 127, 255));
    this.setPosition(new cc.Point(0, 0 ));

    this.createPlayer();

    this.createEnemyType1();

    this.createEnemyType2();

    this.createEnemyType3();

    this.player.scheduleUpdate();
    this.addKeyboardHandlers();

    return true;
  },

  createPlayer: function() {
    this.player = new Player();
    this.player.setPosition(new cc.Point(GameLayer.SCREENWIDTH / 2,
    GameLayer.STARTPOSY));
    this.addChild(this.player, 1);
  },

  createEnemyType1: function() {
    this.enemiesType1 = new Array(5);// temp
    for(var i = 0; i < this.enemiesType1.length; i++) {
      this.enemiesType1[i] = new EnemyType1();
      var randomPosX = Math.floor(Math.random() * (range + 1)) + min;
      this.enemiesType1[i].setPos(i);
      this.addChild(this.enemiesType1[i]);
    }
  },

  createEnemyType2: function() {
    this.enemiesType2 = new Array(2);
    this.enemiesType2[0] = new EnemyType2();
    this.enemiesType2[0].setPos(1);
    this.addChild(this.enemiesType2[0]);

    this.enemiesType2[1] = new EnemyType2();
    this.enemiesType2[1].setPos(2);
    this.addChild(this.enemiesType2[1]);
  },

  createEnemyType3: function() {
    this.enemiesType3 = new Array(2);
    this.enemiesType3[0] = new EnemyType3();
    this.enemiesType3[0].setPos(1);
    this.addChild(this.enemiesType3[0]);

    this.enemiesType3[1] = new EnemyType3();
    this.enemiesType3[1].setPos(2);
    this.addChild(this.enemiesType3[1]);
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
    if (keyCode == KEYCODE.W)
      this.player.switchDirection(Player.DIR.UP);
    else if (keyCode == KEYCODE.D)
      this.player.switchDirection(Player.DIR.RIGHT);
    else if (keyCode == KEYCODE.A)
      this.player.switchDirection(Player.DIR.LEFT);
    else if(keyCode == KEYCODE.S)
      this.player.switchDirection(Player.DIR.DOWN);
  },

  onKeyUp: function(keyCode, event) {
    this.player.switchDirection(Player.DIR.STILL);
  },
});

var StartScene = cc.Scene.extend({
  onEnter: function() {
    this._super();
    var layer = new GameLayer();
    layer.init();
    this.addChild( layer );
  }
});

GameLayer.SCREENWIDTH = 1920;
GameLayer.SCREENHEIGHT = 1080;
GameLayer.STARTPOSY = 150;

var KEYCODE = {
  A: 65,
  W: 87,
  S: 83,
  D: 68
};
