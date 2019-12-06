import Popup from 'popup-simple'
import slider from './sliders/setSliders'
import setGallery from './setGallery'
import setLazy from './setLazy'
import {
  HAS_OPEN_POPUP,
  HAS_OPEN_MENU,
  NO_SCROLL,
  IS_ACTIVE,
} from '../constants'

class MyPopup extends Popup {
  constructor(options) {
    super(options)
    this.btns = [...document.querySelectorAll('.js-popup-open')]
  }

  get content() {
    return this.popup.querySelector('.js-popup-content')
  }

  get inner() {
    return this.popup.querySelector('.popup__inner')
  }

  get gallery() {
    return {
      slider: this.popup.querySelector('.js-slider[data-slider="gallery"]'),
      thumbs: this.popup.querySelector('.js-slider[data-slider="thumbs"]'),
    }
  }

  get url() {
    return this.btn.dataset.url
  }

  get isModal() {
    return this.btn.dataset.popupModal
  }

  // addItemCardContent() {
  //   const update = () => {
  //     MyPopup.updatePlugins();

  //     const timeout = window.setTimeout(() => {
  //       if (this.inner) this.inner.removeEventListener('transitionend', update);
  //       window.clearTimeout(timeout);
  //     });
  //   };

  //   this.xhr = fetch(this.url)
  //     .then((responce) => responce.text())
  //     .then((text) => {
  //       if (this.content) this.content.innerHTML = text;
  //       if (this.inner) this.inner.addEventListener('transitionend', update);
  //     });
  // }

  clearContent() {
    this.content.innerHTML = ''
  }

  removeItemCardContent() {
    slider.sliders = slider.sliders
      .filter(sliderObj => sliderObj.container !== this.gallery.slider)
      .filter(sliderObj => sliderObj.container !== this.gallery.thumbs)

    this.clearContent()
  }

  handleVideoClose() {
    this.video = this.popup.querySelector('video')
    this.video.pause()
  }

  handleModalOpen() {
    document.body.classList.remove(NO_SCROLL)
    this.btn.classList.add(IS_ACTIVE)
  }

  handleModalClose() {
    this.btn.classList.remove(IS_ACTIVE)
  }

  onOpen() {
    this.duplBtn = this.btn
    this.btns.forEach(btn => btn.classList.remove(IS_ACTIVE))

    if (!this.isModal) {
      document.body.classList.add(HAS_OPEN_POPUP)
    }

    // if (this.name === 'item-card') this.addItemCardContent();
    if (this.isModal) this.handleModalOpen()
  }

  onClose() {
    if (!this.isModal) {
      document.body.classList.remove(HAS_OPEN_POPUP)
    }

    if (this.name === 'video') this.handleVideoClose()
    if (this.isModal) this.handleModalClose()

    if (document.body.classList.contains(HAS_OPEN_MENU)) {
      document.body.classList.add(NO_SCROLL)
    }
  }

  addListeners() {
    document.addEventListener('click', e => {
      if (e.target.closest('.js-popup-open') || e.target.closest('.js-popup'))
        return
      // if (e.target.closest('.js-popup-open')) return;
      if (!this.openPopups.length) return
      this.closeTrigger = e.target
      this.btn = this.duplBtn
      this.closeAll()
      if (this.onClose) this.onClose()
    })
  }

  init() {
    super.init()
    this.addListeners()
  }

  static updatePlugins() {
    setLazy()
    slider.init()
    setGallery()
  }
}

const popup = new MyPopup()

export default popup
