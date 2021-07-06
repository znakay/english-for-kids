/* eslint-disable import/extensions */

import create from '../util/create.util.js';
import src from '../constants/path.const.js';
import StarComonent from '../components/star.component.js';

class Play {
  constructor(content, { start }, menu) {
    this.menu = menu.menuListElement;
    this.currentMenuItem = '';
    this.content = content;
    this.categoryList = content.categoryList;
    this.wordList = content.wordList;
    this.listWordCardComponent = content.wordCards;

    this.buttonStart = start;
    this.isStartGame = false;
    this.indexActiveCard = 0;
    this.countError = 0;

    this.correct = content.audioCorrect;
    this.error = content.audioError;

    this.rating = content.rating;
    this.countError = 0;

    this.successBlock = create('div', 'success', [
      create('div', 'success__img'),
      create('div', 'success__text', 'Win!'),
    ]);

    this.failureBlock = create('div', 'failure', [
      create('div', 'failure__img'),
    ]);

    this.successAudio = create('audio', null, null, null, ['src', `${src}audio/success.mp3`]);
    this.failureAudio = create('audio', null, null, null, ['src', `${src}audio/failure.mp3`]);
  }

  init() {
    this.buttonStart.addEventListener('click', () => this.start());
    this.buttonStart.addEventListener('click', () => this.repeatCurrentWord());
    this.menu.addEventListener('click', (e) => this.checkCurrentMenuItem(e));
  }

  start() {
    if (!this.isStartGame) {
      this.isStartGame = true;
      this.currentMenuItem = this.content.getCurrentMenuItem();
      this.transformButtonStart();
      this.gameList = this.generateGameWordList();
      this.runGameList();
    }
  }

  checkCurrentMenuItem(e) {
    if (this.isStartGame && this.currentMenuItem !== e.target.closest('a')) {
      this.resetGame();
      this.content.selectCategory(e);
    }
  }

  repeatCurrentWord() {
    if (this.isStartGame) {
      this.readWord();
    }
  }

  generateGameWordList() {
    const collection = this.content.getWordCards();
    const newCollection = [];
    while (collection.length) {
      const index = Math.floor(Math.random() * collection.length);
      const element = collection[index];
      newCollection.push(element);
      collection.splice(index, 1);
    }
    return newCollection;
  }

  runGameList() {
    this.setActiveCard(0);
    this.pickCard();
  }

  setActiveCard(card) {
    this.indexActiveCard = card;
    this.readWord(this.gameList[card]);
  }

  pickCard() {
    this.wordList.addEventListener('click', (e) => this.handle(e));
  }

  handle(e) {
    if (e.target.classList.contains('inactive') || !this.isStartGame) {
      return;
    }

    if (e.target.closest('.card__img')) {
      if (e.target === this.gameList[this.indexActiveCard].cardImage) {
        if (this.indexActiveCard + 1 !== this.gameList.length) {
          this.answer('star-win', e);
          setTimeout(() => this.setActiveCard(this.indexActiveCard + 1), 1000);
        } else {
          this.answer('star-win', e);
          setTimeout(() => this.endGame(), 1200);
        }
      } else {
        this.answer('star');
        this.countError += 1;
      }
    }
  }

  answer(star, e = undefined) {
    this.star = new StarComonent(star);
    this.rating.appendChild(this.star.div);
    if (e) {
      this.correct.play();
      e.target.classList.add('inactive');
    } else {
      this.error.play();
    }
  }

  endGame() {
    if (!this.countError) {
      this.endGameAlert(this.successBlock, 'success', this.successAudio);
    } else {
      this.failureText = create(
        'div',
        'failure__text',
        `Failure! Count errors ${this.countError}!`,
      );
      this.failureBlock.appendChild(this.failureText);
      this.endGameAlert(this.failureBlock, 'failure', this.failureAudio);
    }
  }

  endGameAlert(block, result, audio) {
    window.scrollTo(0, 0);
    document.body.appendChild(block);
    document.body.classList.add(result);
    this.wordList.appendChild(audio);
    audio.play();
    setTimeout(() => {
      document.body.removeChild(block);
      document.body.classList.remove(result);
      this.wordList.removeChild(audio);

      this.resetGame();
    }, 3000);
  }

  resetGame() {
    this.wordList.removeEventListener('click', (e) => this.handle(e));
    this.countError = 0;
    this.isStartGame = false;
    this.buttonStart.classList.remove('repeat');
    this.indexActiveCard = 0;

    this.rating.textContent = '';
    this.content.clearContentBox();
    this.content.contentBox.appendChild(this.content.categoryList);
  }

  readWord() {
    this.gameList[this.indexActiveCard].cardAudio.play();
  }

  transformButtonStart() {
    this.buttonStart.classList.add('repeat');
  }
}

export default Play;
