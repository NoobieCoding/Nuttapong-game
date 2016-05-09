var EnemyType3 = Enemy.extend({
  ctor: function(thisEnemyOrder) {
    this._super();
    this.initWithPic();
    this.order = thisEnemyOrder;
    this.originalHP = EnemyType3.HP;
    this.hp = this.originalHP;
    this.speed = 10;// magic number
    this.xSpeed = 20;// magic number
    this.score = 250;// magic number
    this.determineSide();
    this.setDifficulty();
  },

  initWithPic: function() {
    this.initWithFile(res.enemy3_png);
  },

  determineSide: function() {
    if (this.order === 1) {
      this.side = EnemyType3.LANESIDE.LEFT;
        this.initWithFile(res.enemy3_png);
    } else {
      this.side = EnemyType3.LANESIDE.RIGHT;
      this.initWithFile(res.enemy3_2_png);
    }
  },

  setPos: function() {
    if (this.order === 1)
      this.setPosition(EnemyType3.LANEPOS.FIRST_ENEMY_POSX, EnemyType3.LANEPOS.START_POSY);
    else
      this.setPosition(EnemyType3.LANEPOS.SECOND_ENEMY_POSX, EnemyType3.LANEPOS.START_POSY);

  },

  update: function(dt) {
    this.explosionTimer += 1;
    this.changePosition();
    this.checkEnemyInvisible();
    this.setPosition(new cc.Point(this.x, this.y));
    this.checkBounce();
    if (this.y <= EnemyType3.LANEPOS.RE_POSY) {
      this.rePosition();
      this.determineSide();
    }
  },

  changeXPosition: function() {
    if (this.side === EnemyType3.LANESIDE.LEFT)
      this.x += this.xSpeed;
    else
      this.x -= this.xSpeed;
  },

  checkBounce: function() {
    if (this.x <= EnemyType3.BOARDER.LEFT) {
      this.side = EnemyType3.LANESIDE.LEFT;
      this.flip();
    }  else if (this.x >= EnemyType3.BOARDER.RIGHT) {
      this.side = EnemyType3.LANESIDE.RIGHT;
      this.flip();
    }
  },

  flip: function() {
    if(!this.flippedX)
      this.flippedX = true;
    else
      this.flippedX = false;
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

EnemyType3.HP = 3;
