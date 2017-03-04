import Settings from './settings.js'

'use strict';

class App {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');

    this.mediaCanvas = document.createElement('canvas');
    this.mediaContext = this.mediaCanvas.getContext('2d');

    this.media = null;
    this.pause = true;

    this.settings = new Settings(this);

    this.resize();

  }

  init() {
    this.resize();
    this.loadMedia('rgb.png');
    this.animate();
  }

  loadMedia(filename, videoFlag) {
    if (videoFlag) { this.loadVideo(filename); }
    else { this.loadImage(filename); }
  }

  loadImage(filename) {
    this.pause = true;

    this.media = new Image();
    this.media.src = filename;
    this.media.onload = () => {
      this.pause = false;
    };
  }

  loadVideo(filename) {
    this.media = document.createElement('video');
    this.media.src = filename;
    this.media.autoplay = true;
    this.media.loop = true;
    this.media.onload = () => {
      this.pause = false;
    };
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.mediaCanvas.width = window.innerWidth;
    this.mediaCanvas.height = window.innerHeight;
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    if (this.pause) { return; }

    this.mediaContext.drawImage(this.media, 0, 0,
        this.mediaCanvas.width, this.mediaCanvas.height);
    let mediaData = this.mediaContext.getImageData(
        0, 0, this.mediaCanvas.width, this.mediaCanvas.height);
    let data = mediaData.data;

    for (var i = 0; i < data.length; i+=4) {
      data[i]     *= this.settings.filterColorRGB.r;
      data[i + 1] *= this.settings.filterColorRGB.g;
      data[i + 2] *= this.settings.filterColorRGB.b;
    }

    this.context.putImageData(mediaData, 0, 0);
  };
}

function main() {
  var app = new App();
  app.init();
}

main();
