export const validateLocale = locale => {
  let status = false;
  const arr = ['tr-TR', 'en-US', 'ru-RU', 'ru_UA', 'uk_UA', 'tr_TR', 'en_US', 'ru_RU', 'ru_UA', 'uk_UA', 'tr', 'en', 'ru', 'uk'];
  arr.forEach(function(item, i, arr) {
    if (item === locale) {
      status = true;
    };
  });
  return status;
};
