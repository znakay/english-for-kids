/* eslint-disable import/extensions */

import create from '../util/create.util.js';

class StarComponent {
  constructor(componentClass) {
    this.div = create('div', componentClass);
  }
}

export default StarComponent;
