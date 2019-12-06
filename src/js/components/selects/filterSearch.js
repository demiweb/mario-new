export default function filterSearch() {
  if (!this.searchInput) return

  this.searchInput.addEventListener('input', e => {
    const filter = e.currentTarget.value.toUpperCase()
    this.panelOptions.forEach(option => {
      const textValue = option.innerText
      if (textValue.toUpperCase().indexOf(filter) > -1) {
        option.style.display = ''
      } else {
        option.style.display = 'none'
      }
    })
  })
}
