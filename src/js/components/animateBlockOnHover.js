export default function animateBlockOnHover() {
  const blockClass = 'stage'
  const blocks = [...document.querySelectorAll(`.${blockClass}`)]
  if (!blocks.length) return

  blocks.forEach(block => {
    const title = block.querySelector('.stage__title')
    title.style.maxHeight = `${title.scrollHeight}px`
  })

  function onMouseLeave(e) {
    const block = e.currentTarget
    const text = block.querySelector('.stage__descr')

    text.style.maxHeight = '0px'
    block.removeEventListener('mouseleave', onMouseLeave)
  }

  function onMouseOver(e) {
    const block = e.target.closest(`.${blockClass}`)
    if (!block) return

    const text = block.querySelector('.stage__descr')

    text.style.maxHeight = `${text.scrollHeight}px`

    block.addEventListener('mouseleave', onMouseLeave)
  }

  document.addEventListener('mouseover', onMouseOver)
}
