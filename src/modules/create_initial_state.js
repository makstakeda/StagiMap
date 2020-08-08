import { validateLocale } from './validate_locale';

export const localeRu = {
  langFail: 'Need to choose supported localization https://tech.yandex.com/maps/doc/intro/concepts/localization-docpage/',
  zoomIn: 'Приблизить',
  zoomOut: 'Отдалить',
  geolocation: 'Мое местопложение'
};

export const localeEn = {
  langFail: 'Need to choose supported localization https://tech.yandex.com/maps/doc/intro/concepts/localization-docpage/',
  zoomIn: 'Zoom in',
  zoomOut: 'Zoom Out',
  geolocation: 'Use my location'
};

export const createInitialState = ({ apiKey, selectedLocale }) => {
  // trying to inject original script with passed parameters
  let locale;

  try {
    if (!selectedLocale || !validateLocale(selectedLocale)) {
      locale = localeEn;
      throw new SyntaxError(locale.langFail);
    };

    const script = document.createElement('script');
    script.id = 'api-maps.yandex';
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
