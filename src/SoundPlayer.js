var playEffect = function(effect) {
  if (soundStatus === SOUND.enable)
    cc.audioEngine.playEffect(effect);
};

var playMusic = function(music) {
  if (soundStatus === SOUND.enable)
    cc.audioEngine.playMusic(music, true);
};

var setVolume = function(volume) {
  cc.audioEngine.setMusicVolume(volume);
}
