export const addGeoButton = (map, options) => {
  if (options.geolocation) {
    const ButtonLayout = ymaps.templateLayoutFactory.createClass(`
      <div title="{{data.title}}" class="ym-api-button" style="{{data.style}}">
        <img class="my-button__img" src="{{ data.image }}" width="100%">
      </div>
    `);

    const geolocationControl = new ymaps.control.GeolocationControl({
      data: {
        image: options.geolocation.geoButton || urlButton,
        title: options.geolocation.geoText || localeStagiMap.geolocation,
        style: options.geolocation.geoStyle || ''
      },
      options: {
        layout: ButtonLayout,
        noPlacemark: true
      }
    });

    let locationPlacemark;
    geolocationControl.events.add('locationchange', event => {
      const position = event.get('position');

      if (!locationPlacemark) {
        locationPlacemark = new ymaps.Placemark(
          position,
          {
            balloonContent: ''
          },
          {
            iconLayout: 'default#image',
            iconImageHref: options.geolocation.icon || iconPoint,
            iconImageSize: options.geolocation.sizePoint || [47, 52],
            iconImageOffset: options.geolocation.offsetPoint || [-24, -52],
            balloonPanelMaxMapArea: 0
          }
        );

        map.geoObjects.add(locationPlacemark);
      };

      locationPlacemark.geometry.setCoordinates(position);
      map.panTo(position);
    });

    map.controls.add(geolocationControl, {position: options.geolocation.geoPosition ||  {top: 10, left: 10}});
  };
};
