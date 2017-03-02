import Settings from './settings.js'

'use strict';

class App {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');

    this.imageCanvas = document.createElement('canvas');
    this.imageContext = this.imageCanvas.getContext('2d');

    this.image = new Image();
    this.resize();
    this.settings = new Settings();
  }

  init() {
    this.image.src = 'white.jpg';
    this.image.onload = () => {
      this.imageContext.drawImage(this.image, 0, 0);
      this.animate();
    }
  }

  resize() {
  }

  animate() {
    let ctx = this.context;

    let imageData = this.imageContext.getImageData(
        0, 0, this.imageCanvas.width, this.imageCanvas.height);
    let data = imageData.data;

    for (var i = 0; i < data.length; i+=4) {
      data[i]     *= this.settings.filterColorRGB.r;
      data[i + 1] *= this.settings.filterColorRGB.g;
      data[i + 2] *= this.settings.filterColorRGB.b;
    }

    ctx.putImageData(imageData, 0, 0);
    window.requestAnimationFrame(this.animate.bind(this));
  };
}

function main() {
  var app = new App();
  app.init();
}

main();
