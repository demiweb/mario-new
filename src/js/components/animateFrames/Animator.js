export default class Animator {
  constructor(dom) {
    this.dom = dom;
    this.wrap = dom.img;
    this.section = dom.section;
    this.blocks = dom.blocks;
    if (this.blocks[1]) {
      this.staggerEls = [...this.blocks[1].querySelectorAll('.js-scroll-frames-stagger-el')];
    }
    this.size = {
      width: this.wrap.offsetWidth,
      height: this.wrap.offsetHeight,
    };
    this.data = this.wrap.dataset;
    this.scrollDistance = this.section.offsetHeight - this.section.offsetTop;

    this.inited = false;
    this.images = [];
    this.direction = undefined;
    this.index = 0;
    this.scrollTrigger = 0;
    this.scrollPosition = 0;
    this.allowDrawing = false;

    this.blocksState = {
      left: {
        isFinished: false,
      },
      right: {
        isFinished: false,
      },
    };
  }

  handleScroll() {
    const windowTop = window.pageYOffset;
    this.direction = windowTop > this.scrollTrigger ? 100 : -100;
    this.scrollTrigger = windowTop <= 0 ? 0 : windowTop;

    this.onSectionScroll();
    this.drawFrames();
    this.animateBlocks();
  }

  onSectionScroll() {
    const windowTop = window.pageYOffset;
    const sectionTop = this.section.getBoundingClientRect().top + document.body.scrollTop;
    const sectionBottom = sectionTop + this.section.offsetHeight;
    this.percentage = this.scrollDistance / 100;
    this.index = Math.floor(this.scrollPosition / this.percentage);

    if (sectionBottom <= window.innerHeight) {
      // bottom trigger
      this.scrollPosition = this.scrollDistance;
      this.allowDrawing = false;
    } else if (sectionTop <= 0) {
      // top trigger
      this.scrollPosition = (windowTop - this.section.offsetTop);
      this.allowDrawing = true;
    } else {
      this.allowDrawing = false;
    }

    if (!this.allowDrawing) {
      this.index = this.index > 90 ? 100 : 0;
    }
  }

  drawFrames() {
    if (!this.allowDrawing) return;

    const { width, height } = this.size;
    const percentage = this.scrollDistance / (this.images.length - 1);
    const index = Math.floor(this.scrollPosition / percentage);

    const currentImage = this.images[index];
    this.ctx.drawImage(
      currentImage,
      0,
      0,
      width,
      height,
    );
  }

  animateBlocks() {
    if (this.blocks.length !== 2) return;

    const index = this.index * 2;

    const animateLeft = () => {
      if (this.blocksState.left.isFinished) return;

      this.blocks[0].style.opacity = index / 100;
      this.blocks[0].style.transform = `translate3d(0px, ${70 - index}%, 0px)`;

      if (index > 70) {
        this.blocks[0].style.opacity = 1;
        this.blocks[0].style.transform = 'translate3d(0px, 0%, 0px)';

        this.blocksState.left.isFinished = true;
      }
    };

    const animateRight = () => {
      if (this.blocksState.right.isFinished) return;

      this.blocks[1].style.opacity = '1';
      if (!this.staggerEls.length) return;

      this.staggerEls.forEach((el, i) => {
        const block = el;
        const newIndex = index - (i * 15);

        block.style.opacity = (newIndex / 100) - 1;
        block.style.transform = `translate3d(0px, ${(200 - newIndex)}%, 0px)`;


        if (index >= 200) {
          block.style.opacity = 1;
          block.style.transform = 'translate3d(0px, 0%, 0px)';
          this.blocksState.right.isFinished = true;
        }

        // if (index < 100) {
        //   block.style.opacity = 0;
        //   block.style.transform = 'translate3d(0px, 0%, 0px)';
        //   this.blocksState.right.isFinished = false;
        // }
      });
    };

    animateLeft();
    animateRight();
  }

  resetBlocksStyles() {
    this.blocks.forEach((el) => {
      const block = el;
      block.style.opacity = '';
      block.style.transform = '';
    });

    if (!this.staggerEls.length) return;

    this.staggerEls.forEach((el) => {
      const block = el;
      block.style.opacity = '';
      block.style.transform = '';
    });
  }

  _addScene() {
    const { width, height } = this.size;
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = width;
    this.canvas.height = height;

    const img = this.section.getBoundingClientRect().top > 0
      ? this.images[0]
      : this.images[this.images.length - 1];

    img.onload = () => {
      this.ctx.drawImage(
        img,
        0,
        0,
        width,
        height,
      );
    };

    this.wrap.appendChild(this.canvas);
  }

  _addListeners() {
    this.onScroll = this.handleScroll.bind(this);

    window.addEventListener('scroll', this.onScroll);
  }

  _removeListeners() {
    window.removeEventListener('scroll', this.onScroll);
  }

  _createFrames() {
    const {
      frames, frameNmbStep, srcset,
    } = this.data;

    for (let i = 0; i < +frames; i++) {
      const frameNmb = (i * +frameNmbStep) + 1;

      let frameName;
      switch (frameNmb.toString().length) {
        case 5:
          frameName = frameNmb;
          break;
        case 4:
          frameName = `0${frameNmb}`;
          break;
        case 3:
          frameName = `00${frameNmb}`;
          break;
        case 2:
          frameName = `000${frameNmb}`;
          break;
        case 1:
          frameName = `0000${frameNmb}`;
          break;
        default:
          frameName = frameNmb;
          break;
      }

      const src = srcset.replace(/{frame}/i, frameName);
      const img = new Image();
      img.src = src;
      this.images.push(img);
    }
  }

  init() {
    this._createFrames();
    this._addScene();
    this._addListeners();

    this.inited = true;
  }

  stop() {
    this._removeListeners();
  }

  update() {
    this._addListeners();
  }

  destroy() {
    this._removeListeners();
    this.resetBlocksStyles();
    this.canvas.parentNode.removeChild(this.canvas);
  }
}
