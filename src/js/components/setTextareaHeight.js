import { debounce } from 'throttle-debounce';

class TextareaHeight {
  constructor(element, options) {
    this.defaultParameters = { focusedElement: null };
    this.options = { ...this.defaultParameters, ...options };
    this.elem = element;
  }

  adjustHeight(minHeight) {
    const outerHeight = parseInt(window.getComputedStyle(this.elem).height, 10);
    const diff = outerHeight - this.elem.clientHeight;

    this.elem.style.height = 0;
    this.height = Math.max(minHeight, this.elem.scrollHeight + diff);
    this.elem.style.height = `${this.height}px`;
  }

  addClassName() {
    this.options.focusedElement.classList.add(TextareaHeight.constants.HAS_FOCUS);
  }

  removeClassName() {
    this.options.focusedElement.classList.remove(TextareaHeight.constants.HAS_FOCUS);
  }

  init() {
    this._setHeight();
    this._setFocusClassName();
  }

  _setHeight() {
    this.minHeight = this.elem.scrollHeight;

    this.elem.addEventListener('input', () => {
      this.adjustHeight(this.minHeight);
    });

    const setHeightOnResize = debounce(200, () => {
      this.adjustHeight(this.minHeight);
    });

    window.addEventListener('resize', setHeightOnResize);
  }

  _setFocusClassName() {
    if (this.options.focusedElement) {
      this.elem.addEventListener('focus', this.addClassName.bind(this));
      this.elem.addEventListener('blur', this.removeClassName.bind(this));
    }
  }
}

TextareaHeight.constants = {
  HAS_FOCUS: 'has-focus',
};

export default function setTextareaHeight() {
  const textareas = [...document.querySelectorAll('.js-textarea')];

  if (!textareas.length) return;

  textareas.forEach((textarea) => {
    const taHeight = new TextareaHeight(textarea);
    taHeight.init();
  });
}
