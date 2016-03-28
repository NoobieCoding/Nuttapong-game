var EnemyType3 = Enemy.extend({
  ctor: function() {
    this._super();
    this.initWithFile('res/images/enemy3.png' );
  },

  setPos: function(thisEnemyOrder) {
    if(thisEnemyOrder == 1)  {
      this.setPosition(EnemyType3.ENEMY3.FIRST_ENEMY_POSX, EnemyType3.ENEMY3.POSY);
    } else {
      this.setPosition(EnemyType3.ENEMY3.SECOND_ENEMY_POSX, EnemyType3.ENEMY3.POSY);
    }
  }
});

EnemyType3.ENEMY3 = {
  FIRST_ENEMY_POSX: 200,
  SECOND_ENEMY_POSX: 1720,
  POSY: 700
};
