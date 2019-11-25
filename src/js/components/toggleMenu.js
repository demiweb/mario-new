import {
  IS_ACTIVE, NO_SCROLL, IS_HIDDEN,
} from '../constants';

const HAS_OPEN_MENU = 'has-open-menu';

class Burger {
  init() {
    this._addListeners();
  }

  _addListeners() {
    this.onClick = this.handleClick.bind(this);
    this.onKeyDown = this.handleKeyDown.bind(this);

    document.addEventListener('click', this.onClick);
    document.addEventListener('keydown', this.onKeyDown);
  }

  handleClick(e) {
    this.toggle(e);
  }

  handleKeyDown(e) {
    if (e.keyCode && e.keyCode === 27) {
      if (!this.target) return;
      this.close();
    }
  }

  toggle(e) {
    this.btn = e.target.closest(`.${Burger.classNames.burger}`);
    if (!this.btn) return;

    e.preventDefault();
    e.stopPropagation();

    this.name = this.btn.getAttribute('data-menu-target');
    this.target = this.name
      ? document.querySelector(`.${Burger.classNames.menu}[data-menu="${this.name}"]`)
      : document.querySelector(`.${Burger.classNames.menu}`);

    this.btn.classList.toggle(IS_ACTIVE);
    this.target.classList.toggle(IS_ACTIVE);

    if (this.onToggle) {
      this.onToggle();
    }

    if (!this.target.classList.contains(IS_ACTIVE) && this.onClose) {
      this.onClose();
    }
  }

  close() {
    this.burgers = [...document.querySelectorAll(`.${Burger.classNames.burger}`)];
    this.targets = [...document.querySelectorAll(`.${Burger.classNames.menu}`)];

    if (this.burgers.length > 0 && this.targets.length > 0) {
      this.burgers.forEach((btn) => btn.classList.remove(IS_ACTIVE));
      this.targets.forEach((menu) => menu.classList.remove(IS_ACTIVE));

      if (this.onClose) {
        this.onClose();
      }
    }
  }
}

Burger.classNames = {
  burger: 'js-burger',
  menu: 'js-menu',
};

export default function toggleMenu() {
  const burger = new Burger();
  burger.onToggle = () => {
    document.body.classList.toggle(NO_SCROLL);
    document.body.classList.toggle(HAS_OPEN_MENU);
  };
  burger.onClose = () => {
    document.body.classList.remove(NO_SCROLL);
    document.body.classList.remove(HAS_OPEN_MENU);
  };
  burger.init();

  // close menu
  const close = 'js-menu-close';

  document.addEventListener('click', (e) => {
    const btn = e.target.closest(`.${close}`);
    const menu = e.target.classList.contains('js-menu') ? e.target : null;
    // const closeBtn = btn || menu;
    const closeBtn = btn;
    if (!closeBtn) return;

    e.preventDefault();
    burger.close();
  });
}
