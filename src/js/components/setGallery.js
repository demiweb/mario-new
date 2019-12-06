import 'lightgallery.js'

export default function setGallery() {
  const lgs = [...document.querySelectorAll('.js-lightgallery')]

  if (!lgs.length) return

  lgs.forEach(lg => {
    // eslint-disable-next-line
    lightGallery(lg);
  })
}
