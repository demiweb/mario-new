import Popup from 'popup-simple';
import slider from './sliders/setSliders';
import setGallery from './setGallery';
import setLazy from './setLazy';

class MyPopup extends Popup {
  get content() {
    return this.popup.querySelector('.js-popup-content');
  }

  get inner() {
    return this.popup.querySelector('.popup__inner');
  }

  addItemCardContent() {
    const self = this;
    this.url = this.btn.dataset.url;

    const update = (e) => {
      MyPopup.updatePlugins();

      const timeout = window.setTimeout(() => {
        if (self.inner) self.inner.removeEventListener('transitionend', update);
        window.clearTimeout(timeout);
      }, 66);
    };

    const xhr = new XMLHttpRequest();
    xhr.open('GET', this.url, true);
    xhr.onreadystatechange = function () {
      if (this.readyState !== 4) return;
      if (this.status !== 200) return; // or whatever error handling you want

      if (self.content) self.content.innerHTML = this.responseText;

      if (self.inner) self.inner.addEventListener('transitionend', update);
    };
    xhr.send();

    if (self.inner) self.inner.addEventListener('transitionend', update);
  }

  removeItemCardContent() {
    this.content.innerHTML = '';
  }

  onOpen() {
    if (this.name === 'item-card') {
      this.addItemCardContent();
    }
  }

  onClose() {
    if (this.name === 'item-card') {
      this.removeItemCardContent();
    }
  }

  static updatePlugins() {
    setLazy();
    slider.init();
    setGallery();
  }
}

const popup = new MyPopup();

export default popup;
