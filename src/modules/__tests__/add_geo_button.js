/*global ymaps*/

import { addGeoButton } from '../add_geo_button';
import { navigationIcons } from '../navigation_icons';

describe('addGeoButton', () => {
  const map = {
    geoObjects: { add: jest.fn() },
    panTo: jest.fn(),
    controls: { add: jest.fn() }
  };

  const locale = {
    geolocation: 'my position'
  };

  const position = [50, -50];

  afterEach(() => {
    ymaps.mocksStorage.reset();
    jest.clearAllMocks();
  });

  describe('geo button is added and functional when', () => {
    const testFlow = geolocationOptions => {
      expect(ymaps.templateLayoutFactory.createClass).toHaveBeenCalledTimes(1);
      expect(ymaps.templateLayoutFactory.createClass.mock.calls[0][0]).toBe(
        '<div title="{{data.title}}" class="ym-api-button" style="{{data.style}}">' +
          '<img class="my-button__img" src="{{ data.image }}" width="100%">' +
        '</div>'
      );

      const locationProps = ymaps.mocksStorage.get('GeolocationControlInstance.props')[0][0];
      expect(locationProps).toEqual({
        data: {
          image: geolocationOptions ? geolocationOptions.geoButton : navigationIcons.urlButton,
          title: geolocationOptions ? geolocationOptions.geoText : locale.geolocation,
          style: geolocationOptions ? geolocationOptions.geoStyle : ''
        },
        options: { layout: 'created', noPlacemark: true }
      });

      const locationEvent = ymaps.mocksStorage.get('GeolocationControlInstance.events.add.locationchange')[0][0];
      expect(locationEvent).toBeDefined();

      expect(map.controls.add).toHaveBeenCalledTimes(1);
      expect(map.controls.add.mock.calls[0][0] instanceof ymaps.control.GeolocationControl).toBeTruthy();
      expect(map.controls.add.mock.calls[0][1]).toEqual({
        position: geolocationOptions ? geolocationOptions.geoPosition : { top: 10, left: 10 }
      });

      let placemarkProps;
      placemarkProps = ymaps.mocksStorage.get('PlacemarkInstance.props');

      expect(placemarkProps).toBeUndefined();
      expect(map.geoObjects.add).toHaveBeenCalledTimes(0);
      expect(map.panTo).toHaveBeenCalledTimes(0);

      locationEvent({ get: key => key === 'position' ? position : null });

      placemarkProps = ymaps.mocksStorage.get('PlacemarkInstance.props')[0];
      expect(placemarkProps[0]).toEqual(position);
      expect(placemarkProps[1]).toEqual({ balloonContent: '' });
      expect(placemarkProps[2]).toEqual({
        iconLayout: 'default#image',
        iconImageHref: geolocationOptions ? geolocationOptions.icon : navigationIcons.iconPoint,
        iconImageSize: geolocationOptions ? geolocationOptions.sizePoint : [47, 52],
        iconImageOffset: geolocationOptions ? geolocationOptions.offsetPoint : [-24, -52],
        balloonPanelMaxMapArea: 0
      });
      expect(map.geoObjects.add).toHaveBeenCalledTimes(1);
      expect(map.geoObjects.add.mock.calls[0][0] instanceof ymaps.Placemark).toBeTruthy();
      expect(map.panTo).toHaveBeenCalledTimes(1);
      expect(map.panTo.mock.calls[0][0]).toEqual(position);
    };

    it('geolocation options are empty', () => {
      addGeoButton(map, { geolocation: {} }, locale);
      testFlow(null);
    });

    it('geolocation options are set', () => {
      const geolocationOptions = {
        geoButton: 'button-path',
        geoText: 'button-text',
        geoStyle: 'styles',
        geoPosition: { top: 101, left: 101 },
        icon: 'icon-path',
        sizePoint: [30, 30],
        offsetPoint: [-15, 30]
      }

      addGeoButton(map, { geolocation: geolocationOptions }, locale);
      testFlow(geolocationOptions);
    });
  });

  it('geo button is NOT added if geolocation options are NOT defined', () => {
    addGeoButton(map, {}, locale);
    expect(ymaps.templateLayoutFactory.createClass).toHaveBeenCalledTimes(0);
    expect(map.controls.add).toHaveBeenCalledTimes(0);

    const locationProps = ymaps.mocksStorage.get('GeolocationControlInstance.props');
    expect(locationProps).toBeUndefined();

    const locationEvent = ymaps.mocksStorage.get('GeolocationControlInstance.events.add.locationchange');
    expect(locationEvent).toBeUndefined();

    expect(map.controls.add).toHaveBeenCalledTimes(0);

    const placemarkProps = ymaps.mocksStorage.get('PlacemarkInstance.props');

    expect(placemarkProps).toBeUndefined();
    expect(map.geoObjects.add).toHaveBeenCalledTimes(0);
    expect(map.panTo).toHaveBeenCalledTimes(0);
  });
});
