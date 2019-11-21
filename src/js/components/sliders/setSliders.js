import Slider from './Slider';
import classNames from './classNames';

class MySlider {
  constructor(slider) {
    this.sliderClass = slider;
    this.sliders = [];
  }

  _getOptions() {
    this.getOptions = ({
      navigation, pagination, onInit,
    }) => ({
      hero: {
        slidesPerView: 1,
        navigation,
        pagination: {
          el: pagination,
          type: 'bullets',
          clickable: true,
        },
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        loop: true,
        on: {
          init: onInit,
        },
      },
      gallery: {
        navigation,
        on: {
          init: onInit,
        },
        // loop: true,
      },
      thumbs: {
        navigation,
        slidesPerView: 2,
        on: {
          init: onInit,
        },
        spaceBetween: 4,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        direction: 'vertical',
      },
      products: {
        navigation,
        slidesPerView: 1,
        on: {
          init: onInit,
        },
        spaceBetween: 4,
        breakpoints: {
          576: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          992: {
            slidesPerView: 4,
          },
        },
      },
    });
  }

  _initSliders() {
    this.productsSliders = this.containers.filter((container) => container.dataset.slider === 'products');
    this.gallerySliders = this.containers.filter((container) => container.dataset.slider === 'gallery');

    this.containers.forEach((container) => {
      if (container.classList.contains(classNames.plugin.initialized)) return;

      const name = container.dataset.slider;

      const slider = new Slider(container, this.getOptions);
      if (name !== 'gallery') {
        slider.init();
      }

      this.sliders = [...this.sliders, slider];
    });

    this.initGallerySliders();
    this.updateProductsSliders();
  }

  initGallerySliders() {
    if (!this.gallerySliders.length) return;

    const [thumbsSlider] = this.sliders.filter((slider) => slider.name === 'thumbs');
    this.thumbsSlider = thumbsSlider.swiper;

    this.sliders.forEach((sliderObj) => {
      const slider = sliderObj;
      if (slider.name === 'gallery') {
        slider.options.thumbs = {
          swiper: this.thumbsSlider,
        };
        slider.init();
      }
    });
  }

  updateProductsSliders() {
    if (!this.productsSliders) return;
    this.sliders.forEach((sliderObj) => {
      const slider = sliderObj;
      if (slider.name === 'products') {
        slider.swiper.update();
      }
    });
  }

  _observeProductsSlider() {
    if (!this.productsSliders.length) return;

    this.sliders.forEach((sliderObj) => {
      const slider = sliderObj;


      if (slider.name === 'products') {
        const { prevEl, nextEl } = slider.navigation;
        const observer = new MutationObserver((mutationsList) => {
          mutationsList.forEach((mutation) => {
            if (mutation.oldValue === 'false') {
              const updateSlider = () => {
                slider.swiper.update();
                const timeout = window.setTimeout(() => {
                  slider.container.removeEventListener('transitionend', updateSlider);
                  window.clearTimeout(timeout);
                }, 0);
              };

              slider.container.addEventListener('transitionend', updateSlider);
            }
          });
        });

        [prevEl, nextEl].forEach((button) => {
          observer.observe(button, {
            attributes: true,
            attributeFilter: ['aria-disabled'],
            attributeOldValue: true,
          });
        });
      }
    });
  }


  init() {
    this.containers = [...document.querySelectorAll(this.sliderClass)];
    if (!this.containers.length) return;

    this._getOptions();
    this._initSliders();
    this._observeProductsSlider();
  }
}

const mySlider = new MySlider('.js-slider');

export default mySlider;
