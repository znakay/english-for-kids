/* eslint-disable import/extensions */

import create from '../util/create.util.js';

class FooterComponent {
  constructor() {
    this.footer = create('footer', 'footer');
    this.footerWrapper = create('div', 'wrapper footer__wrapper');
    this.footerAuthor = create('a', 'footer__author', 'https://github.com/znakay', this.footerWrapper, ['href', 'https://github.com/znakay']);
    this.footerYearMade = create('div', 'footer__year', '2020', this.footerWrapper);
    this.school = create('a', 'logo', null, this.footerWrapper, ['href', 'https://rs.school/js/']);
  }

  init() {
    this.footer.appendChild(this.footerWrapper);

    const script = document.querySelector('script');
    document.body.insertBefore(this.footer, script);
  }
}

export default FooterComponent;
