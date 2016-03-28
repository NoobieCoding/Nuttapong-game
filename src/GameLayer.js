var GameLayer = cc.LayerColor.extend({
  init: function() {
    this._super(new cc.Color( 127, 127, 127, 255));
    this.setPosition(new cc.Point(0, 0 ));
    this.player = new Player();
    this.player.setPosition(new cc.Point(screenWidth / 2, startPositionY));
    this.addChild(this.player, 1);
    this.enemiesType1 = new Array(5);// temp
    this.enemiesType2 = new Array(2);
    this.enemiesType2[0] = new EnemyType2();
    this.enemiesType2[0].setPosition(100, 1000);
    this.addChild(this.enemiesType2[0]);
    this.enemiesType2[1] = new EnemyType2();
    this.enemiesType2[1].setPosition(1800, 1000);
    this.addChild(this.enemiesType2[1]);
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

var screenWidth = 1920;
var startPositionY = 150;
