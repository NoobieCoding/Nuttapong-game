var EnemyType2 = Enemy.extend({
  ctor: function(order) {
    this._super();
    this.initWithPic();
    this.order = order;
    this.initializeFields();
    this.setDifficulty();
  },

  initWithPic: function() {
    this.initWithFile(res.enemy2_png);
  },

  initializeFields: function() {
    this.originalHP = EnemyType2.HP;
    this.hp = this.originalHP;
    this.speed = EnemyType2.SPEED;
    this.score = EnemyType2.SCORE;
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
EnemyType2.SPEED = 20;
EnemyType2.SCORE = 350;
