var Player = cc.Sprite.extend({
  ctor: function() {
    this._super();
    this.initWithFile('res/images/player.png' );
    this.direction = Player.DIR.STILL;
    this.speed = 15;
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
        if(pos.y <= GameLayer.SCREENHEIGHT - 150) {
          pos.y += this.speed;
        }
        break;
      case Player.DIR.DOWN:
        if(pos.y >= 150) {
          pos.y -= this.speed;
        }
        break;
      case Player.DIR.LEFT:
        if(pos.x >= 60) {
          pos.x -= this.speed;
        }
        break;
      case Player.DIR.RIGHT:
        if(pos.x <= GameLayer.SCREENWIDTH - 60) {
          pos.x += this.speed;
        }
        break;
      }
    }
    return pos;
  }
});

Player.DIR = {
  STILL: 0,
  UP: 1,
  RIGHT: 2,
  LEFT: 3,
  DOWN: 4
};
