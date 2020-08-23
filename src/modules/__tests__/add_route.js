/*global ymaps*/

import { addRoute } from '../add_route';

describe('addRoute', () => {
  const map = {
    geoObjects: { add: jest.fn() }
  };

  afterEach(() => {
    ymaps.mocksStorage.reset();
    jest.clearAllMocks();
  });

  describe('adds the route passed with options', () => {
    const testFlow = (routerOptions) => {
      const multiRouterProps = ymaps.mocksStorage.get('multiRouter.MultiRouteInstance.props')[0];
      expect(multiRouterProps[0]).toEqual({
        referencePoints: [routerOptions.startPoint, routerOptions.endPoint],
        params:{ results: routerOptions.maxWays || 2 }
      });
      expect(multiRouterProps[1]).toEqual({ boundsAutoApply:true });

      expect(map.geoObjects.add).toHaveBeenCalledTimes(1);

      if (routerOptions.refPoints) {
        expect(ymaps.mocksStorage.get('multiRouter.MultiRouteInstance.getReferencePoints.calls')).toBe(1);

        const setReferencePointsProps = ymaps.mocksStorage.get('multiRouter.MultiRouteInstance.setReferencePoints.props')[0];

        expect(setReferencePointsProps[0]).toEqual(routerOptions.refPoints.reverse());
        expect(setReferencePointsProps[1]).toEqual([1]);
      }
    };

    it('no ref points / maxWays is defined', () => {
      const options = {
        router: {
          maxWays: 1,
          startPoint: [50, -50],
          endPoint: [40, -40]
        }
      };

      addRoute(map, options);
      testFlow(options.router);
    });

    it('no ref points / maxWays is undefined', () => {
      const options = {
        router: {
          startPoint: [50, -50],
          endPoint: [40, -40]
        }
      };

      addRoute(map, options);
      testFlow(options.router);
    });

    it('ref points / maxWays is defined', () => {
      const options = {
        router: {
          maxWays: 1,
          startPoint: [50, -50],
          endPoint: [40, -40],
          refPoints: [[45, -45], [47, -47]]
        }
      };

      addRoute(map, options);
      testFlow(options.router);
    });

    it('ref points / maxWays is undefined', () => {
      const options = {
        router: {
          startPoint: [50, -50],
          endPoint: [40, -40],
          refPoints: [[45, -45], [47, -47]]
        }
      };

      addRoute(map, options);
      testFlow(options.router);
    });
  });
});
