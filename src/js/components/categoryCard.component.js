/* eslint-disable import/extensions */
/* eslint-disable prefer-destructuring */

import create from '../util/create.util.js';

class CategoryCardComponent {
  constructor(name, index) {
    this.itemImg = create('div', 'item__img');
    this.itemImg.style.backgroundImage = `url(./src/assets/img/${index + 1}.jpg)`;
    this.card = create(
      'a',
      'item',
      [
        this.itemImg,
        create('p', 'item__text', name),
        create('div', 'item__mode'),
      ],
      null,
      ['href', '#/cards'],
      ['category', name],
    );
  }
}

export default CategoryCardComponent;
