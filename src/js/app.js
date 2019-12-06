import 'core-js/features/symbol'
import 'core-js/features/array/from'
import 'core-js/features/promise'
import 'core-js/features/object/assign'
import 'intersection-observer'
import 'whatwg-fetch'
import './lib/polyfill'

import sayHello from './lib/sayHello'
import setHTMLClassNames from './components/setHTMLClassNames'
import setLazy from './components/setLazy'
import slider from './components/sliders/setSliders'
import { setVhProperty } from './helpers'
import toggleMenu from './components/toggleMenu'
import handleHeaderOnScroll from './components/handleHeaderOnScroll'
import setGrid from './components/setGrid'
import setGallery from './components/setGallery'
import popup from './components/setPopups'
import toggleInputFocus from './components/toggleInputFocus'
import setTextareaHeight from './components/setTextareaHeight'
import customSelects from './components/selects/setSelects'
import handleTelInput from './components/tel-input/handleTelInput'
import animateFrames from './components/animateFrames/animateFrames'
import animateOnScroll from './components/animateOnScroll'

document.addEventListener('DOMContentLoaded', () => {
  sayHello()
  setHTMLClassNames()
  setLazy()
  setVhProperty()

  slider.init()
  toggleMenu()
  handleHeaderOnScroll()
  setGrid()
  setGallery()
  popup.init()
  toggleInputFocus()
  setTextareaHeight()

  customSelects.forEach(select => {
    if (select.name !== 'tel-code') select.init()
  })
  handleTelInput()
  animateFrames()
  animateOnScroll()
})
