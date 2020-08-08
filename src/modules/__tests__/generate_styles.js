import { generateStyles, stylesTagId } from '../generate_styles';

describe('generateStyles', () => {
  let mapContainer;

  const mapClass = 'ymaps-2-1-77-map';

  beforeEach(() => {
    mapContainer = document.createElement('div');
    mapContainer.id = 'stagimap';

    const map = document.createElement('ymaps');
    map.className = mapClass;

    mapContainer.appendChild(map);
    document.body.appendChild(mapContainer);
  });

  afterEach(() => {
    mapContainer.remove();
  });

  it('generates custom styles based on version of API', () => {
    generateStyles();
    const generatedStyles = document.getElementById(stylesTagId);
    expect(generatedStyles.innerHTML.includes('.ym-api-button')).toBeTruthy();
    expect(generatedStyles.innerHTML.includes(`.${mapClass.slice(0, -4)}-default-cluster`)).toBeTruthy();
  });
});
