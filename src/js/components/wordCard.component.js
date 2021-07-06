/* eslint-disable import/extensions */

import create from '../util/create.util.js';
import src from '../constants/path.const.js';

class wordCardComponent {
  constructor({
    word, translation, image, audioSrc,
  }, switcher) {
    this.word = word;
    this.translation = translation;
    this.image = image;
    this.audioSrc = audioSrc;

    this.cardAudio = create('audio', null, null, null, ['src', src + this.audioSrc]);

    this.cardImage = create('div', 'card__img');
    this.cardImageBack = create('div', 'card__img');

    this.cardImageRotate = create('img', 'card__rotate', null, null,
      ['src', `${src}img/arrow-rotate.svg`],
      ['alt', 'flip']);
    this.cardWord = create('p', 'card__word word', this.word);
    this.cardTranslation = create('p', 'card__word translation', this.translation);

    this.cardImage.style.backgroundImage = `url('${src + this.image}')`;
    this.cardImageBack.style.backgroundImage = `url('${src + this.image}')`;

    this.card = create('div', 'card', [
      create('div', 'card__front', [
        this.cardImage,
        this.cardAudio,
        create('div', 'card__content', [
          this.cardWord,
          this.cardImageRotate,
        ]),
      ]),
      create('div', 'card__back', [
        this.cardImageBack,
        this.cardTranslation,
      ]),
    ]);

    this.isFlip = false;
    this.switcher = switcher;

    this.init();
  }

  init() {
    this.card.addEventListener('click', (e) => this.flipCard(e));
    this.card.addEventListener('click', (e) => this.readWord(e));
    this.card.addEventListener('mouseleave', () => this.backFlipCard());
  }

  flipCard(e) {
    if (e.target === this.cardImageRotate) {
      this.card.classList.add('rotate');
      this.isFlip = true;
    }
  }

  backFlipCard() {
    if (this.isFlip) {
      this.card.classList.remove('rotate');
      this.isFlip = false;
    }
  }

  readWord(e) {
    if (this.switcher.getState()) {
      if (e.target.closest('.card__front')
      && e.target !== this.cardImageRotate) {
        this.cardAudio.play();
      }
    }
  }
}

export default wordCardComponent;
