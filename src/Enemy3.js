var EnemyType3 = Enemy.extend({
  ctor: function(thisEnemyOrder) {
    this._super();
    this.initWithFile('res/images/enemy3.png' );
    this.order = thisEnemyOrder;
    this.speed = 12;
    this.xSpeed = 12;

    if(this.order == 1)
      this.side = EnemyType3.LANESIDE.LEFT;
    else
      this.side = EnemyType3.LANESIDE.RIGHT;
},

  setPos: function() {
    if(this.order == 1)  {
      this.setPosition(EnemyType3.ENEMY3.FIRST_ENEMY_POSX, EnemyType3.ENEMY3.POSY);
    } else {
      this.setPosition(EnemyType3.ENEMY3.SECOND_ENEMY_POSX, EnemyType3.ENEMY3.POSY);
    }
  },

  update: function(dt) {
    this.changePosition();
    this.setPosition(new cc.Point(this.x, this.y));
    this.checkBounce();
    if(this.y <= -8000)
      this.rePosition();
  },

  changePosition: function() {
    this.y -= this.speed;
    this.changeXPosition();
  },

  changeXPosition: function() {
    if(this.side == EnemyType3.LANESIDE.LEFT)
      this.x += this.xSpeed;
    else
      this.x -= this.xSpeed;
  },

  rePosition: function() {
    if(this.checkRespawnable()) {
      this.setPos();
    }
  },

  checkRespawnable: function() {
    return true; //temp
  },

  checkBounce: function() {
    if(this.x <= EnemyType3.BOARDER.LEFT) {
      this.side = EnemyType3.LANESIDE.LEFT;
    }
    if(this.x >= EnemyType3.BOARDER.RIGHT)
      this.side = EnemyType3.LANESIDE.RIGHT;
  }
});

EnemyType3.ENEMY3 = {
  FIRST_ENEMY_POSX: 200,
  SECOND_ENEMY_POSX: 1720,
  POSY: 1500
};

EnemyType3.LANESIDE = {
  LEFT: 1,
  RIGHT: 2
};

EnemyType3.BOARDER = {
  LEFT: 300,
  RIGHT: 1620
};
