var BonusItem = cc.Sprite.extend({
  ctor: function(type) {
    this._super();
    this.randomType();
    this.setPos();
    this.speed = 10;
    this.scheduleUpdate();
  },

  randomType: function() {
    var range = 2;
    var min = 1;
    this.type = random(range, min);
    this.initPicture(this.type);
  },

  setPlayer: function(player) {
    this.player = player;
  },

  initPicture: function() {
    switch (this.type) {
    case 1:
      this.initWithFile('res/images/bonus item.png');
      break;
    case 2:
      this.initWithFile('res/images/bonus item2.png');
      break;
    case 3:
      this.initWithFile('res/images/bonus item3.png');
      break;
    }
  },

  setPos: function() {
    var x = this.randomPosX();
    this.setPosition(new cc.Point(x, BonusItem.START_Y));
  },

  randomPosX: function() {
    var range = 1880;
    var min = 20;
    return random(range, min);
  },

  update: function(dt) {
    this.y -= this.speed;
    this.setPosition(this.x, this.y);
  },

  hit: function(player) {
    if (checkPlayerBonusItemCollision(player, this)) {
      return true;
    }
    else
      return false;
  },

  applyEffect: function() {
    switch (this.type) {
    case 1:
      this.player.addBarrier();
      break;
    case 2:
      this.player.addSpeed();
      break;
    case 3:
      this.player.addBulletSpeed();
      break;
    }
  }
});

BonusItem.START_Y = 1200;
