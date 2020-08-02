import { validateLocale } from './validate_locale';

export const createInitialState = ({ apiKey, selectedLocale}) => {
  // trying to inject original script with passed parameters

  let locale;

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
    src = src === undefined ? [] : src.split('&');
    
    const query = {};
    src.forEach(function(item, i, arr) {
      let sStr = item.split('=');
      query[sStr[0]] = sStr[1];
    });

    if (!selectedLocale || !validateLocale(selectedLocale)) {
      locale = localeEn;
      throw new SyntaxError(locale.langFail);
    };

    const script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', `https://api-maps.yandex.ru/2.1/?lang=${selectedLocale}&apikey=${apiKey}`);
    document.getElementsByTagName('head').item(0).appendChild(script);

    if (selectedLocale.substr(0, 2) === 'ru') {
      locale = localeRu;
    } else {
      locale = localeEn;
    };
  } catch (e) {
    throw e;
  };

  return new Promise(resolve => {
    const checkScriptLoading = setInterval(() => {
      if (window.ymaps && window.ymaps.Map) {
        clearInterval(checkScriptLoading);
        resolve({ locale });
      };
    }, 300);
  });
};
