var EnemyType2 = Enemy.extend({
  ctor: function(order) {
    this._super();
    this.initWithFile('res/images/enemy2.png');
    this.speed = 15;
    this.order = order;
  },

  setPos: function() {
    if(this.order == 1)  {
      this.setPosition(EnemyType2.LANE.XLEFTSIDE, EnemyType2.LANE.YPOSITION);
    } else {
      this.setPosition(EnemyType2.LANE.XRIGHTSIDE, EnemyType2.LANE.YPOSITION);
    }
  },

  update: function(dt) {
    this.y -= this.speed;
    this.setPosition(new cc.Point(this.x, this.y));
    if(this.y <= EnemyType2.LANE.YREPOSITION)
      this.rePosition();
  },

  rePosition: function() {
    if(this.checkRespawnable()) {
      this.setPos();
    }
  },

  checkRespawnable: function() {
    return true; //temp
  }
});

EnemyType2.LANE = {
  XLEFTSIDE: 100,
  XRIGHTSIDE: 1820,
  YPOSITION: 2500,
  YREPOSITION: -300
};
