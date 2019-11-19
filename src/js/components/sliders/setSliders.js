import Slider from './Slider';
import classNames from './classNames';

class MySlider {
  constructor(slider) {
    this.sliderClass = slider;
    this.sliders = [];
  }

  _getOptions() {
    this.getOptions = ({
      container, prevButton, nextButton, onInit,
    }) => ({
      hero: {
        container,
        controls: false,
        onInit,
        items: 1,
        loop: true,
        nav: true,
        autoplay: true,
        // mouseDrag: true,
      },
    });
  }

  _initSliders() {
    this.containers.forEach((container) => {
      if (container.classList.contains(classNames.plugin.container)) return;

      const slider = new Slider(container, this.getOptions);
      slider.init();
      this.sliders = [...this.sliders, slider];
    });
  }


  init() {
    this.containers = [...document.querySelectorAll(this.sliderClass)];
    if (!this.containers.length) return;

    this._getOptions();
    this._initSliders();
  }
}

const slider = new MySlider('.js-slider');

export default slider;
