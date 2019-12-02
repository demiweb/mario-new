import Popup from 'popup-simple';
import slider from './sliders/setSliders';
import setGallery from './setGallery';
import setLazy from './setLazy';
import { HAS_OPEN_POPUP, HAS_OPEN_MENU, NO_SCROLL } from '../constants';

class MyPopup extends Popup {
  get content() {
    return this.popup.querySelector('.js-popup-content');
  }

  get inner() {
    return this.popup.querySelector('.popup__inner');
  }

  get gallery() {
    return {
      slider: this.popup.querySelector('.js-slider[data-slider="gallery"]'),
      thumbs: this.popup.querySelector('.js-slider[data-slider="thumbs"]'),
    };
  }

  get url() {
    return this.btn.dataset.url;
  }

  addItemCardContent() {
    const update = () => {
      MyPopup.updatePlugins();

      const timeout = window.setTimeout(() => {
        if (this.inner) this.inner.removeEventListener('transitionend', update);
        window.clearTimeout(timeout);
      });
    };

    this.xhr = fetch(this.url)
      .then((responce) => responce.text())
      .then((text) => {
        if (this.content) this.content.innerHTML = text;
        if (this.inner) this.inner.addEventListener('transitionend', update);
      });
  }

  clearContent() {
    this.content.innerHTML = '';
  }

  removeItemCardContent() {
    slider.sliders = slider.sliders
      .filter((sliderObj) => sliderObj.container !== this.gallery.slider)
      .filter((sliderObj) => sliderObj.container !== this.gallery.thumbs);

    this.clearContent();
  }

  handleVideoClose() {
    this.video = this.popup.querySelector('video');
    this.video.pause();
  }

  handleItemModalOpen() {
    document.body.classList.remove(NO_SCROLL);
    if (!this.content) return;

    this.xhr = fetch(this.url)
      .then((responce) => responce.text())
      .then((text) => {
        if (this.content) this.content.innerHTML = text;
      });
  }

  handleItemModalClose() {
    this.clearContent();
  }

  onOpen() {
    if (this.name !== 'item-info-modal') {
      document.body.classList.add(HAS_OPEN_POPUP);
    }

    if (this.name === 'item-card') this.addItemCardContent();
    if (this.name === 'item-info-modal') this.handleItemModalOpen();
  }

  onClose() {
    if (this.name !== 'item-info-modal') {
      document.body.classList.remove(HAS_OPEN_POPUP);
    }

    if (this.name === 'item-card') this.removeItemCardContent();
    if (this.name === 'video') this.handleVideoClose();
    if (this.name === 'item-info-modal') this.handleItemModalClose();

    if (document.body.classList.contains(HAS_OPEN_MENU)) {
      document.body.classList.add(NO_SCROLL);
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
