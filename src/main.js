import Settings from './settings.js'

'use strict';

class App {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');

    this.imageCanvas = document.createElement('canvas');
    this.imageContext = this.imageCanvas.getContext('2d');

    this.video = document.createElement('video');
    this.video.autoplay = true;
    this.video.loop = true;

    this.image = new Image();
    this.resize();
    this.settings = new Settings(this);

    this.pause = true;
  }

  init() {
    this.resize();
    this.loadImage('rgb.png');
    this.animate();
  }

  loadImage(filename) {
    this.image.src = filename;
    this.pause = true;
    this.image.onload = () => {
      this.imageContext.drawImage(this.image,
          0, 0,
          this.canvas.width, this.canvas.height);
      this.pause = false;
    };
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.imageCanvas.width = window.innerWidth;
    this.imageCanvas.height = window.innerHeight;
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    if (this.pause) { return; }

    let ctx = this.context;

    this.imageContext.drawImage(this.video, 0, 0);

    let imageData = this.imageContext.getImageData(
        0, 0, this.imageCanvas.width, this.imageCanvas.height);
    let data = imageData.data;

    for (var i = 0; i < data.length; i+=4) {
      data[i]     *= this.settings.filterColorRGB.r;
      data[i + 1] *= this.settings.filterColorRGB.g;
      data[i + 2] *= this.settings.filterColorRGB.b;
    }

    ctx.putImageData(imageData, 0, 0);
  };
}

function main() {
  var app = new App();
  app.init();
}

main();
