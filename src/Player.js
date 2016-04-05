var Player = cc.Sprite.extend({
  ctor: function() {
    this._super();
    this.initWithFile('res/images/player.png');
    this.direction = Player.DIR.STILL;
    this.speed = 25;
    this.creathHealthBar();
  },

  switchDirection: function(keyboardInput) {
    this.direction = keyboardInput;
  },

  update(dt) {
    var pos = this.getPosition();
    pos = this.movePlayer(pos);
    this.setPosition(new cc.Point(pos.x, pos.y));
  },

  movePlayer: function(pos) {
    if(this.direction != Player.DIR.STILL) {
      switch (this.direction) {
      case Player.DIR.UP:
        this.moveup(pos);
        break;
      case Player.DIR.DOWN:
        this.moveDown(pos);
        break;
      case Player.DIR.LEFT:
        this.moveLeft(pos);
        break;
      case Player.DIR.RIGHT:
        this.moveRight(pos);
        break;
      }
    }
    return pos;
  },

  moveup: function(pos) {
    if(pos.y <= GameLayer.SCREENHEIGHT - 150)
      pos.y += this.speed;
  },

  moveDown: function(pos) {
    if(pos.y >= 160)
      pos.y -= this.speed;
  },

  moveLeft: function(pos) {
    if(pos.x >= 120)
      pos.x -= this.speed;
  },

  moveRight: function(pos) {
    if(pos.x <= GameLayer.SCREENWIDTH - 120)
      pos.x += this.speed;
  },

  creathHealthBar: function() {
    this.healthBar = new Array(3);
    for(var i = 0; i < this.healthBar.length; i++) {
      this.healthBar[i] = new Health(i + 1);
      this.healthBar[i].setPos();
      this.addChild(this.healthBar[i]);
    }
  },
});

Player.DIR = {
  STILL: 0,
  UP: 1,
  RIGHT: 2,
  LEFT: 3,
  DOWN: 4
};
