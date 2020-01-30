import { validateLocale } from './validate_locale';

export const createInitialState = () => {
  // trying to inject original script with passed parameters

  try {
    const localeRu = {
      langFail: 'Need to choose supported localization https://tech.yandex.com/maps/doc/intro/concepts/localization-docpage/',
      zoomIn: 'Приблизить',
      zoomOut: 'Отдалить',
      geolocation: 'Мое местопложение'
    };

    const localeEn = {
      langFail: 'Need to choose supported localization https://tech.yandex.com/maps/doc/intro/concepts/localization-docpage/',
      zoomIn: 'Zoom in',
      zoomOut: 'Zoom Out',
      geolocation: 'Use my location'
    };

    const scripts = document.getElementsByTagName('script');
    let src = scripts[scripts.length-1].src.split('?')[1];
    src = src == undefined ? [] : src.split('&');
    
    const query = {};
    src.forEach(function(item, i, arr) {
      let sStr = item.split('=');
      query[sStr[0]] = sStr[1];
    });

    if (!query.lang || !validateLocale(query.lang)) {
      localeStagiMap = localeEn;
      throw new SyntaxError(localeStagiMap.langFail);
    };

    const script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', `https://api-maps.yandex.ru/2.1/?lang=${query.lang}`);
    document.getElementsByTagName('head').item(0).appendChild(script);
    if (query.lang.substr(0, 2) == 'ru') {
      localeStagiMap = localeRu;
    } else {
      localeStagiMap = localeEn;
    };
  } catch (e) {
    throw e;
  };
};
