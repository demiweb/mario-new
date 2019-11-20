import Popup from 'popup-simple';
import slider from './sliders/setSliders';
import setGallery from './setGallery';

class MyPopup extends Popup {
  get inner() {
    return this.popup.querySelector('.js-popup-inner');
  }

  addItemCardContent() {
    const self = this;
    this.url = this.btn.dataset.url;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', this.url, true);
    xhr.onreadystatechange = function () {
      if (this.readyState !== 4) return;
      if (this.status !== 200) return; // or whatever error handling you want

      self.inner.innerHTML = this.responseText;
      MyPopup.updatePlugins();
    };
    xhr.send();
  }

  removeItemCardContent() {
    this.inner.innerHTML = '';
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
    slider.init();
    setGallery();
  }
}

const popup = new MyPopup();

export default popup;
