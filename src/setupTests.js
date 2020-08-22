import '@testing-library/jest-dom/extend-expect';

const mocksStorage = {};
const setPropsOnMockStorage = (key, value) => {
  if (!mocksStorage[key]) {
    mocksStorage[key] = [value];
  } else {
    mocksStorage[key].push(value);
  }
};
const setCountOnMockStorage = key => {
  if (mocksStorage[key]) {
    mocksStorage[key]++;
  } else {
    mocksStorage[key] = 1;
  }
}

window.ymaps = {
  mocksStorage: {
    get: key => mocksStorage[key],
    reset: () => {
      Object.keys(mocksStorage).forEach(key => delete mocksStorage[key])
    }
  },
  layout: {
    storage: {
      add: jest.fn()
    }
  },
  Map: class {
    constructor(containerId, mapOptions, interactionOptions) {
      setPropsOnMockStorage('MapInstance.props', [containerId, mapOptions, interactionOptions]);

      this.action = {
        setCorrection: jest.fn(callback => {
          setPropsOnMockStorage('ButtonInstance.action.setCorrection', [callback]);
        })
      };

      this.options = {
        get: key => {
          if (key === 'projection') {
            return {
              fromGlobalPixels: (globalPixelCenter, zoom) => {
                return [globalPixelCenter[0] / zoom, globalPixelCenter[1] / zoom];
              },
              toGlobalPixels: (coordinates, zoom) => {
                return [coordinates[0] * zoom, coordinates[1] * zoom];
              }
            }
          }
        }
      };

      this.container = {
        getSize: () => [1000, 1000]
      }
    }
  },
  Clusterer: class {
    constructor(clusterOptions) {
      setPropsOnMockStorage('ClustererInstance.props', [clusterOptions]);

      this.add = jest.fn((position, baloon, props) => {
        setPropsOnMockStorage('ClustererInstance.add', [position, baloon, props]);
      })
    }
  },
  control: {
    GeolocationControl: class {
      constructor(props) {
        setPropsOnMockStorage('GeolocationControlInstance.props', [props]);

        this.events = {
          add: jest.fn((method, callback) => {
            setPropsOnMockStorage(`GeolocationControlInstance.events.add.${method}`, [callback]);
          })
        };
      }
    },
    Button: class {
      constructor(props) {
        setPropsOnMockStorage('ButtonInstance.props', [props]);
        setCountOnMockStorage('ButtonInstance.count');

        this.events = {
          add: jest.fn((method, callback) => {
            setPropsOnMockStorage(`ButtonInstance.events.add.${method}`, [callback]);
          })
        };
      }
    }
  },
  templateLayoutFactory: {
    createClass: jest.fn(() => 'created')
  },
  Placemark: class {
    constructor(position, baloon, props) {
      setPropsOnMockStorage('PlacemarkInstance.props', [position, baloon, props]);
      setCountOnMockStorage('PlacemarkInstance.count');

      this.geometry = {
        setCoordinates: jest.fn(position => {
          setPropsOnMockStorage('PlacemarkInstance.geometry.setCoordinates', [position]);
        })
      };
    }
  },
  multiRouter: {
    MultiRoute: class {
      constructor(config, props) {
        setPropsOnMockStorage('multiRouter.MultiRouteInstance.props', [config, props]);
  
        this.model = {
          getReferencePoints: jest.fn(() => {
            setCountOnMockStorage('multiRouter.MultiRouteInstance.getReferencePoints.calls');

            return [];
          }),
          setReferencePoints: jest.fn((referencePoints, index) => {
            setPropsOnMockStorage('multiRouter.MultiRouteInstance.setReferencePoints.props', [referencePoints, index]);
          })
        };
      }
    }
  },
  traffic: {
    provider: {
      Actual: class {
        constructor(config, trafficOptions) {
          setPropsOnMockStorage('traffic.provider.ActualInstance.props', [config, trafficOptions]);
          setCountOnMockStorage('traffic.provider.ActualInstance.count');
    
          this.setMap = jest.fn((map) => {
            setPropsOnMockStorage('traffic.provider.ActualInstance.setMap', [map]);
          })
        }
      }
    }
  }
};
