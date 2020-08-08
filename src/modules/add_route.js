/*global ymaps*/

export const addRoute = (map, options) => {
  const multiRoute = new ymaps.multiRouter.MultiRoute(
    {
      referencePoints: [options.router.startPoint, options.router.endPoint],
      params:{ results: options.router.maxWays || 2 }
    },
    {
      boundsAutoApply:true
    }
  );

  map.geoObjects.add(multiRoute);

  if (options.router.refPoints) {
    const referencePoints = multiRoute.model.getReferencePoints();
    const refPoints = options.router.refPoints;

    for (let i = 0; i < refPoints.length; i++) {
      referencePoints.splice(-1, 0, [refPoints[i][0], refPoints[i][1]]);
      multiRoute.model.setReferencePoints(referencePoints, [1]);
    };
  };
};