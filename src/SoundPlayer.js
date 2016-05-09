var playEffect = function(effect) {
  if (soundStatus === SOUND.enable)
    cc.audioEngine.playEffect(effect);
};

var setVolume = function(volume) {
  cc.audioEngine.setMusicVolume(volume);
}
