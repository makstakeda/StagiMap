export const initSmMoveCenter = map => {
  const movelinks = document.querySelectorAll('a[sm-move]');

  for (let i = 0; i < movelinks.length; i++) {
    movelinks[i].addEventListener('click', function(event) {
      event.stopPropagation();
      event.preventDefault();
      const element = event.target;
      const coordinates = element.getAttribute('sm-move').split(',');
      coordinates[0] = Number(coordinates[0]);
      coordinates[1] = Number(coordinates[1]);
      if (isNaN(coordinates[0]) || isNaN(coordinates[1])) {
        return console.error(`"${element.getAttribute('sm-move')}" are not correct params at "sm-move" attribute`);
      };
      map.setZoom(12);
      map.panTo(coordinates);
    });
  };
}