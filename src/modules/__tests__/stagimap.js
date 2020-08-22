/*global ymaps*/

import { StagiMap } from '../stagimap';

import { createMapBase } from '../create_map_base';
import { addZoomButtons } from '../add_zoom_buttons';
import { addGeoButton } from '../add_geo_button';
import { addPoints } from '../add_points';
import { initSmShowPoints } from '../init_sm_show_points';
import { addRoute } from '../add_route';
import { generateStyles } from '../generate_styles';
import { initSmMoveCenter } from '../init_sm_move_center';
import { navigationIcons } from '../navigation_icons';
import { createInitialState } from '../create_initial_state';

const mockMapInstance = { geoObjects: 'geo-objects-mock' };

jest.mock('../create_map_base', () => ({ createMapBase: jest.fn(() => mockMapInstance) }));
jest.mock('../add_zoom_buttons', () => ({ addZoomButtons: jest.fn() }));
jest.mock('../add_geo_button', () => ({ addGeoButton: jest.fn() }));
jest.mock('../add_points', () => ({ addPoints: jest.fn() }));
jest.mock('../init_sm_show_points', () => ({ initSmShowPoints: jest.fn() }));
jest.mock('../add_route', () => ({ addRoute: jest.fn() }));
jest.mock('../generate_styles', () => ({ generateStyles: jest.fn() }));
jest.mock('../init_sm_move_center', () => ({ initSmMoveCenter: jest.fn() }));
jest.mock('../create_initial_state', () => ({ createInitialState: jest.fn(() => Promise.resolve({ locale: 'en' })) }));

describe('StagiMap', () => {
  afterEach(() => {
    ymaps.mocksStorage.reset();
    jest.clearAllMocks();
  });

  test('initializes with zoom buttons', done => {
    const options = { apiKey: 'key', locale: 'en', zoomButtons: {} };
    const instance = new StagiMap(options);

    setTimeout(() => {
      expect(createInitialState).toHaveBeenCalledTimes(1);
      expect(createInitialState.mock.calls[0][0].apiKey).toBe(options.apiKey);
      expect(createInitialState.mock.calls[0][0].selectedLocale).toBe(options.locale);
      expect(createMapBase).toHaveBeenCalledTimes(1);
      expect(createMapBase.mock.calls[0][0]).toBe('stagimap');
      expect(createMapBase.mock.calls[0][1]).toEqual(options);
      expect(addZoomButtons).toHaveBeenCalledTimes(1);
      expect(addZoomButtons.mock.calls[0][0]).toEqual(mockMapInstance);
      expect(addZoomButtons.mock.calls[0][1]).toEqual(options);
      expect(addZoomButtons.mock.calls[0][2]).toBe(options.locale);
      expect(addGeoButton).toHaveBeenCalledTimes(1);
      expect(addGeoButton.mock.calls[0][0]).toEqual(mockMapInstance);
      expect(addGeoButton.mock.calls[0][1]).toEqual(options);
      expect(addGeoButton.mock.calls[0][2]).toBe(options.locale);
      expect(addPoints).toHaveBeenCalledTimes(1);
      expect(addPoints.mock.calls[0][0]).toEqual(mockMapInstance);
      expect(addPoints.mock.calls[0][1]).toEqual(options);
      expect(addPoints.mock.calls[0][2]).toBe(mockMapInstance.geoObjects);
      expect(initSmShowPoints).toHaveBeenCalledTimes(1);
      expect(initSmShowPoints.mock.calls[0][0]).toEqual(mockMapInstance);
      expect(initSmShowPoints.mock.calls[0][1]).toEqual(options);
      expect(addRoute).toHaveBeenCalledTimes(0);
      expect(ymaps.mocksStorage.get('traffic.provider.ActualInstance.count')).toBeUndefined();
      expect(generateStyles).toHaveBeenCalledTimes(1);
      expect(initSmMoveCenter).toHaveBeenCalledTimes(1);
      expect(initSmMoveCenter.mock.calls[0][0]).toEqual(mockMapInstance);
      expect(ymaps.layout.storage.add).toHaveBeenCalledTimes(1);
      done();
    });
  });

  test('initializes with clustering', done => {
    const options = { apiKey: 'key', locale: 'en', cluster: true };
    const instance = new StagiMap(options);

    setTimeout(() => {
      expect(createInitialState).toHaveBeenCalledTimes(1);
      expect(createInitialState.mock.calls[0][0].apiKey).toBe(options.apiKey);
      expect(createInitialState.mock.calls[0][0].selectedLocale).toBe(options.locale);
      expect(createMapBase).toHaveBeenCalledTimes(1);
      expect(createMapBase.mock.calls[0][0]).toBe('stagimap');
      expect(createMapBase.mock.calls[0][1]).toEqual(options);
      expect(addZoomButtons).toHaveBeenCalledTimes(0);
      expect(addGeoButton).toHaveBeenCalledTimes(1);
      expect(addGeoButton.mock.calls[0][0]).toEqual(mockMapInstance);
      expect(addGeoButton.mock.calls[0][1]).toEqual(options);
      expect(addGeoButton.mock.calls[0][2]).toBe(options.locale);
      expect(addPoints).toHaveBeenCalledTimes(1);
      expect(addPoints.mock.calls[0][0]).toEqual(mockMapInstance);
      expect(addPoints.mock.calls[0][1]).toEqual(options);
      expect(addPoints.mock.calls[0][2] instanceof ymaps.Clusterer).toBeTruthy();
      expect(ymaps.mocksStorage.get('ClustererInstance.props')[0][0]).toEqual({
        clusterBalloonContentLayoutWidth: 400,
        clusterBalloonContentLayoutHeight: 300,
        clusterBalloonAccordionShowIcons: false,
        clusterBalloonContentLayout: 'cluster#balloonAccordion',
        clusterDisableClickZoom: true,
        clusterOpenBalloonOnClick: true,
        clusterIcons: [{ href: navigationIcons.iconCluster, size: [56, 56], offset: [-28, -56] }]
      });
      expect(initSmShowPoints).toHaveBeenCalledTimes(1);
      expect(initSmShowPoints.mock.calls[0][0]).toEqual(mockMapInstance);
      expect(initSmShowPoints.mock.calls[0][1]).toEqual(options);
      expect(addRoute).toHaveBeenCalledTimes(0);
      expect(ymaps.mocksStorage.get('traffic.provider.ActualInstance.count')).toBeUndefined();
      expect(generateStyles).toHaveBeenCalledTimes(1);
      expect(initSmMoveCenter).toHaveBeenCalledTimes(1);
      expect(initSmMoveCenter.mock.calls[0][0]).toEqual(mockMapInstance);
      expect(ymaps.layout.storage.add).toHaveBeenCalledTimes(1);
      done();
    });
  });

  test('initializes with router', done => {
    const options = { apiKey: 'key', locale: 'en', router: {} };
    const instance = new StagiMap(options);

    setTimeout(() => {
      expect(createInitialState).toHaveBeenCalledTimes(1);
      expect(createInitialState.mock.calls[0][0].apiKey).toBe(options.apiKey);
      expect(createInitialState.mock.calls[0][0].selectedLocale).toBe(options.locale);
      expect(createMapBase).toHaveBeenCalledTimes(1);
      expect(createMapBase.mock.calls[0][0]).toBe('stagimap');
      expect(createMapBase.mock.calls[0][1]).toEqual(options);
      expect(addZoomButtons).toHaveBeenCalledTimes(0);
      expect(addGeoButton).toHaveBeenCalledTimes(1);
      expect(addGeoButton.mock.calls[0][0]).toEqual(mockMapInstance);
      expect(addGeoButton.mock.calls[0][1]).toEqual(options);
      expect(addGeoButton.mock.calls[0][2]).toBe(options.locale);
      expect(addPoints).toHaveBeenCalledTimes(1);
      expect(addPoints.mock.calls[0][0]).toEqual(mockMapInstance);
      expect(addPoints.mock.calls[0][1]).toEqual(options);
      expect(addPoints.mock.calls[0][2]).toBe(mockMapInstance.geoObjects);
      expect(initSmShowPoints).toHaveBeenCalledTimes(1);
      expect(initSmShowPoints.mock.calls[0][0]).toEqual(mockMapInstance);
      expect(initSmShowPoints.mock.calls[0][1]).toEqual(options);
      expect(addRoute).toHaveBeenCalledTimes(1);
      expect(addRoute.mock.calls[0][0]).toEqual(mockMapInstance);
      expect(addRoute.mock.calls[0][1]).toEqual(options);
      expect(ymaps.mocksStorage.get('traffic.provider.ActualInstance.count')).toBeUndefined();
      expect(generateStyles).toHaveBeenCalledTimes(1);
      expect(initSmMoveCenter).toHaveBeenCalledTimes(1);
      expect(initSmMoveCenter.mock.calls[0][0]).toEqual(mockMapInstance);
      expect(ymaps.layout.storage.add).toHaveBeenCalledTimes(1);
      done();
    });
  });

  test('initializes with traffic info', done => {
    const options = { apiKey: 'key', locale: 'en', traffic: true };
    const instance = new StagiMap(options);

    setTimeout(() => {
      expect(createInitialState).toHaveBeenCalledTimes(1);
      expect(createInitialState.mock.calls[0][0].apiKey).toBe(options.apiKey);
      expect(createInitialState.mock.calls[0][0].selectedLocale).toBe(options.locale);
      expect(createMapBase).toHaveBeenCalledTimes(1);
      expect(createMapBase.mock.calls[0][0]).toBe('stagimap');
      expect(createMapBase.mock.calls[0][1]).toEqual(options);
      expect(addZoomButtons).toHaveBeenCalledTimes(0);
      expect(addGeoButton).toHaveBeenCalledTimes(1);
      expect(addGeoButton.mock.calls[0][0]).toEqual(mockMapInstance);
      expect(addGeoButton.mock.calls[0][1]).toEqual(options);
      expect(addGeoButton.mock.calls[0][2]).toBe(options.locale);
      expect(addPoints).toHaveBeenCalledTimes(1);
      expect(addPoints.mock.calls[0][0]).toEqual(mockMapInstance);
      expect(addPoints.mock.calls[0][1]).toEqual(options);
      expect(addPoints.mock.calls[0][2]).toBe(mockMapInstance.geoObjects);
      expect(initSmShowPoints).toHaveBeenCalledTimes(1);
      expect(initSmShowPoints.mock.calls[0][0]).toEqual(mockMapInstance);
      expect(initSmShowPoints.mock.calls[0][1]).toEqual(options);
      expect(addRoute).toHaveBeenCalledTimes(0);
      expect(ymaps.mocksStorage.get('traffic.provider.ActualInstance.count')).toBe(1);
      const trafficProps = ymaps.mocksStorage.get('traffic.provider.ActualInstance.props');
      expect(trafficProps[0][0]).toEqual({});
      expect(trafficProps[0][1]).toEqual({ infoLayerShown: true });
      expect(ymaps.mocksStorage.get('traffic.provider.ActualInstance.setMap')[0]).toEqual(mockMapInstance);
      expect(generateStyles).toHaveBeenCalledTimes(1);
      expect(initSmMoveCenter).toHaveBeenCalledTimes(1);
      expect(initSmMoveCenter.mock.calls[0][0]).toEqual(mockMapInstance);
      expect(ymaps.layout.storage.add).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
