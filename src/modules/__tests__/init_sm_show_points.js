/*global ymaps*/

import { initSmShowPoints } from '../init_sm_show_points';
import { navigationIcons } from '../navigation_icons';

describe('initSmShowPoints', () => {
  let options;

  const map = {
    geoObjects: {
      remove: jest.fn(),
      removeAll: jest.fn(),
      add: jest.fn(),
      getBounds: jest.fn(() => 'get-bounds')
    },
    setBounds: jest.fn()
  };

  const smElementId = 'sm-move-center';

  const createSmShowElement = index => {
    const smElement = document.createElement('button');
    smElement.id = smElementId;
    smElement.setAttribute('sm-show', index);
    document.body.appendChild(smElement);

    return smElement;
  };

  const testFlow = (withRoute, withClustering, missedProps) => {
    const smElement = createSmShowElement(1);

    if (!withRoute) {
      delete options.router;
    }

    if (missedProps) {
      options.data.forEach(point => {
        delete point.icon;
        delete point.sizePoint;
        delete point.offsetPoint;
      });
    }

    initSmShowPoints(map, options);
    expect(map.geoObjects.removeAll).toHaveBeenCalledTimes(0);
    expect(map.geoObjects.add).toHaveBeenCalledTimes(0);
    expect(map.setBounds).toHaveBeenCalledTimes(0);
    expect(map.geoObjects.getBounds).toHaveBeenCalledTimes(0);

    smElement.click();
    if (withRoute && !withClustering) {
      expect(map.geoObjects.removeAll).toHaveBeenCalledTimes(1);
      expect(map.geoObjects.add).toHaveBeenCalledTimes(2);
      expect(map.geoObjects.add.mock.calls[0][0] instanceof ymaps.multiRouter.MultiRoute).toBeTruthy();
      const routeProps = ymaps.mocksStorage.get('multiRouter.MultiRouteInstance.props')[0];
      expect(routeProps[0]).toEqual({
        referencePoints:[options.router.startPoint, options.router.endPoint],
        params:{ results: options.router.maxWays }
      });
      expect(routeProps[1]).toEqual({ boundsAutoApply:true });

      expect(ymaps.mocksStorage.get('multiRouter.MultiRouteInstance.getReferencePoints.calls')).toBe(1);

      const setReferencePointsProps = ymaps.mocksStorage.get('multiRouter.MultiRouteInstance.setReferencePoints.props')[0];

      expect(setReferencePointsProps[0]).toEqual(options.router.refPoints.reverse());
      expect(setReferencePointsProps[1]).toEqual([1]);

      expect(map.geoObjects.add.mock.calls[1][0] instanceof ymaps.Placemark).toBeTruthy();
    } else if (!withRoute && !withClustering) {
      expect(map.geoObjects.removeAll).toHaveBeenCalledTimes(1);
      expect(map.geoObjects.add).toHaveBeenCalledTimes(1);
      expect(map.geoObjects.add.mock.calls[0][0] instanceof ymaps.Placemark).toBeTruthy();
    } else if (withClustering) {
      expect(map.geoObjects.removeAll).toHaveBeenCalledTimes(0);
      expect(map.geoObjects.add).toHaveBeenCalledTimes(1);

      expect(map.geoObjects.add.mock.calls[0][0] instanceof ymaps.Clusterer).toBeTruthy();
      expect(ymaps.mocksStorage.get('ClustererInstance.props')[0][0]).toEqual({
        clusterBalloonContentLayoutWidth: 400,
        clusterBalloonContentLayoutHeight: 300,
        clusterBalloonAccordionShowIcons: false,
        clusterBalloonContentLayout: 'cluster#balloonAccordion',
        clusterDisableClickZoom: true,
        clusterOpenBalloonOnClick: true,
        clusterIcons: [{
          href: navigationIcons.iconCluster,
          size: [56, 56],
          offset: [-28, -56]
        }]
      });

      const placemarkInstance = ymaps.mocksStorage.get('ClustererInstance.add')[0][0];
      expect(placemarkInstance instanceof ymaps.Placemark).toBeTruthy();
    }

    const placemarkProps = ymaps.mocksStorage.get('PlacemarkInstance.props')[0];
    expect(placemarkProps[0]).toEqual(options.data[1].coordinates);
    expect(placemarkProps[1]).toEqual({
      balloonContent: options.data[1].html,
      clusterCaption: options.data[1].title,
      hintContent: options.data[1].title
    });
    expect(placemarkProps[2]).toEqual({
      iconLayout: 'default#image',
      iconImageHref: missedProps ? navigationIcons.iconPlacemark : options.data[1].icon,
      iconImageSize: missedProps ? [42, 46] : options.data[1].sizePoint,
      iconImageOffset: missedProps ? [-21, -46] : options.data[1].offsetPoint,
      balloonPanelMaxMapArea: 0
    });
    expect(map.setBounds).toHaveBeenCalledTimes(1);
    expect(map.geoObjects.getBounds).toHaveBeenCalledTimes(1);
    expect(map.setBounds.mock.calls[0][0]).toBe(map.geoObjects.getBounds());
  };

  beforeEach(() => {
    options = {
      router: {
        maxWays: 1,
        startPoint: [50, -50],
        endPoint: [40, -40],
        refPoints: [[45, -45], [47, -47]]
      },
      cluster: true,
      data: [
        {
          coordinates: [34.4481, -119.2429],
          html: 'HTML#1',
          title: 'title#1',
          group: '0',
          icon: 'icon-path-1',
          sizePoint: [50, 50],
          offsetPoint: [-25, -50]
        },
        {
          coordinates: [34.9481, -119.9429],
          html: 'HTML#2',
          title: 'title#2',
          group: '1',
          icon: 'icon-path-2',
          sizePoint: [50, 50],
          offsetPoint: [-25, -50]
        }
      ]
    };
  });

  afterEach(() => {
    const smElement = document.getElementById(smElementId);
    if (smElement) {
      smElement.remove();
    }
    ymaps.mocksStorage.reset();
    jest.clearAllMocks();
  });

  describe('without clustering', () => {
    beforeEach(() => {
      options.cluster = false;
    });


    it('no missed props on points and route is NOT set', () => {
      testFlow(false, false, false);
    });

    it('no missed props on points and route is set', () => {
      testFlow(true, false, false);
    });

    it('missed props on points and route is NOT set', () => {
      testFlow(false, false, true);
    });

    it('missed props on points and route is set', () => {
      testFlow(true, false, true);
    });
  });

  describe('with clustering', () => {
    it('no missed props on points and route is NOT set', () => {
      testFlow(false, true, false);
    });

    it('no missed props on points and route is set', () => {
      testFlow(true, true, false);
    });

    it('missed props on points and route is NOT set', () => {
      testFlow(false, true, true);
    });

    it('missed props on points and route is set', () => {
      testFlow(true, true, true);
    });
  });
});
