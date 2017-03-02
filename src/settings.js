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
  constructor() {
    // GUI
    this.params = {
      filterColor: '#ff0000',
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

    this.setColor();
  }

  setColor() {
    this.filterColorRGB = hexToRgb(this.params.filterColor);
  }
}
