import { createMapBase } from './create_map_base';
import { addZoomButtons } from './add_zoom_buttons';
import { addGeoButton } from './add_geo_button';
import { addPoints } from './add_points';
import { initSmShowPoints } from './init_sm_show_points';
import { addRoute } from './add_route';
import { generateStyles } from './generate_styles';
import { initSmMoveCenter } from './init_sm_move_center';

export const initStagiMap = () => {
  const myMap = createMapBase('stagimap', smOptions);

  if (smOptions.zoomButtons) {
    addZoomButtons(myMap, smOptions);
  };
  addGeoButton(myMap, smOptions);

  let section;
  if (smOptions.cluster === true) {
    section = new ymaps.Clusterer({
      clusterBalloonContentLayoutWidth: 400,
      clusterBalloonContentLayoutHeight: 300,
      clusterBalloonAccordionShowIcons: false,
      clusterBalloonContentLayout: 'cluster#balloonAccordion',
      clusterDisableClickZoom: true,
      clusterOpenBalloonOnClick: true,
      clusterIcons: [{ href: iconCluster, size: [56, 56], offset: [-28, -56] }]
    });
  } else {
    section = map.geoObjects;
  };
  addPoints(myMap, smOptions, section);

  initSmShowPoints(myMap, options);

  if (smOptions.router) {
    addRoute(myMap, smOptions);
  };

  if (smOptions.traffic === true) {
    new ymaps.traffic.provider.Actual({}, { infoLayerShown: true }).setMap(myMap);
  };

  generateStyles();

  initSmMoveCenter(myMap);
  ymaps.layout.storage.add();
};
