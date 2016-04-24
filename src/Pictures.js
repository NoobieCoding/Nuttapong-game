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
    }
  }
});

Picture.PIC = {
  gameOverPic: 1,
  titlePic: 2,
  pressEnterPic: 3,
  soundOptionPic: 4
};
