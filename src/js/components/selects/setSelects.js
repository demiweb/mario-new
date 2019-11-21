import Select from 'select-custom';

class CustomSelect extends Select {
  constructor(select, props) {
    super(select, props);
    this.name = select.dataset.type;
  }

  setTelOpenerInner(e) {
    const timeout = window.setTimeout(() => {
      const inner = this.opener.innerHTML;
      const currentOption = this.el.querySelector(`[value="${e.target.value}"]`);
      const { iso2 } = currentOption.dataset;

      this.opener.innerHTML = `<div class="custom-select__flag custom-select__flag-${iso2}"></div><div class="custom-select__opener-text">${inner}</div>`;
      window.clearTimeout(timeout);
    }, 0);
  }

  onChange(e) {
    if (this.name === 'tel-code') this.setTelOpenerInner(e);
  }

  onOpen() {
    if (this.name === 'tel-code') this.el.focus();
  }

  _addListeners() {
    this.select.addEventListener('change', this.onChange.bind(this));
  }

  init() {
    if (
      this.select.classList
      && this.select.classList.contains('custom-select')
    ) {
      return;
    }
    super.init();

    this._addListeners();
  }
}

const selects = [...document.querySelectorAll('.js-select')];

const customSelects = [];

const props = {
  'tel-code': {
    optionBuilder(opt, customOpt) {
      const customOption = customOpt;
      const inner = customOption.innerHTML;
      const { iso2 } = customOption.dataset;
      customOption.innerHTML = `<div class="custom-select__flag custom-select__flag-${iso2}"></div><div class="custom-select__option-text">${inner}</div>`;
    },
  },
};

selects.forEach((select) => {
  if (!select) return;

  const name = select.dataset.type;
  const customSelect = new CustomSelect(select, props[name]);
  customSelects.push(customSelect);
});

export default customSelects;
