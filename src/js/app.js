/* eslint-disable import/extensions */

import HeaderComponent from './components/header.component.js';
import MenuComponent from './components/menu.component.js';
import SwitcherComponent from './components/switcher.component.js';
import ButtonStart from './components/buttonStart.component.js';
import ContentComponent from './components/content.component.js';
import FooterComponent from './components/footer.component.js';
import Play from './play/play.js';

class App {
  constructor() {
    this.header = new HeaderComponent();
    this.menu = new MenuComponent();
    this.switcher = new SwitcherComponent();
    this.buttonStart = new ButtonStart();
    this.content = new ContentComponent(this.menu, this.buttonStart, this.switcher);
    this.footer = new FooterComponent();
    this.play = new Play(this.content, this.buttonStart, this.menu);
  }

  init() {
    this.header.init();
    this.menu.init(this.header.getWrapper());
    this.switcher.init(this.header.getWrapper());
    this.content.init();
    this.footer.init();

    this.play.init();
  }
}

export default App;
