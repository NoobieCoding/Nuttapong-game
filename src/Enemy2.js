var EnemyType2 = Enemy.extend({
  ctor: function() {
    this._super();
    this.initWithFile('res/images/enemy2.png' );
    this.speed = 15;
  },

  setPos: function(thisEnemyOrder) {
    if(thisEnemyOrder == 1)  {
      this.setPosition(EnemyType2.ENEMY2LANE.XLEFTSIDE, EnemyType2.ENEMY2LANE.YPOSITION);
    } else {
      this.setPosition(EnemyType2.ENEMY2LANE.XRIGHTSIDE, EnemyType2.ENEMY2LANE.YPOSITION);
    }
  },

  update: function(dt) {
    this.y -= this.speed;
    this.setPosition(new cc.Point(this.x, this.y));
  }
});

EnemyType2.ENEMY2LANE = {
  XLEFTSIDE: 100,
  XRIGHTSIDE: 1820,
  YPOSITION: 2000
};
