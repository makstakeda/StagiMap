export const addPoints = (map, options, section) => {

  if (!options.data) {
    return
  };

  const listener = document.querySelectorAll('a[sm-point]').length != 0 ? true : false;

  for (let i = 0; i < options.data.length; i++) {
    section.add(new ymaps.Placemark(
      options.data[i].coordinates,
      {
        balloonContent: options.data[i].html,
        clusterCaption: options.data[i].title,
        hintContent: options.data[i].title
      }, {
        iconLayout: 'default#image',
        iconImageHref: options.data[i].icon || iconPlacemark,
        iconImageSize: options.data[i].sizePoint || [42, 46],
        iconImageOffset: options.data[i].offsetPoint || [-21, -46],
        balloonPanelMaxMapArea: 0
      }
    ));

    if (listener && document.querySelector('a[sm-point="'+i+'"]')) {
      document.querySelector('a[sm-point="'+i+'"]').addEventListener('click', function(event) {
        event.stopPropagation();
        event.preventDefault();
        map.setZoom(12);
        map.panTo(options.data[i].coordinates);
      });
    };
  };

  if (options.cluster) {
    map.geoObjects.add(section);
  };
}