var EnemyType1 = Enemy.extend({
  ctor: function() {
    this._super();
    this.initWithFile('res/images/enemy1.png' );
  },

  setPos: function(thisEnemyOrder) {
    var randomPosX = Math.floor(Math.random() * (range + 1)) + min;
    this.setPosition(new cc.Point(randomPosX,
    EnemyType1.ENEMY1.FIRST_ENEMY_POSY + (thisEnemyOrder * EnemyType1.ENEMY1.GAP_PER_ENEMIY)));
  }
});
var range = 1520;
var min = 200;

EnemyType1.ENEMY1 = {
  FIRST_ENEMY_POSY: 700,
  GAP_PER_ENEMIY: 200
};
