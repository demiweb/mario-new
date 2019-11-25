import countriesData from './data';
import customSelects from '../selects/setSelects';
import { IS_DISABLED } from '../../constants';

class TelInput {
  constructor(wrap) {
    this.wrap = wrap;
    this.select = wrap.querySelector('select');
    this.input = wrap.querySelector('input[type="tel"]');
    this.inputWrap = this.input.closest('.input');
  }

  onSelectChange() {
    if (this.select.value) {
      this.inputWrap.classList.remove(IS_DISABLED);

      this.input.value = '';

      this.input.focus();
    }
  }

  _createSelectList() {
    countriesData.forEach((country) => {
      const option = document.createElement('option');
      const {
        name, dialCode, iso2, areaCodes, priority,
      } = country;
      option.innerHTML = `<span>+${country.dialCode}</span> ${name}`;

      option.value = dialCode;

      option.setAttribute('data-name', name);
      option.setAttribute('data-iso2', iso2);
      option.setAttribute('data-priority', priority);
      option.setAttribute('data-areaCodes', areaCodes);

      this.select.appendChild(option);
    });
  }

  _initTelInput() {
    this.inputWrap.classList.add(IS_DISABLED);

    customSelects.forEach((select) => {
      if (select.el === this.select) {
        select.destroy();
        select.init();
      }
    });
  }

  _addListeners() {
    this.select.addEventListener('change', this.onSelectChange.bind(this));
  }

  init() {
    this._createSelectList();
    this._initTelInput();
    this._addListeners();
  }
}

export default () => {
  const inputs = [...document.querySelectorAll('.js-tel-input')];
  if (!inputs.length) return;

  inputs.forEach((input) => {
    const telInput = new TelInput(input);
    telInput.init();
  });
};
