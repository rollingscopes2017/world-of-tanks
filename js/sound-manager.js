const SoundManager = {
  context: null,
  sounds: null,
  init: function init(sounds) {
    this.context = new AudioContext();
    const bufferLoader = new BufferLoader(this.context, sounds, this.onLoad);
    bufferLoader.load();
  },
  onLoad: function onLoad(bufferList) {
    this.sounds = bufferList;
  },
};

export default SoundManager;
