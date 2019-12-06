import Swiper from 'swiper/js/swiper'
import setLazy from '../setLazy'
import classNames from './classNames'

export default class Slider {
  constructor(container, getOptions) {
    this.container = container
    this.name = container.dataset.slider
    this.wrap = container.closest(`.${classNames.slider.wrap}`)
    this.navigation = {
      prevEl: this.wrap.querySelector(`.${classNames.slider.prev}`),
      nextEl: this.wrap.querySelector(`.${classNames.slider.next}`),
    }
    this.pagination = this.wrap.querySelector(
      `.${classNames.slider.pagination}`
    )
    this.slides = [...container.querySelectorAll(`.${classNames.slider.slide}`)]

    this.nameMod = undefined // if need to reinit slider with different options

    this.options = getOptions({
      navigation: this.navigation,
      pagination: this.pagination,
      onInit: setLazy,
    })[this.nameMod || this.name]
  }

  _initPlugin() {
    this.swiper = new Swiper(this.container, this.options)
  }

  destroy(deleteInstance, cleanStyles) {
    if (!this.swiper.destroy) return
    this.swiper.destroy(deleteInstance, cleanStyles)
  }

  init() {
    this._initPlugin()
  }
}
