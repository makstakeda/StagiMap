export const validateLocale = locale => {
  const possibleLocales = ['tr-TR', 'en-US', 'ru-RU', 'ru_UA', 'uk_UA', 'tr_TR', 'en_US', 'ru_RU', 'ru_UA', 'uk_UA', 'tr', 'en', 'ru', 'uk'];
  return possibleLocales.includes(locale);
};
