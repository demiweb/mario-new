import Select from 'select-custom';
import filterSearch from './filterSearch';

class CustomSelect extends Select {
  constructor(select, props) {
    super(select, props);
    this.name = select.dataset.type;
  }

  get searchInput() {
    return this.select.querySelector('.js-search');
  }

  get panelOptions() {
    return [...this.select.querySelectorAll('.custom-select__option')];
  }

  setTelOpenerInner() {
    const inner = this.opener.innerHTML;
    const currentOption = this.select.querySelector('.custom-select__option.is-selected');
    const { iso2 } = currentOption.dataset;

    this.opener.innerHTML = `<div class="custom-select__flag custom-select__flag-${iso2}"></div><div class="custom-select__opener-text">${inner}</div>`;
  }

  onClose() {
    if (this.name === 'tel-code') this.setTelOpenerInner();
  }

  onOpen() {
    if (this.name === 'tel-code') this.el.focus();
  }


  init() {
    if (
      this.select.classList
      && this.select.classList.contains('custom-select')
    ) {
      return;
    }
    super.init();

    filterSearch.call(this);
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
    panelItem: {
      position: 'top',
      item: '<input type="text" class="js-search" placeholder="Country code" />',
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
