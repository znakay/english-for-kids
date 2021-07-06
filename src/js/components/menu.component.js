/* eslint-disable import/extensions */
/* eslint-disable prefer-destructuring */

import create from '../util/create.util.js';
import data from '../data/cards.data.js';

class MenuComponent {
  constructor() {
    this.menuContainerElement = create('div', 'menu', null, this.container);
    this.menuBurgerButtonElement = create('div', 'menu__button',
      Array.from({ length: 6 }, () => create('span')), this.menuContainerElement);
    this.menuSidebarBlockElement = create('div', 'menu__sidebar', null, this.menuContainerElement);
    this.menuListElement = create('ul', 'list', null, this.menuSidebarBlockElement);

    this.menuList = [];
    this.categoryOfWords = data[0];

    this.menuListMainItem = create(
      'li',
      'list__item active',
      create('a', 'list__link', 'Main Page', null, ['href', '#/']),
    );

    this.menuList.push(this.menuListMainItem);

    this.menuListElement.appendChild(this.menuListMainItem);

    this.categoryOfWords.forEach((name) => {
      const elemLink = create('a', 'list__link', name, null, ['href', '#/cards'], ['category', name]);
      const elem = create(
        'li',
        'list__item',
        elemLink,
      );
      this.menuList.push(elem);

      this.menuListElement.appendChild(elem);
    });
  }

  init(container) {
    container.appendChild(this.menuContainerElement);

    this.menuBurgerButtonElement.addEventListener('click', (e) => this.handleMenuButton(e));
    this.menuContainerElement.addEventListener('click', (e) => this.closeMenu(e));
    document.body.addEventListener('click', (e) => this.closeMenu(e));
  }

  handleMenuButton(e) {
    if (e.target.closest('.menu__button')) {
      this.menuContainerElement.classList.toggle('open');
    }
  }

  handleMenuItem(e) {
    this.menuList.forEach((item) => {
      item.classList.remove('active');
    });

    this.menuList.forEach((item) => {
      if (e.target.closest('a').dataset.category
          === item.children[0].dataset.category) {
        item.classList.add('active');
      }
    });
  }

  closeMenu(e) {
    if (e.target.closest('a') || !e.target.closest('.menu')) {
      this.menuContainerElement.classList.remove('open');
    }
  }
}

export default MenuComponent;
