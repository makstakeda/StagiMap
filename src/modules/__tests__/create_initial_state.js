import { createInitialState, localeEn } from '../create_initial_state';

describe('createInitialState', () => {
  const apiKey = 'api-key';

  beforeEach(() => {
    const API_TIMEOUT = 500;

    setTimeout(() => {
      window.ymaps = { Map: {} };
    }, API_TIMEOUT)
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('creates initial state for further map processing', async () => {
    const config = await createInitialState({ apiKey, selectedLocale: 'en' });
    expect(config).toEqual({ locale: localeEn });
    expect(window.ymaps.Map).toBeDefined();

    const apiScript = document.getElementById('api-maps.yandex');
    expect(apiScript.src).toBe(`https://api-maps.yandex.ru/2.1/?lang=en&apikey=${apiKey}`);
  });

  it('fails to create initial state if locale is unsupported', () => {
    expect(() => createInitialState({ apiKey, selectedLocale: 'jp' })).toThrowError(new SyntaxError(localeEn.langFail));
  });
});
