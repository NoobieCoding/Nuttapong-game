var EnemyType2 = Enemy.extend({
  ctor: function(order) {
    this._super();
    this.initWithPic();
    this.originalHP = EnemyType2.HP;
    this.hp = this.originalHP;
    this.speed = 20;// magic number
    this.order = order;
    this.score = 350;// magic number
    this.setDifficulty();
  },

  initWithPic: function() {
    this.initWithFile(res.enemy2_png);
  },

  setPos: function() {
    if (this.order === 1)
      this.setPosition(EnemyType2.LANE.XLEFTSIDE, EnemyType2.LANE.YPOSITION);
    else
      this.setPosition(EnemyType2.LANE.XRIGHTSIDE, EnemyType2.LANE.YPOSITION);
  },

  update: function(dt) {
    this.explosionTimer += 1;
    this.changePosition();
    this.checkEnemyInvisible();
    if (this.y <= EnemyType2.LANE.YREPOSITION)
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
EnemyType2.HP = 14;
