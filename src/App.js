import React from 'react';
import './App.css';
import { StagiMap } from './modules/stagimap';

export default class StagiMapDemo extends React.PureComponent {
  componentDidMount() {
    let data = [
      {
        coordinates: [34.4481,-119.2429],
        html: 'HTML точки 1',
        title: 'Заголовок точки 1',
        group: 0
      }, {
        coordinates: [34.9481,-119.9429],
        html: 'HTML точки 2',
        title: 'Заголовок точки 2',
        group: 1
      }
    ];
    let smOptions = {
      center: [34.4481, -119.2429],
      geolocation: {},
      zoomButtons: {},
      traffic: false,
      data: data,
      cluster: true,
      router: {
        startPoint: [38.597640, -121.476158],
        endPoint: [34.084880, -117.279381],
        maxWays: 1,
        refPoints: [[37.771951, -116.637113]]
      }
    };

    this.map = new StagiMap({
      ...smOptions,
      apiKey: '',
      locale: 'en'
    });
  }

  render = () => (
    <div className="stagimap-demo-app">
      <h1>StagiMap Demo</h1>
      <div id="stagimap"></div>
    </div>
  ) 
};
