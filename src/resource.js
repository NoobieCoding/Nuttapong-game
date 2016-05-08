var res = {
  background1_png: 'res/images/background1.png',
  background2_png: 'res/images/background2.png',
  background3_png: 'res/images/background3.png',

  enemy1_png: 'res/images/enemy1.png',
  enemy2_png: 'res/images/enemy2.png',
  enemy3_png: 'res/images/enemy3.png',
  enemy3_2_png: 'res/images/enemy3-2.png',

  player_png: 'res/images/player.png',
  playerTurboMode_png: 'res/images/playerTurboMode.png',

  bullet_png: 'res/images/bullet.png',
  bullet2_png: 'res/images/bullet2.png',

  bonus_item1_png: 'res/images/bonus item1.png',
  bonus_item2_png: 'res/images/bonus item2.png',
  bonus_item3_png: 'res/images/bonus item3.png',

  barrier1_1_png: 'res/images/barrier1-1.png',
  barrier1_2_png: 'res/images/barrier1-2.png',
  barrier1_3_png: 'res/images/barrier1-3.png',
  barrier1_4_png: 'res/images/barrier1-4.png',
  barrier1_5_png: 'res/images/barrier1-5.png',
  barrier2_1_png: 'res/images/barrier2-1.png',
  barrier2_2_png: 'res/images/barrier2-2.png',
  barrier2_3_png: 'res/images/barrier2-3.png',
  barrier2_4_png: 'res/images/barrier2-4.png',
  barrier2_5_png: 'res/images/barrier2-5.png',
  barrier3_1_png: 'res/images/barrier3-1.png',
  barrier3_2_png: 'res/images/barrier3-2.png',
  barrier3_3_png: 'res/images/barrier3-3.png',
  barrier3_4_png: 'res/images/barrier3-4.png',
  barrier3_5_png: 'res/images/barrier3-5.png',

  enterLabel_png: 'res/images/enterLabel.png',
  gameOverText_png: 'res/images/gameovertext.png',
  howToPlayLabel_png: 'res/images/howToPlayLabel.png',
  logo_png: 'res/images/logo.png',
  normal_png: 'res/images/normal.png',
  easy_png: 'res/images/easy.png',
  soundIcon_png: 'res/images/soundIcon.png',
  soundOffIcon_png: 'res/images/soundOffIcon.png',

  gameBGM_mp3: 'res/effects/game bgm.mp3',
  menuBGM_mp3: 'res/effects/menu bgm.mp3',
  enemyExploded_wav: 'res/effects/enemy explosion.wav',
  playerExploded_wav: 'res/effects/player explosion.wav',
  shootingEffect_wav: 'res/effects/shooting effect.wav',
  barrierUp_wav: 'res/effects/barrier up.wav',
  powerUp_wav: 'res/effects/power up.wav',
  speedUp_mp3: 'res/effects/speed up.mp3',
  enemyLaser_wav: 'res/effects/enemy laser.wav'
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
