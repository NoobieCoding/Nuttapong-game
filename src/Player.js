var Player = cc.Sprite.extend({
  ctor: function() {
    this._super();
    this.initWithFile('res/images/player.png');
    this.direction = Player.DIR.STILL;
    this.speed = 30;
    this.creathHealthBar();
    this.setPos();
  },

  switchDirection: function(keyboardInput) {
    this.direction = keyboardInput;
  },

  setPos: function() {
    var xPos = GameLayer.SCREENWIDTH / 2;
    var yPos = GameLayer.STARTPOSY;
    this.setPosition(new cc.Point(xPos, yPos));
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
    this.hp = 3;
    this.healthBar = new Array(3);
    for(var i = 0; i < this.healthBar.length; i++) {
      this.healthBar[i] = new Health(i + 1);
      this.healthBar[i].setPos();
      this.addChild(this.healthBar[i]);
    }
  },

  reduceHp: function() {
    this.hp -= 1;
    this.reduceHealthSprite();
  },

  reduceHealthSprite: function() {
    if(this.hp == 2)
      this.removeChild(this.healthBar[2]);
    else if(this.hp == 1)
      this.removeChild(this.healthBar[1]);
    else if(this.hp == 0)
      this.removeChild(this.healthBar[0]);
  },

  addHp: function() {
    this.hp += 1
    this.addHealthSprite();
  },

  addHealthSprite: function() {
    if(this.hp == 1)
      this.addChild(this.healthBar[0]);
    else if (this.hp == 2)
      this.addChild(this.healthBar[1]);
    else if(this.hp == 3)
      this.addChild(this.healthBar[2]);
  }
});

Player.DIR = {
  STILL: 0,
  UP: 1,
  RIGHT: 2,
  LEFT: 3,
  DOWN: 4
};
