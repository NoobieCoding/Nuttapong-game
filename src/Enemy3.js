var EnemyType3 = Enemy.extend({
  ctor: function(thisEnemyOrder) {
    this._super();
    this.initWithFile('res/images/enemy3.png');
    this.order = thisEnemyOrder;
    this.originalHP = EnemyType3.HP;
    this.hp = this.originalHP;
    this.speed = 10;
    this.xSpeed = 20;
    this.determineSide();
    this.setDifficulty();
  },

  determineSide: function() {
    if(this.order == 1)
      this.side = EnemyType3.LANESIDE.LEFT;
    else
      this.side = EnemyType3.LANESIDE.RIGHT;
  },

  setPos: function() {
    if(this.order == 1)
      this.setPosition(EnemyType3.LANEPOS.FIRST_ENEMY_POSX, EnemyType3.LANEPOS.START_POSY);
    else
      this.setPosition(EnemyType3.LANEPOS.SECOND_ENEMY_POSX, EnemyType3.LANEPOS.START_POSY);

  },

  update: function(dt) {
    this.changePosition();
    this.setPosition(new cc.Point(this.x, this.y));
    this.checkBounce();
    if(this.y <= EnemyType3.LANEPOS.RE_POSY)
      this.rePosition();
  },

  changeXPosition: function() {
    if(this.side == EnemyType3.LANESIDE.LEFT)
      this.x += this.xSpeed;
    else
      this.x -= this.xSpeed;
  },

  checkBounce: function() {
    if(this.x <= EnemyType3.BOARDER.LEFT)
      this.side = EnemyType3.LANESIDE.LEFT;

    if(this.x >= EnemyType3.BOARDER.RIGHT)
      this.side = EnemyType3.LANESIDE.RIGHT;
  }
});

EnemyType3.LANEPOS = {
  FIRST_ENEMY_POSX: 200,
  SECOND_ENEMY_POSX: 1720,
  START_POSY: 2200,
  RE_POSY: -4000

};

EnemyType3.LANESIDE = {
  LEFT: 1,
  RIGHT: 2
};

EnemyType3.BOARDER = {
  LEFT: 300,
  RIGHT: 1620
};

EnemyType3.HP = 10;
