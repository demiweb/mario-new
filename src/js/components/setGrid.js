import Masonry from 'masonry-layout';

export default () => {
  const grids = [...document.querySelectorAll('.js-grid')];
  if (!grids.length) return;

  grids.forEach((grid) => {
    const msnry = new Masonry(grid, {
      // options...
      itemSelector: '.js-grid-item',
      // columnWidth: 200
    });
  });
};
