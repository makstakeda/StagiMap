export const addZoomButtons = (map, options) => {
  const position = smOptions.zoom || {top: 80, left: 25};

  const zoomInControl = new ymaps.control.Button({
    data: {
      image: options.zoomButtons.inButton || zoomIn,
      title: options.zoomButtons.inText || localeStagiMap.zoomIn,
      style: options.zoomButtons.inStyle || 'width: 30px; height: 30px; border-radius: 20px 20px 0px 0px;'
    },
    options: {
      layout: ButtonLayout,
      noPlacemark: true
    }
  });

  zoomInControl.events.add('click', function () {
    if (map.getZoom() == 17) {
      return;
    };
    map.setZoom(map.getZoom() + 1);
  });

  map.controls.add(zoomInControl, {position: options.zoomButtons.inPosition ||  {top: position.top, left: position.left}});

  const zoomOutControl = new ymaps.control.Button({
    data: {
      image: options.zoomButtons.outButton || zoomOut,
      title: options.zoomButtons.outText || localeStagiMap.zoomOut,
      style: options.zoomButtons.outStyle || 'width: 30px; height: 30px; border-radius: 0px 0px 20px 20px;'
    },
    options: {
      layout: ButtonLayout,
      noPlacemark: true
    }
  });

  zoomOutControl.events.add('click', function () {
    if (map.getZoom() == 0) {
      return
    };
    map.setZoom(map.getZoom() - 1);
  });

  map.controls.add(zoomOutControl, {position: options.zoomButtons.outPosition || {top: position.top + 30, left: position.left}});
};
