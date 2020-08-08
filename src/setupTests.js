import '@testing-library/jest-dom/extend-expect';

const mocksStorage = {};

global.ymaps = {
  mocksStorage: {
    get: key => mocksStorage[key],
    reset: () => {
      Object.keys(mocksStorage).forEach(key => delete mocksStorage[key])
    }
  },
  Map: class {
    constructor(containerId, mapOptions, interactionOptions) {
      if (mocksStorage['MapInstance.props']) {
        mocksStorage['MapInstance.props'].push([containerId, mapOptions, interactionOptions]);
      } else {
        mocksStorage['MapInstance.props'] = [[containerId, mapOptions, interactionOptions]];
      };

      this.action = {
        setCorrection: jest.fn(callback => {
          if (mocksStorage['ButtonInstance.action.setCorrection']) {
            mocksStorage['ButtonInstance.action.setCorrection'].push(callback);
          } else {
            mocksStorage['ButtonInstance.action.setCorrection'] = [callback];
          };
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
  control: {
    GeolocationControl: class {
      constructor(props) {
        mocksStorage['GeolocationControlInstance.props'] = props;

        this.events = {
          add: jest.fn((method, callback) => {
            mocksStorage[`GeolocationControlInstance.events.add.${method}`] = callback;
          })
        };
      };
    },
    Button: class {
      constructor(props) {
        if (mocksStorage['ButtonInstance.props']) {
          mocksStorage['ButtonInstance.props'].push(props);
        } else {
          mocksStorage['ButtonInstance.props'] = [props];
        };

        if (mocksStorage['ButtonInstance.count']) {
          mocksStorage['ButtonInstance.count']++;
        } else {
          mocksStorage['ButtonInstance.count'] = 1;
        };

        this.events = {
          add: jest.fn((method, callback) => {
            if (mocksStorage[`ButtonInstance.events.add.${method}`]) {
              mocksStorage[`ButtonInstance.events.add.${method}`].push(callback);
            } else {
              mocksStorage[`ButtonInstance.events.add.${method}`] = [callback];
            };
          })
        };
      };
    }
  },
  templateLayoutFactory: {
    createClass: jest.fn(() => 'created')
  },
  Placemark: class {
    constructor(position, baloon, props) {
      mocksStorage['PlacemarkInstance.props'] = [position, baloon, props];

      if (mocksStorage['PlacemarkInstance.count']) {
        mocksStorage['PlacemarkInstance.count']++;
      } else {
        mocksStorage['PlacemarkInstance.count'] = 1;
      };

      this.geometry = {
        setCoordinates: jest.fn(position => {
          mocksStorage['PlacemarkInstance.geometry.setCoordinates'] = position;
        })
      };
    }
  },
  multiRouter: {
    MultiRoute: class {
      constructor(config, props) {
        mocksStorage['multiRouter.MultiRouteInstance.props'] = [config, props];
  
        this.model = {
          getReferencePoints: jest.fn(() => {
            if (mocksStorage['multiRouter.MultiRouteInstance.getReferencePoints.calls']) {
              mocksStorage['multiRouter.MultiRouteInstance.getReferencePoints.calls']++;
            } else {
              mocksStorage['multiRouter.MultiRouteInstance.getReferencePoints.calls'] = 1;
            };

            return [];
          }),
          setReferencePoints: jest.fn((referencePoints, index) => {
            mocksStorage['multiRouter.MultiRouteInstance.setReferencePoints.props'] = [referencePoints, index];
          })
        };
      };
    }
  }
};
