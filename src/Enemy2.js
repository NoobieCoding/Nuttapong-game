var EnemyType2 = Enemy.extend({
  ctor: function(order) {
    this._super();
    this.initWithFile('res/images/enemy2.png');
    this.originalHP = EnemyType2.HP;
    this.hp = this.originalHP;
    this.speed = 20;
    this.order = order;
    this.setDifficulty();
  },

  setPos: function() {
    if(this.order == 1)
      this.setPosition(EnemyType2.LANE.XLEFTSIDE, EnemyType2.LANE.YPOSITION);
    else
      this.setPosition(EnemyType2.LANE.XRIGHTSIDE, EnemyType2.LANE.YPOSITION);
  },

  update: function(dt) {
    this.changePosition();
    if(this.y <= EnemyType2.LANE.YREPOSITION)
      this.rePosition();
  },

  changePosition: function() {
    this.y -= this.speed;
    this.setPosition(new cc.Point(this.x, this.y));
  },

});

EnemyType2.LANE = {
  XLEFTSIDE: 100,
  XRIGHTSIDE: 1820,
  YPOSITION: 2500,
  YREPOSITION: -300
};
EnemyType2.HP = 7;
