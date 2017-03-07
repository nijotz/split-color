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
      white: false,
      video: false
    };

    this.options = ['squares', 'white', 'video'];
    this.currentOption = 0;
    window.onkeypress = (ev) => {
      this.currentOption++;
      this.currentOption %= 3;
      this.chooseMedia(this.options[this.currentOption]);
    }

    this.filterColorRGB = {
      r: 0,
      g: 0,
      b: 0
    }

    this.gui = new dat.GUI();

    this.gui.remember(this.params);

    this.gui.addColor(this.params, 'filterColor')
      .name('Filter Color')
      .onChange(this.setColor.bind(this));
    this.gui.add(this.params, 'squares')
      .name('Squares')
      .onChange(() => { this.changeMedia('squares') })
      .listen();
    this.gui.add(this.params, 'white')
      .name('White')
      .onChange(() => { this.changeMedia('white') })
      .listen();
    this.gui.add(this.params, 'video')
      .name('Video')
      .onChange(() => { this.changeMedia('video') })
      .listen();

    this.setColor();

    this.mouseMoveTimer = null;
    $(document).mousemove(this.mouseMove.bind(this));
    this.mouseMove();
  }

  mouseMove() {
    let gui = this.gui;

    if (this.mouseMoveTimer) {
      clearTimeout(this.mouseMoveTimer);
      this.mouseMoveTimer = null;
    }

    $(gui.domElement).fadeIn();

    this.mouseMoveTimer = setTimeout(() => {
      $(gui.domElement).fadeOut();
    }, 3000)
  }

  setColor() {
    this.filterColorRGB = hexToRgb(this.params.filterColor);
  }

  chooseMedia(media) {
    this.params['squares'] = false;
    this.params['white'] = false;
    this.params['video'] = false;
    this.params[media] = true;

    let paramFileMap = {
      'squares': 'rgb.png',
      'white': 'white.jpg',
      'video': 'colors.webm'
    }

    let filename = paramFileMap[media];
    this.app.loadMedia(filename, media == 'video');
  }
}
