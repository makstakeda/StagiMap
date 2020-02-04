/*global ymaps*/

import { navigationIcons } from './navigation_icons';

export const initSmShowPoints = (map, options) => {
  const showPoints = document.querySelectorAll('a[sm-show]');
  for (var i = 0; i < showPoints.length; i++) {

    showPoints[i].addEventListener('click', event => {
      event.stopPropagation();
      event.preventDefault();
      let target = event.target;
      let prop = target.getAttribute('sm-show');

      let section;
      if (options.cluster) {
        map.geoObjects.remove(section);
        section = new ymaps.Clusterer({
          clusterBalloonContentLayoutWidth: 400,
          clusterBalloonContentLayoutHeight: 300,
          clusterBalloonAccordionShowIcons: false,
          clusterBalloonContentLayout: 'cluster#balloonAccordion',
          clusterDisableClickZoom: true,
          clusterOpenBalloonOnClick: true,
          clusterIcons: [{
            href: navigationIcons.iconCluster,
            size: [56, 56],
            offset: [-28, -56]
          }]
        });
      } else {
        map.geoObjects.removeAll();
        section = map.geoObjects;
        let referencePoints;
        let multiRoute;
        if (options.router) {
          multiRoute = new ymaps.multiRouter.MultiRoute({
            referencePoints:[options.router.startPoint,options.router.endPoint],
            params:{
              results: options.router.maxWays || 2
            }
          },{
            boundsAutoApply:true
          });
          map.geoObjects.add(multiRoute);
          referencePoints = multiRoute.model.getReferencePoints();
          if (options.router.refPoints) {
            let refPoints = options.router.refPoints;
            for (let i = 0; i < refPoints.length; i++) {
              referencePoints.splice(-1, 0, [refPoints[i][0], refPoints[i][1]]);
              multiRoute.model.setReferencePoints(referencePoints, [1]);
            };
          };
        };
      };

      if (!options.data) {
        return
      };

      if (prop === '') {
        for (let i = 0; i < options.data.length; i++) {
          section.add(new ymaps.Placemark(
            options.data[i].coordinates,
            {
              balloonContent: options.data[i].html,
              clusterCaption: options.data[i].title,
              hintContent: options.data[i].title
            }, {
              iconLayout: 'default#image',
              iconImageHref: options.data[i].icon || navigationIcons.iconPlacemark,
              iconImageSize: options.data[i].sizePoint || [42, 46],
              iconImageOffset: options.data[i].offsetPoint || [-21, -46],
              balloonPanelMaxMapArea: 0
            }
          ));
        };
      } else {
        for (let i = 0; i < options.data.length; i++) {
          if (prop === options.data[i].group) {
            section.add(new ymaps.Placemark(
              options.data[i].coordinates,
              {
                balloonContent: options.data[i].html,
                clusterCaption: options.data[i].title,
                hintContent: options.data[i].title
              }, {
                iconLayout: 'default#image',
                iconImageHref: options.data[i].icon || navigationIcons.iconPlacemark,
                iconImageSize: options.data[i].sizePoint || [42, 46],
                iconImageOffset: options.data[i].offsetPoint || [-21, -46],
                balloonPanelMaxMapArea: 0
              }
            ));
          };
        };
      };

      if (options.cluster) {
        map.geoObjects.add(section);
      };

      map.setBounds(map.geoObjects.getBounds());
    });
  };
};
