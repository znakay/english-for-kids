/* eslint-disable import/extensions */

import create from '../util/create.util.js';

class HeaderComponent {
  constructor() {
    this.header = create('header', 'header');
    this.headerWrapper = create('div', 'wrapper header__wrapper');
  }

  init() {
    this.header.appendChild(this.headerWrapper);
    document.body.prepend(this.header);
  }

  getWrapper() {
    return this.headerWrapper;
  }
}

export default HeaderComponent;
