/*global ymaps*/

import { addZoomButtons } from '../add_zoom_buttons';
import { navigationIcons } from '../navigation_icons';
import { getButtonLayout } from '../get_button_layout';

describe('addZoomButtons', () => {
  const MAP_ZOOM = 2;

  const map = {
    controls: { add: jest.fn() },
    setZoom: jest.fn(),
    getZoom: jest.fn(() => MAP_ZOOM)
  };

  const locale = {
    zoomIn: 'zoom in',
    zoomOut: 'zoom out'
  };

  afterEach(() => {
    ymaps.mocksStorage.reset();
    jest.clearAllMocks();
  });

  describe('adds the zoom buttons with expected callbacks', () => {
    const testFlow = zoomButtonOptions => {
      expect(ymaps.mocksStorage.get('ButtonInstance.count')).toBe(2);
      const buttonProps = ymaps.mocksStorage.get('ButtonInstance.props');
      expect(buttonProps[0]).toEqual({
        data: {
          image: zoomButtonOptions ? zoomButtonOptions.inButton : navigationIcons.zoomIn,
          title: zoomButtonOptions ? zoomButtonOptions.inText : locale.zoomIn,
          style: zoomButtonOptions ? zoomButtonOptions.inStyle : 'width: 30px; height: 30px; border-radius: 20px 20px 0px 0px;'
        },
        options: {
          layout: getButtonLayout(),
          noPlacemark: true
        }
      });
      expect(buttonProps[1]).toEqual({
        data: {
          image: zoomButtonOptions ? zoomButtonOptions.outButton : navigationIcons.zoomOut,
          title: zoomButtonOptions ? zoomButtonOptions.outText : locale.zoomOut,
          style: zoomButtonOptions ? zoomButtonOptions.outStyle : 'width: 30px; height: 30px; border-radius: 0px 0px 20px 20px;'
        },
        options: {
          layout: getButtonLayout(),
          noPlacemark: true
        }
      });

      expect(map.controls.add).toHaveBeenCalledTimes(2);
      expect(map.controls.add.mock.calls[0][0] instanceof ymaps.control.Button).toBeTruthy();
      expect(map.controls.add.mock.calls[0][1]).toEqual({
        position: zoomButtonOptions ? zoomButtonOptions.inPosition : { top: 80, left: 25 }
      });
      expect(map.controls.add.mock.calls[1][0] instanceof ymaps.control.Button).toBeTruthy();
      expect(map.controls.add.mock.calls[1][1]).toEqual({
        position: zoomButtonOptions ? zoomButtonOptions.outPosition : { top: 110, left: 25 }
      });

      expect(ymaps.mocksStorage.get('ButtonInstance.events.add.click').length).toBe(2);
      expect(map.getZoom).toHaveBeenCalledTimes(0);
      expect(map.setZoom).toHaveBeenCalledTimes(0);

      ymaps.mocksStorage.get('ButtonInstance.events.add.click')[0]();
      expect(map.getZoom).toHaveBeenCalledTimes(1);
      expect(map.setZoom).toHaveBeenCalledTimes(1);
      expect(map.setZoom.mock.calls[0][0]).toBe(MAP_ZOOM + 1);

      ymaps.mocksStorage.get('ButtonInstance.events.add.click')[1]();
      expect(map.getZoom).toHaveBeenCalledTimes(2);
      expect(map.setZoom).toHaveBeenCalledTimes(2);
      expect(map.setZoom.mock.calls[1][0]).toBe(MAP_ZOOM - 1);
    };

    it('zoom options are empty', () => {
      addZoomButtons(map, { zoomButtons: {} }, locale);
      testFlow(null);
    });

    it('zoom options are set', () => {
      const options = {
        zoomButtons: {
          inButton: 'zoom-in-path',
          inText: 'zoom-in-title',
          inStyle: 'zoom-in-style',
          inPosition: { top: 10, left: 20 },
          outButton: 'zoom-out-path',
          outText: 'zoom-out-title',
          outStyle: 'zoom-out-style',
          outPosition: { top: 100, left: 20 }
        }
      };

      addZoomButtons(map, options, locale);
      testFlow(options.zoomButtons);
    });
  });
});
