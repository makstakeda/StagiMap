/*global ymaps*/

import { getButtonLayout } from '../get_button_layout';

describe('getButtonLayout', () => {
  const expectedTemplate = 
    '<div title="{{data.title}}" class="ym-api-button" style="{{data.style}}">' +
      '<img class="my-button__img" src="{{ data.image }}" width="100%">' +
    '</div>';

  it('returns valid template for button', () => {
    const template = getButtonLayout();
    expect(ymaps.templateLayoutFactory.createClass.mock.calls[0][0]).toBe(expectedTemplate);
    expect(template).toBe('created');
  });
});
