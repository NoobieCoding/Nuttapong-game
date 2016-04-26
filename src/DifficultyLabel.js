var DifficultyLabel = cc.Sprite.extend({
  ctor: function(type) {
    this._super();
    this.initwithImages();
    this.addMouseListener();
  },

  initwithImages: function() {
    switch (currentDifficulty) {
      case DIFFICULTY.normal:
        this.initWithFile('res/images/normal.png');
        break;
      case DIFFICULTY.easy:
        this.initWithFile('res/images/easy.png');
        break;
    }
  },

  addMouseListener: function() {
    var self = this;
    cc.eventManager.addListener({
      event: cc.EventListener.MOUSE,
      onMouseDown: function(event) {
        if (event.getButton() == cc.EventMouse.BUTTON_LEFT)
          self.doPressAction(event);
      }
    }, this);
  },

  doPressAction: function(event) {
    if (event.getButton() == cc.EventMouse.BUTTON_LEFT && this.clickAroundThisLabel(event))
      this.changeDifficulty();
  },

  clickAroundThisLabel: function(event) {
    var pressedX = event.getLocationX();
    var pressedY = event.getLocationY();

    return (pressedX < this.x + DifficultyLabel.RADIUS.x)&&
    (pressedX > this.x - DifficultyLabel.RADIUS.x) &&
    (pressedY < this.y + DifficultyLabel.RADIUS.y) &&
    (pressedY > this.y - DifficultyLabel.RADIUS.y)
  },

  changeDifficulty: function() {
      if (currentDifficulty == DIFFICULTY.normal) {
        currentDifficulty = DIFFICULTY.easy;
        currentHighScore = easyHighScore;
      } else {
        currentDifficulty = DIFFICULTY.normal;
        currentHighScore = normalHighScore;
      }
      this.initwithImages();
  },
});

DifficultyLabel.RADIUS = {
  x: 180,
  y: 60
};
