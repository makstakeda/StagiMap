/*global ymaps*/

import { addPoints } from '../add_points';
import { navigationIcons } from '../navigation_icons';

describe('addPoints', () => {
  const map = {
    geoObjects: { add: jest.fn() },
    panTo: jest.fn(),
    setZoom: jest.fn()
  };

  const section = {
    add: jest.fn()
  };

  const htmlSelector = 'html-point-integration';

  const data = [
    {
      coordinates: [34.4481, -119.2429],
      html: 'HTML#1',
      title: 'title#1',
      group: 0
    },
    {
      coordinates: [34.9481, -119.9429],
      html: 'HTML#2',
      title: 'title#2',
      group: 1
    }
  ];

  beforeEach(() => {
    const button = document.createElement('button');
    button.id = htmlSelector;
    button.setAttribute('sm-point', 0);
    document.body.appendChild(button);
  });

  afterEach(() => {
    document.getElementById(htmlSelector).remove();
    ymaps.mocksStorage.reset();
    jest.clearAllMocks();
  });

  describe('point is added based on options', () => {
    const testFlow = (customIcon, cluster) => {
      expect(section.add).toHaveBeenCalledTimes(2);
      expect(section.add.mock.calls[0][0] instanceof ymaps.Placemark).toBeTruthy();
      expect(section.add.mock.calls[1][0] instanceof ymaps.Placemark).toBeTruthy();
      expect(ymaps.mocksStorage.get('PlacemarkInstance.count')).toBe(2);
      const placemarkProps = ymaps.mocksStorage.get('PlacemarkInstance.props');
      expect(placemarkProps[0]).toEqual(data[1].coordinates);
      expect(placemarkProps[1]).toEqual({
        balloonContent: data[1].html,
        clusterCaption: data[1].title,
        hintContent: data[1].title
      });

      expect(placemarkProps[2]).toEqual({
        iconLayout: 'default#image',
        iconImageHref: customIcon ? customIcon.icon : navigationIcons.iconPlacemark,
        iconImageSize: customIcon ? customIcon.sizePoint : [42, 46],
        iconImageOffset: customIcon ? customIcon.offsetPoint : [-21, -46],
        balloonPanelMaxMapArea: 0
      });

      expect(map.geoObjects.add).toHaveBeenCalledTimes(cluster ? 1 : 0);
    };

    it('with default icon', () => {
      addPoints(map, { data }, section);
      testFlow(null, false);
    });

    it('with custom icon', () => {
      const customIcon = {
        icon: 'icon-path',
        sizePoint: [30, 30],
        offsetPoint: [-15, 30]
      };
  
      addPoints(map, { data: data.map(item => ({ ...item, ...customIcon })) }, section);
      testFlow(customIcon, false);
    });

    it('with additional clusterting', () => {
      addPoints(map, { data, cluster: true }, section);
      testFlow(null, true);
      expect(map.geoObjects.add).toHaveBeenCalledTimes(1);
    });
  });

  it('adds integration with HTML', () => {
    addPoints(map, { data }, section);

    document.getElementById(htmlSelector).click();

    expect(map.setZoom).toHaveBeenCalledTimes(1);
    expect(map.setZoom.mock.calls[0][0]).toBe(12);

    expect(map.panTo).toHaveBeenCalledTimes(1);
    expect(map.panTo.mock.calls[0][0]).toEqual(data[0].coordinates);
  });

  it('does nothing if no points passed with options', () => {
    addPoints(map, {}, section);
    expect(section.add).toHaveBeenCalledTimes(0);
    expect(map.geoObjects.add).toHaveBeenCalledTimes(0);
  });
});
