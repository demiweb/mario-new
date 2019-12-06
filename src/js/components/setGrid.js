import Masonry from 'masonry-layout'
import { debounce } from 'throttle-debounce'

export default () => {
  const grids = [...document.querySelectorAll('.js-grid')]
  if (!grids.length) return

  grids.forEach(grid => {
    let msnry
    let allowInit = true

    function setGrid() {
      if (window.matchMedia('(min-width: 576px)').matches) {
        if (!allowInit) return

        msnry = new Masonry(grid, {
          itemSelector: '.js-grid-item',
        })
        allowInit = false
      } else if (msnry) {
        msnry.destroy()
        allowInit = true
      }
    }

    setGrid()
    const handleResize = debounce(200, setGrid)

    window.addEventListener('resize', handleResize)
  })
}
