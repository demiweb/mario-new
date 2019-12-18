import 'lightgallery.js'

export default function setGallery() {
  function initGalleries() {
    const lgs = [...document.querySelectorAll('.js-lightgallery')]

    if (!lgs.length) return

    lgs.forEach(lg => {
      // eslint-disable-next-line
      lightGallery(lg)
    })
  }

  function initTriggerGallery() {
    const btnClass = 'js-lightgallery-trigger'

    const onClick = e => {
      const btn = e.target.closest(`.${btnClass}`)
      if (!btn) return
      e.preventDefault()

      const imgs = btn.dataset.images
      if (!imgs) return

      const dynamicEl = []

      const images = imgs.split(',')
      images.forEach(src => {
        const obj = {
          src: src.trim(),
        }
        dynamicEl.push(obj)
      })

      // eslint-disable-next-line
      lightGallery(btn, {
        dynamic: true,
        dynamicEl,
      })
    }

    document.addEventListener('click', onClick)
  }

  initGalleries()
  initTriggerGallery()
}
