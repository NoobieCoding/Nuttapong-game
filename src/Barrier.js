var Barrier = cc.Sprite.extend({
  ctor: function(order) {
    this._super();
    this.order = order;
    this.runAnimation();
  },

  setPos: function() {
    if (this.order === 1)
      this.setPosition(new cc.Point(Barrier.FIRSTPOS.X, Barrier.FIRSTPOS.Y));
    else if (this.order === 2)
      this.setPosition(new cc.Point(Barrier.SECONDPOS.X, Barrier.SECONDPOS.Y));
    else if (this.order === 3)
      this.setPosition(new cc.Point(Barrier.THIRDPOS.X, Barrier.THIRDPOS.Y));
  },

  runAnimation: function() {
    this.createAnimation();
    this.runAction(this.animation);
  },

  createAnimation: function() {
    var animation = new cc.Animation.create();
    this.addImagesToAnimation(animation);

    if (this.order  === 2)
      animation.setDelayPerUnit(0.08);
    else
      animation.setDelayPerUnit(0.1);
    this.animation = cc.RepeatForever.create(cc.Animate.create(animation));
  },
  addImagesToAnimation: function(animation) {
    if (this.order === 1)
      this.addFirstBarrierImages(animation);
    else if (this.order === 2)
      this.addSecondBarrierImages(animation);
    else if (this.order === 3)
      this.addThirdBarrierImages(animation);
  },

  addFirstBarrierImages: function(animation) {
    animation.addSpriteFrameWithFile('res/images/barrier1-1.png');
    animation.addSpriteFrameWithFile('res/images/barrier1-2.png');
    animation.addSpriteFrameWithFile('res/images/barrier1-3.png');
    animation.addSpriteFrameWithFile('res/images/barrier1-2.png');
    animation.addSpriteFrameWithFile('res/images/barrier1-1.png');
    animation.addSpriteFrameWithFile('res/images/barrier1-4.png');
    animation.addSpriteFrameWithFile('res/images/barrier1-5.png');
    animation.addSpriteFrameWithFile('res/images/barrier1-4.png');
    animation.addSpriteFrameWithFile('res/images/barrier1-1.png');
  },

  addSecondBarrierImages: function(animation) {
    animation.addSpriteFrameWithFile('res/images/barrier2-1.png');
    animation.addSpriteFrameWithFile('res/images/barrier2-2.png');
    animation.addSpriteFrameWithFile('res/images/barrier2-3.png');
    animation.addSpriteFrameWithFile('res/images/barrier2-2.png');
    animation.addSpriteFrameWithFile('res/images/barrier2-1.png');
    animation.addSpriteFrameWithFile('res/images/barrier2-4.png');
    animation.addSpriteFrameWithFile('res/images/barrier2-5.png');
    animation.addSpriteFrameWithFile('res/images/barrier2-4.png');
    animation.addSpriteFrameWithFile('res/images/barrier2-1.png');
  },

  addThirdBarrierImages: function(animation) {
    animation.addSpriteFrameWithFile('res/images/barrier3-1.png');
    animation.addSpriteFrameWithFile('res/images/barrier3-2.png');
    animation.addSpriteFrameWithFile('res/images/barrier3-3.png');
    animation.addSpriteFrameWithFile('res/images/barrier3-2.png');
    animation.addSpriteFrameWithFile('res/images/barrier3-1.png');
    animation.addSpriteFrameWithFile('res/images/barrier3-4.png');
    animation.addSpriteFrameWithFile('res/images/barrier3-5.png');
    animation.addSpriteFrameWithFile('res/images/barrier3-4.png');
    animation.addSpriteFrameWithFile('res/images/barrier3-1.png');
  }

});
Barrier.FIRSTPOS = {
  X: 10,
  Y: 100
};
Barrier.SECONDPOS = {
  X: 80,
  Y: 0
};
Barrier.THIRDPOS = {
  X: 150,
  Y: 100
};
