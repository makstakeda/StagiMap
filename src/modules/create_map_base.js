/*global ymaps*/

export const createMapBase = (containerId, smOptions) => {
  const DEFAULT_ZOOM = 6;
  const MAX_ZOOM = 16;
  const MIN_ZOOM = 1;
  const TICK_LIMIT = 85;

  const myMap = new ymaps.Map(
    containerId,
    {
      center: smOptions.center || [0, 0],
      zoom: smOptions.initialZoom || DEFAULT_ZOOM,
      controls: []
    },
    {
      searchControlProvider: 'yandex#search',
      restrictMapArea: smOptions.restrictArea,
      suppressMapOpenBlock: true,
      maxZoom: smOptions.maxZoom || MAX_ZOOM,
      minZoom: smOptions.minZoom || MIN_ZOOM,
    }
  );

  myMap.action.setCorrection(tick => {
    const projection = myMap.options.get('projection');
    const mapSize = myMap.container.getSize();
    const tickCenter = projection.fromGlobalPixels(tick.globalPixelCenter, tick.zoom);
    const top = [tick.globalPixelCenter[0], tick.globalPixelCenter[1] - mapSize[1] / 2];
    const bottom = [tick.globalPixelCenter[0], tick.globalPixelCenter[1] + mapSize[1] / 2];
    const tickTop = projection.fromGlobalPixels(top, tick.zoom);
    const tickBottom = projection.fromGlobalPixels(bottom, tick.zoom);

    if (tickTop[0] > TICK_LIMIT) {
      tick.globalPixelCenter = projection.toGlobalPixels(
        [TICK_LIMIT, tickCenter[1]],
        tick.zoom
      );
      tick.globalPixelCenter = [tick.globalPixelCenter[0], tick.globalPixelCenter[1] + mapSize[1] / 2];
      tick.duration = 0;
    };

    if (tickBottom[0] < -TICK_LIMIT) {
      tick.globalPixelCenter = projection.toGlobalPixels(
        [-TICK_LIMIT, tickCenter[1]],
        tick.zoom
      );
      tick.globalPixelCenter = [tick.globalPixelCenter[0], tick.globalPixelCenter[1] - mapSize[1] / 2];
      tick.duration = 0;
    };

    return tick;
  });

  return myMap;
};
