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
    animation.addSpriteFrameWithFile(res.barrier1_1_png);
    animation.addSpriteFrameWithFile(res.barrier1_2_png);
    animation.addSpriteFrameWithFile(res.barrier1_3_png);
    animation.addSpriteFrameWithFile(res.barrier1_2_png);
    animation.addSpriteFrameWithFile(res.barrier1_1_png);
    animation.addSpriteFrameWithFile(res.barrier1_4_png);
    animation.addSpriteFrameWithFile(res.barrier1_5_png);
    animation.addSpriteFrameWithFile(res.barrier1_4_png);
    animation.addSpriteFrameWithFile(res.barrier1_1_png);
  },

  addSecondBarrierImages: function(animation) {
    animation.addSpriteFrameWithFile(res.barrier2_1_png);
    animation.addSpriteFrameWithFile(res.barrier2_2_png);
    animation.addSpriteFrameWithFile(res.barrier2_3_png);
    animation.addSpriteFrameWithFile(res.barrier2_2_png);
    animation.addSpriteFrameWithFile(res.barrier2_1_png);
    animation.addSpriteFrameWithFile(res.barrier2_4_png);
    animation.addSpriteFrameWithFile(res.barrier2_5_png);
    animation.addSpriteFrameWithFile(res.barrier2_4_png);
    animation.addSpriteFrameWithFile(res.barrier2_1_png);
  },

  addThirdBarrierImages: function(animation) {
    animation.addSpriteFrameWithFile(res.barrier3_1_png);
    animation.addSpriteFrameWithFile(res.barrier3_2_png);
    animation.addSpriteFrameWithFile(res.barrier3_3_png);
    animation.addSpriteFrameWithFile(res.barrier3_2_png);
    animation.addSpriteFrameWithFile(res.barrier3_1_png);
    animation.addSpriteFrameWithFile(res.barrier3_4_png);
    animation.addSpriteFrameWithFile(res.barrier3_5_png);
    animation.addSpriteFrameWithFile(res.barrier3_4_png);
    animation.addSpriteFrameWithFile(res.barrier3_1_png);
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
