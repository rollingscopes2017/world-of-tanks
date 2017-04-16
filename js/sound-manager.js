const SoundManager = {
  sounds: {},
  init: function init(sounds) {
    sounds.forEach((sound) => {
      const soundName = sound.match(/\/(\w+)\.\w+$/)[1] || sound;
      this.sounds[soundName] = new Audio(sound);
    });
  },
  play: function play(sound) {
    this.sounds[sound].play();
  },
  stop: function stop(sound) {
    this.sounds[sound].pause();
  },
};

export default SoundManager;
