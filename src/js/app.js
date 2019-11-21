import 'core-js/features/symbol';
import 'core-js/features/array/from';
import 'core-js/features/promise';
import 'core-js/features/object/assign';
import 'intersection-observer';
import './lib/polyfill';

import sayHello from './lib/sayHello';
import setHTMLClassNames from './components/setHTMLClassNames';
import setLazy from './components/setLazy';
import slider from './components/sliders/setSliders';
import { setVhProperty } from './helpers';
import toggleMenu from './components/toggleMenu';
import handleHeaderOnScroll from './components/handleHeaderOnScroll';
import setGrid from './components/setGrid';
import setGallery from './components/setGallery';
import popup from './components/setPopups';
import toggleInputFocus from './components/toggleInputFocus';
import setTextareaHeight from './components/setTextareaHeight';
import customSelects from './components/selects/setSelects';
import handleTelInput from './components/tel-input/handleTelInput';

document.addEventListener('DOMContentLoaded', () => {
  sayHello();
  setHTMLClassNames();
  setLazy();
  setVhProperty();

  slider.init();
  toggleMenu();
  handleHeaderOnScroll();
  setGrid();
  setGallery();
  popup.init();
  toggleInputFocus();
  setTextareaHeight();

  customSelects.forEach((select) => { select.init(); });
  handleTelInput();
});
