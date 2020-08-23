/*global ymaps*/

export const getButtonLayout = () => ymaps.templateLayoutFactory.createClass(
  '<div title="{{data.title}}" class="ym-api-button" style="{{data.style}}">' +
    '<img class="my-button__img" src="{{ data.image }}" width="100%">' +
  '</div>'
);
