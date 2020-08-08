/*global ymaps*/

import { createMapBase } from '../create_map_base';

describe('createMapBase', () => {
  const DEFAULT_ZOOM = 6;
  const MAX_ZOOM = 16;
  const MIN_ZOOM = 1;

  const containerId = 'sunisimo-map';


  afterEach(() => {
    ymaps.mocksStorage.reset();
    jest.clearAllMocks();
  });

  describe('creates map with correction when', () => {
    const testFlow = options => {
      const mapProps = ymaps.mocksStorage.get('MapInstance.props')[0];
      expect(mapProps[0]).toBe(containerId);
      expect(mapProps[1]).toEqual({
        center: options ? options.center : [0, 0],
        zoom: options ? options.initialZoom : DEFAULT_ZOOM,
        controls: []
      });
      expect(mapProps[2]).toEqual({
        searchControlProvider: 'yandex#search',
        restrictMapArea: options ? options.restrictArea : undefined,
        suppressMapOpenBlock: true,
        maxZoom: options ? options.maxZoom : MAX_ZOOM,
        minZoom: options ? options.minZoom : MIN_ZOOM,
      });

      expect(ymaps.mocksStorage.get('ButtonInstance.action.setCorrection').length).toBe(1);
      const setCorrectionCallback = ymaps.mocksStorage.get('ButtonInstance.action.setCorrection')[0];

      let tick;
      tick = setCorrectionCallback({ globalPixelCenter: [2000, -7000], zoom: 10 });
      expect(tick).toEqual({ globalPixelCenter: [ 850, -6500 ], zoom: 10, duration: 0 });

      tick = setCorrectionCallback({ globalPixelCenter: [-2000, -7000], zoom: 10 });
      expect(tick).toEqual({ globalPixelCenter: [ -850, -7500 ], zoom: 10, duration: 0 });

      tick = setCorrectionCallback({ globalPixelCenter: [200, -7000], zoom: 10 });
      expect(tick).toEqual({ globalPixelCenter: [ 200, -7000 ], zoom: 10 });
    };

    it('options are empty', () => {
      createMapBase(containerId, {});
      testFlow(null);
    });

    it('options are set', () => {
      const options = {
        center: [65, 55],
        initialZoom: 5,
        restrictArea: [[70, 30], [55, 65]],
        maxZoom: 10,
        minZoom: 3
      };

      createMapBase(containerId, options);
      testFlow(options);
    });
  });
});
