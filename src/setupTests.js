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
        }
      }
    }
  },
  templateLayoutFactory: {
    createClass: jest.fn(() => 'created')
  },
  Placemark: class {
    constructor(position, baloon, props) {
      mocksStorage['PlacemarkInstance.props'] = [position, baloon, props];

      this.geometry = {
        setCoordinates: jest.fn(position => {
          mocksStorage['PlacemarkInstance.geometry.setCoordinates'] = position;
        })
      }
    }
  }
};
