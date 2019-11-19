import { throttle } from 'throttle-debounce';

const IS_WHITE = 'is-white';

class Header {
  constructor(header) {
    this.header = header;
    this.logo = header.querySelector('.logo img');
    this.logoSrc = this.logo
      ? this.logo.getAttribute('data-src') || this.logo.src
      : null;
  }

  toggleLogoSrc(state) {
    if (state === 'white') {
      this.logo.src = this.logoSrc.replace(/logo-white.png/gi, 'logo.png');
    } else {
      this.logo.src = this.logoSrc.replace(/logo.png/gi, 'logo-white.png');
    }
  }

  toggleState() {
    if (this.logoSrc.indexOf('logo-white.png') < 0) return;

    if (window.pageYOffset > this.header.offsetHeight) {
      this.header.classList.add(IS_WHITE);
      this.toggleLogoSrc('white');
    } else {
      this.header.classList.remove(IS_WHITE);
      this.toggleLogoSrc();
    }
  }

  _scroll() {
    this.toggleState();
  }

  _addListeners() {
    this.onScroll = throttle(66, this._scroll.bind(this));

    window.addEventListener('scroll', this.onScroll);
  }

  init() {
    this._addListeners();
  }
}

export default function handleHeaderOnScroll() {
  const header = document.querySelector('.js-header');
  if (!header) return;

  const h = new Header(header);
  h.init();
}
