import { validateLocale } from '../validate_locale';

describe('validateLocale', () => {
  test('returns `true` if locale is valid', () => {
    [
      'tr-TR', 'en-US', 'ru-RU', 'ru_UA', 'uk_UA', 'tr_TR',
      'en_US', 'ru_RU', 'ru_UA', 'uk_UA', 'tr', 'en', 'ru', 'uk'
    ].forEach(locale => {
      expect(validateLocale(locale)).toBeTruthy();
    });
  });

  test('returns `false` if locale is invalid', () => {
    expect(validateLocale('jp')).toBeFalsy();
  });
});
