var GameLayer = cc.LayerColor.extend({
  init: function() {
    this._super(new cc.Color( 127, 127, 127, 255));
    this.setPosition(new cc.Point(0, 0 ));

    this.player = new Player();
    this.player.setPosition(new cc.Point(GameLayer.SCREENWIDTH / 2,
    GameLayer.STARTPOSY));
    this.addChild(this.player, 1);

    this.enemiesType1 = new Array(5);// temp
    this.enemiesType2 = new Array(2);
    this.enemiesType2[0] = new EnemyType2();
    this.enemiesType2[0].setPosition(GameLayer.ENEMY2LANE.XLEFTSIDE,
    GameLayer.ENEMY2LANE.YPOSITION);
    this.addChild(this.enemiesType2[0]);
    this.enemiesType2[1] = new EnemyType2();
    this.enemiesType2[1].setPosition(1800, 1000);
    this.addChild(this.enemiesType2[1]);

    var range = GameLayer.ENEMY2LANE.XRIGHTSIDE - GameLayer.ENEMY2LANE.XLEFTSIDE;
    var min = GameLayer.ENEMY2LANE.XLEFTSIDE;
    console.log(range);
    for(var i = 0; i < this.enemiesType1.length; i++) {
      this.enemiesType1[i] = new EnemyType1();
      var randomPosX = Math.floor(Math.random() * (range + 1)) + min;
      this.enemiesType1[i].setPosition(new cc.Point(randomPosX,
      GameLayer.ENEMY1.FIRST_ENEMY_POSY + (i * GameLayer.ENEMY1.GAP_PER_ENEMIY)));
      this.addChild(this.enemiesType1[i]);
    }

    this.enemiesType3 = new Array(2);
    this.enemiesType3[0] = new EnemyType3();
    this.enemiesType3[0].setPosition(GameLayer.ENEMY3.FIRST_ENEMY_POSX,
    GameLayer.ENEMY3.POSY);
    this.addChild(this.enemiesType3[0]);
    this.enemiesType3[1] = new EnemyType3();
    this.enemiesType3[1].setPosition(GameLayer.ENEMY3.SECOND_ENEMY_POSX,
    GameLayer.ENEMY3.POSY);
    this.addChild(this.enemiesType3[1]);

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

GameLayer.SCREENWIDTH = 1920;
GameLayer.STARTPOSY = 150;

GameLayer.ENEMY2LANE = {
  XLEFTSIDE: 100,
  XRIGHTSIDE: 1800,
  YPOSITION: 1000
};

GameLayer.ENEMY1 = {
  FIRST_ENEMY_POSY: 700,
  GAP_PER_ENEMIY: 200
};

GameLayer.ENEMY3 = {
  FIRST_ENEMY_POSX: 200,
  SECOND_ENEMY_POSX: 1700,
  POSY: 700
};
