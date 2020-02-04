/*global ymaps*/

import { createMapBase } from './create_map_base';
import { addZoomButtons } from './add_zoom_buttons';
import { addGeoButton } from './add_geo_button';
import { addPoints } from './add_points';
import { initSmShowPoints } from './init_sm_show_points';
import { addRoute } from './add_route';
import { generateStyles } from './generate_styles';
import { initSmMoveCenter } from './init_sm_move_center';
import { navigationIcons } from './navigation_icons';
import { createInitialState } from './create_initial_state';

export class StagiMap {
  constructor(options) {
    createInitialState({
      apiKey: options.apiKey,
      selectedLocale: options.locale
    })
      .then(state => {
        const myMap = createMapBase('stagimap', options);
  
        if (options.zoomButtons) {
          addZoomButtons(myMap, options, state.locale);
        };
        addGeoButton(myMap, options, state.locale);
      
        let section;
        if (options.cluster === true) {
          section = new ymaps.Clusterer({
            clusterBalloonContentLayoutWidth: 400,
            clusterBalloonContentLayoutHeight: 300,
            clusterBalloonAccordionShowIcons: false,
            clusterBalloonContentLayout: 'cluster#balloonAccordion',
            clusterDisableClickZoom: true,
            clusterOpenBalloonOnClick: true,
            clusterIcons: [{ href: navigationIcons.iconCluster, size: [56, 56], offset: [-28, -56] }]
          });
        } else {
          section = myMap.geoObjects;
        };
        addPoints(myMap, options, section);
      
        initSmShowPoints(myMap, options);
      
        if (options.router) {
          addRoute(myMap, options);
        };
      
        if (options.traffic === true) {
          new ymaps.traffic.provider.Actual({}, { infoLayerShown: true }).setMap(myMap);
        };
      
        generateStyles();
      
        initSmMoveCenter(myMap);
        ymaps.layout.storage.add();
      });
  }
}
