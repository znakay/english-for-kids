/* eslint-disable import/extensions */

import create from '../util/create.util.js';
import { state } from '../constants/switcher.const.js';

class SwitcherComponent {
  constructor() {
    this.state = state.train;
    this.switchContainer = create('div', 'switch-container', null, this.container);
    this.checkbox = create('input', 'switch-input', null, null, ['type', 'checkbox'], ['checked', '']);
    this.switcher = create('label', 'switch', [
      this.checkbox,
      create('span', 'switch-label', null, null, ['on', 'Train'], ['off', 'Play']),
      create('span', 'switch-handle'),
    ], this.switchContainer);
  }

  init(container) {
    container.appendChild(this.switchContainer);
    this.switcher.addEventListener('click', () => this.switchGameMode());
  }

  switchGameMode() {
    const contentBox = document.querySelector('.content__box');
    const menu = document.querySelector('.menu');

    if (this.checkbox.checked) {
      contentBox.classList.remove('play');
      menu.classList.remove('play');
      this.state = state.train;
    } else {
      contentBox.classList.add('play');
      menu.classList.add('play');
      this.state = state.play;
    }
  }

  getState() {
    return this.state;
  }
}

export default SwitcherComponent;
