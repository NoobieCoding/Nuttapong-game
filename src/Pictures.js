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
      case Picture.PIC.title:
        this.initWithFile('res/images/logo.png');
        break;
      case Picture.PIC.pressEnterPic:
        this.initWithFile('res/images/enterLabel.png');
        break;
    }
  }
});

Picture.PIC = {
  gameOverPic: 1,
  title: 2,
  pressEnterPic: 3
};
