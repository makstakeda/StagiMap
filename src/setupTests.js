import '@testing-library/jest-dom/extend-expect';

const mocksStorage = {};

global.ymaps = {
  mocksStorage: {
    get: key => mocksStorage[key],
    reset: () => {
      Object.keys(mocksStorage).forEach(key => delete mocksStorage[key])
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
