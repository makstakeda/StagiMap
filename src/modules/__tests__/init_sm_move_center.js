import { initSmMoveCenter } from '../init_sm_move_center';

describe('initSmMoveCenter', () => {
  const map = {
    setZoom: jest.fn(),
    panTo: jest.fn()
  };

  const smElementId = 'sm-move-center';

  const createSmMoveCenterElement = coordinates => {
    const smElement = document.createElement('button');
    smElement.id = smElementId;
    smElement.setAttribute('sm-move', coordinates.join(', '));
    document.body.appendChild(smElement);

    return smElement;
  };

  afterEach(() => {
    const smElement = document.getElementById(smElementId);
    if (smElement) {
      smElement.remove();
    }
    jest.clearAllMocks();
  });

  it('sets event listener on HTML-element connected to map', () => {
    const smElement = createSmMoveCenterElement([50, -50]);

    initSmMoveCenter(map);
    expect(map.setZoom).toHaveBeenCalledTimes(0);
    expect(map.panTo).toHaveBeenCalledTimes(0);

    smElement.click();
    expect(map.setZoom).toHaveBeenCalledTimes(1);
    expect(map.setZoom.mock.calls[0][0]).toBe(12);
    expect(map.panTo).toHaveBeenCalledTimes(1);
    expect(map.panTo.mock.calls[0][0]).toEqual([50, -50]);
  });
});
