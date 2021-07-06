/* eslint-disable import/extensions */

import create from '../util/create.util.js';

class ButtonStart {
  constructor() {
    this.container = create('div', 'button__start-container');
    this.start = create('div', 'button__start', 'Start game', this.container);
  }
}

export default ButtonStart;
