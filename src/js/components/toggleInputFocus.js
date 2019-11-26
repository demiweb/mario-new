import { HAS_FOCUS, HAS_TEXT } from '../constants';

class FormInput {
  constructor(input) {
    this.input = input;
    this.wrap = input.closest('.input');
  }

  addFocus() {
    this.wrap.classList.add(HAS_FOCUS);
    this.handleText();
  }

  removeFocus() {
    this.wrap.classList.remove(HAS_FOCUS);
  }

  handleText() {
    if (this.input.value === 'placeholder') return;
    const valueMinNmb = 0;

    if (this.input.value.length > valueMinNmb) {
      this.wrap.classList.add(HAS_TEXT);
    } else {
      this.wrap.classList.remove(HAS_TEXT);
    }
  }

  handleFocus() {
    this.addFocus();
  }

  handleBlur() {
    const timeout = window.setTimeout(() => {
      const customSelect = this.wrap.querySelector('.custom-select');
      if (customSelect && customSelect.classList.contains('is-open')) return;
      this.removeFocus();

      window.clearTimeout(timeout);
    }, 200);
  }

  handleInput() {
    this.handleText();
  }

  onSelectChange() {
    this.handleText();
  }

  _addListeners() {
    this.input.addEventListener('focus', this.handleFocus.bind(this));
    this.input.addEventListener('blur', this.handleBlur.bind(this));
    if (this.input.nodeName.toLowerCase() === 'input') {
      this.input.addEventListener('input', this.handleInput.bind(this));
    }
    if (this.input.nodeName.toLowerCase() === 'select') {
      this.input.addEventListener('change', this.onSelectChange.bind(this));
    }
  }

  init() {
    if (!this.wrap) return;
    this._addListeners();
  }
}

export default function toggleInputFocus() {
  const inputs = [...document.querySelectorAll('.js-focused-input')];

  if (!inputs.length) return;

  inputs.forEach((input) => {
    const formInput = new FormInput(input);
    formInput.init();
  });
}
