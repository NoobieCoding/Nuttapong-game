var Picture = cc.Sprite.extend({
  ctor: function(type) {
    this._super();
    this.type = type;
    this.initwithImages();
  },

  initwithImages: function() {
    switch (this.type) {
      case Picture.PIC.gameOverPic:
        this.initWithFile('res/images/gameovertext.png');
        break;
      case Picture.PIC.titlePic:
        this.initWithFile('res/images/logo.png');
        break;
      case Picture.PIC.pressEnterPic:
        this.initWithFile('res/images/enterLabel.png');
        break;
      case Picture.PIC.soundOptionPic:
        this.initWithFile('res/images/soundIcon.png');
        break;
      case Picture.PIC.howToPlayPic:
      this.initWithFile('res/images/howToPlayLabel.png');
      break;
    }
  },

  addMouseListener: function() {
      var self = this;
      cc.eventManager.addListener({
        event: cc.EventListener.MOUSE,
        onMouseDown: function(event) {
          if (event.getButton() == cc.EventMouse.BUTTON_LEFT
          && self.type == Picture.PIC.soundOptionPic)
            self.doPressAction(event);
        }
      }, this);
  },

  doPressAction: function(event) {
    if(event.getButton() == cc.EventMouse.BUTTON_LEFT && this.clickAroundPic(event))
      this.turnSound();
  },

  clickAroundPic: function(event) {
    var pressedX = event.getLocationX();
    var pressedY = event.getLocationY();

    return (pressedX < this.x + SOUND_RADIUS.x)&&
    (pressedX > this.x - SOUND_RADIUS.x) &&
    (pressedY < this.y + SOUND_RADIUS.y) &&
    (pressedY > this.y - SOUND_RADIUS.y)
  },

  turnSound: function() {
    if(soundStatus == SOUND.enable) {
      soundStatus = SOUND.disable;
      this.initWithFile('res/images/soundOffIcon.png')
    }
    else {
      soundStatus = SOUND.enable;
      this.initWithFile('res/images/soundIcon.png')
    }
  }
});

Picture.PIC = {
  gameOverPic: 1,
  titlePic: 2,
  pressEnterPic: 3,
  soundOptionPic: 4,
  howToPlayPic: 5
};

var SOUND_RADIUS = {
  x: 30,
  y: 30
};
