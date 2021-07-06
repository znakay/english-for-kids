/* eslint-disable prefer-destructuring */
/* eslint-disable import/extensions */

import cards from '../data/cards.data.js';
import create from '../util/create.util.js';
import CategoryCardComponent from './categoryCard.component.js';
import WordCardComponent from './wordCard.component.js';
import * as block from '../constants/htmlClasses.const.js';
import src from '../constants/path.const.js';

class ContentComponent {
  constructor(menu, buttonStart, switcher) {
    this.content = create('section', 'content');
    this.contentWrapper = create('div', 'wrapper content__wrapper');
    this.contentTitle = create('h1', 'content__title', 'English for kids', this.contentWrapper);
    this.contentBox = create('div', block.CONTENT_BOX, null, this.contentWrapper);

    this.categoryList = create('div', block.CATEGORY_LIST, null, this.contentBox);
    this.wordList = create('div', block.WORD_LIST, null);
    this.wordCards = [];

    this.categoryOfWords = cards[0]; /* prefer-destructuring */

    this.menu = menu;
    this.menuList = menu.menuListElement;
    this.currentMenuItem = '';

    this.switcher = switcher;

    this.rating = create('div', 'rating');
    this.buttonStartContainer = buttonStart.container;

    this.audioCorrect = create('audio', null, null, null, ['src', `${src}audio/correct.mp3`]);
    this.audioError = create('audio', null, null, null, ['src', `${src}audio/error.mp3`]);
  }

  init() {
    this.content.appendChild(this.contentWrapper);

    const script = document.querySelector('script');
    document.body.insertBefore(this.content, script);
    this.generateMenu();
    this.categoryList.addEventListener('click', (e) => this.selectCategory(e));

    this.menuList.addEventListener('click', (e) => this.selectCategory(e));
  }

  generateMenu() {
    this.categoryOfWords.forEach((name, index) => {
      const catigoryCard = new CategoryCardComponent(name, index);
      this.categoryList.appendChild(catigoryCard.card);
    });
  }

  selectCategory(e) {
    if (e.target.closest('a')) {
      if (e.target.closest('a').dataset.category) {
        const category = e.target.closest('a').dataset.category;
        this.categoryOfWords.forEach((elem, index) => {
          if (category === elem) {
            this.currentMenuItem = category;
            this.generateContentPageBySelect(index);
          }
        });
        this.loadWordList();
      } else {
        this.currentMenuItem = 'Main menu';
        this.clearContentBox();
        this.contentBox.appendChild(this.categoryList);
      }
      this.menu.handleMenuItem(e);
    }
  }

  generateContentPageBySelect(index) {
    if (this.wordList.textContent) {
      this.clearWordsList();
      this.wordCards = [];
    }
    const words = cards[index + 1];

    this.wordList.appendChild(this.rating);

    words.forEach((elem) => {
      const wordCard = new WordCardComponent(elem, this.switcher);
      const card = wordCard.card;
      this.wordList.appendChild(card);

      this.wordCards.push(wordCard);
    });

    this.wordList.appendChild(this.buttonStartContainer);
    this.wordList.appendChild(this.audioCorrect);
    this.wordList.appendChild(this.audioError);
  }

  loadWordList() {
    this.clearContentBox();
    this.contentBox.appendChild(this.wordList);
    window.scrollTo(0, 0);
  }

  clearContentBox() {
    this.contentBox.textContent = '';
  }

  clearWordsList() {
    this.wordList.innerHTML = '';
  }

  getWordCards() {
    return this.wordCards;
  }

  getCurrentMenuItem() {
    return this.currentMenuItem;
  }
}

export default ContentComponent;
