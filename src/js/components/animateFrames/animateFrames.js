import { debounce } from 'throttle-debounce'
import Animator from './Animator'
import { isTouch } from '../../helpers'

class FramesAnimator {
  constructor(section) {
    this.section = section
    this.dom = {
      img: section.querySelector('.js-scroll-frames-img'),
      section,
      blocks: [...document.querySelectorAll('.js-scroll-frames-block')],
    }
    this.animator = new Animator(this.dom)
    this.inited = false
  }

  handleObserving(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (this.animator.inited) {
          this.animator.update()
        } else {
          this.animator.init()
        }
      } else {
        this.animator.stop()
      }
    })
  }

  _observeVisibility() {
    this.observer = new IntersectionObserver(this.handleObserving.bind(this))
    this.observer.observe(this.section)
  }

  _disableJsAnimAnimations() {
    const { blocks } = this.dom
    if (!blocks.length) return

    blocks.forEach(block => block.classList.remove('js-anim-el'))
    if (blocks.length === 2) {
      const staggerEls = [
        ...blocks[1].querySelectorAll('.js-scroll-frames-stagger-el'),
      ]
      staggerEls.forEach(block => block.classList.remove('js-anim-el'))
    }
  }

  init() {
    this._disableJsAnimAnimations()
    this._observeVisibility()
    this.inited = true
  }

  destroy() {
    this.observer.unobserve(this.section)
    this.animator.destroy()
    this.inited = false
  }
}

export default () => {
  if (isTouch) return
  const sections = [...document.querySelectorAll('.js-scroll-frames-section')]
  if (!sections.length) return

  let framesAnimator

  function initAnimator() {
    if (!window.matchMedia('(min-width: 768px)').matches) {
      if (framesAnimator) framesAnimator.destroy()
      return
    }
    if (framesAnimator && framesAnimator.inited) return

    sections.forEach(section => {
      framesAnimator = new FramesAnimator(section)
      framesAnimator.init()
    })
  }

  initAnimator()

  const onResize = debounce(200, initAnimator)
  window.addEventListener('resize', onResize)
}
