'use strict'

export default class Settings {
  constructor() {
    // GUI
    this.params = {
      red: true,
      green: false,
      blue: false
    };

    this.gui = new dat.GUI();

    this.gui.add(this.params, 'red');
    this.gui.add(this.params, 'green');
    this.gui.add(this.params, 'blue');
  }
}
