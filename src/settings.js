'use strict'

function hexToRgb(hex) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16) / 255.0,
    g: parseInt(result[2], 16) / 255.0,
    b: parseInt(result[3], 16) / 255.0
  } : null;
}

export default class Settings {
  constructor(app) {
    this.app = app;

    this.params = {
      filterColor: '#ff0000',
      squares: true,
      white: false
    };

    this.filterColorRGB = {
      r: 0,
      g: 0,
      b: 0
    }

    this.gui = new dat.GUI();

    this.gui.addColor(this.params, 'filterColor')
      .name('Filter Color')
      .onChange(this.setColor.bind(this));
    this.gui.add(this.params, 'squares')
      .name('Squares')
      .onChange(this.changeImage('rgb.png', 'squares'))
      .listen();
    this.gui.add(this.params, 'white')
      .name('White')
      .onChange(this.changeImage('white.jpg', 'white'))
      .listen();

    this.setColor();
  }

  setColor() {
    this.filterColorRGB = hexToRgb(this.params.filterColor);
  }

  changeImage(filename, param) {
    return () => {
      this.params.squares = false;
      this.params.white = false;
      this.params[param] = true;
      this.app.loadImage(filename);
    }
  }
}
