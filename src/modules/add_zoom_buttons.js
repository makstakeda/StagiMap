/*global ymaps*/

import { navigationIcons } from './navigation_icons';
import { getButtonLayout } from './get_button_layout';

export const addZoomButtons = (map, options, locale) => {
  const position = { top: 80, left: 25 };

  const zoomInControl = new ymaps.control.Button({
    data: {
      image: options.zoomButtons.inButton || navigationIcons.zoomIn,
      title: options.zoomButtons.inText || locale.zoomIn,
      style: options.zoomButtons.inStyle || 'width: 30px; height: 30px; border-radius: 20px 20px 0px 0px;'
    },
    options: {
      layout: getButtonLayout(),
      noPlacemark: true
    }
  });

  zoomInControl.events.add('click', function () {
    const currentZoom = map.getZoom();
    if (currentZoom === 17) {
      return;
    }

    map.setZoom(currentZoom + 1);
  });

  map.controls.add(zoomInControl, { position: options.zoomButtons.inPosition ||  { top: position.top, left: position.left } });

  const zoomOutControl = new ymaps.control.Button({
    data: {
      image: options.zoomButtons.outButton || navigationIcons.zoomOut,
      title: options.zoomButtons.outText || locale.zoomOut,
      style: options.zoomButtons.outStyle || 'width: 30px; height: 30px; border-radius: 0px 0px 20px 20px;'
    },
    options: {
      layout: getButtonLayout(),
      noPlacemark: true
    }
  });

  zoomOutControl.events.add('click', function () {
    const currentZoom = map.getZoom();
    if (currentZoom === 0) {
      return;
    }

    map.setZoom(currentZoom - 1);
  });

  map.controls.add(zoomOutControl, { position: options.zoomButtons.outPosition || { top: position.top + 30, left: position.left } });
};
