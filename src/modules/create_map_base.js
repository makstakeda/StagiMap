/*global ymaps*/

export const createMapBase = (containerId, smOptions) => {
  const myMap = new ymaps.Map(containerId, {
    center: smOptions.center || [58.010374, 56.229398],
    zoom: smOptions.initialZoom || 6,
    controls: []
  }, {
    searchControlProvider: 'yandex#search',
    restrictMapArea: smOptions.restrictArea,
    suppressMapOpenBlock: true,
    maxZoom: smOptions.maxZoom || 16,
    minZoom: smOptions.minZoom || 1,
  });

  myMap.action.setCorrection(tick => {
    let projection = myMap.options.get('projection');
    let mapSize = myMap.container.getSize();
    let tickCenter = projection.fromGlobalPixels(tick.globalPixelCenter, tick.zoom);
    let top = [tick.globalPixelCenter[0], tick.globalPixelCenter[1] - mapSize[1] / 2];
    let bot = [tick.globalPixelCenter[0], tick.globalPixelCenter[1] + mapSize[1] / 2];
    let tickTop = projection.fromGlobalPixels(top, tick.zoom);
    let tickBot = projection.fromGlobalPixels(bot, tick.zoom);
    if (tickTop[0] > 85) {
      tick.globalPixelCenter = projection.toGlobalPixels(
        [85, tickCenter[1]],
        tick.zoom
      );
      tick.globalPixelCenter = [tick.globalPixelCenter[0], tick.globalPixelCenter[1] + mapSize[1] / 2];
      tick.duration = 0;
    };
    if (tickBot[0] < -85) {
      tick.globalPixelCenter = projection.toGlobalPixels(
        [-85, tickCenter[1]],
        tick.zoom
      );
      tick.globalPixelCenter = [tick.globalPixelCenter[0], tick.globalPixelCenter[1] - mapSize[1] / 2];
      tick.duration = 0;
    };
    return tick;
  });

  return myMap;
}