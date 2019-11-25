import Popup from 'popup-simple';
import slider from './sliders/setSliders';
import setGallery from './setGallery';
import setLazy from './setLazy';

const HAS_OPEN_POPUP = 'has-open-popup';

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

  addItemCardContent() {
    this.url = this.btn.dataset.url;

    const update = () => {
      MyPopup.updatePlugins();

      const timeout = window.setTimeout(() => {
        if (this.inner) this.inner.removeEventListener('transitionend', update);
        window.clearTimeout(timeout);
      }, 0);
    };

    this.xhr = fetch(this.url)
      .then((responce) => responce.text())
      .then((text) => {
        if (this.content) this.content.innerHTML = text;
        if (this.inner) this.inner.addEventListener('transitionend', update);
      });
  }

  removeItemCardContent() {
    slider.sliders = slider.sliders
      .filter((sliderObj) => sliderObj.container !== this.gallery.slider)
      .filter((sliderObj) => sliderObj.container !== this.gallery.thumbs);

    this.content.innerHTML = '';
  }

  handleVideoClose() {
    this.video = this.popup.querySelector('video');
    this.video.pause();
  }

  onOpen() {
    document.body.classList.add(HAS_OPEN_POPUP);
    if (this.name === 'item-card') this.addItemCardContent();
  }

  onClose() {
    document.body.classList.remove(HAS_OPEN_POPUP);
    if (this.name === 'item-card') this.removeItemCardContent();
    if (this.name === 'video') this.handleVideoClose();
  }

  static updatePlugins() {
    setLazy();
    slider.init();
    setGallery();
  }
}

const popup = new MyPopup();

export default popup;
