import React from 'react';
import './App.css';
import { StagiMap } from './modules/stagimap';
import packageInfo from '../package.json';

export default class StagiMapDemo extends React.PureComponent {
  constructor() {
    super();

    this.userLocale = null;
    window.location.search.slice(1).split('&').forEach(queryParam => {
      if (queryParam.split('=')[0] === 'locale') {
        this.userLocale = queryParam.split('=')[1];
      }
    });
  }

  componentDidMount() {
    const demoLocales = ['en', 'ru', 'uk', 'tr'];

    const data = [
      {
        coordinates: [34.4481, -119.2429],
        html: 'HTML точки 1',
        title: 'Заголовок точки 1',
        group: 0
      }, {
        coordinates: [34.9481, -119.9429],
        html: 'HTML точки 2',
        title: 'Заголовок точки 2',
        group: 1
      }
    ];

    const smOptions = {
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
      locale: demoLocales.includes(this.userLocale) ? this.userLocale : 'en',
      containerId: 'stagimap'
    });
  }

  render() {
    return (
      <div className="stagimap-demo-app">
        <h1>Stagimap Demo</h1>
        <div className="stagimap-demo-app-content">
          <div id="stagimap"></div>
          <div className="stagimap-demo-app-nav">
            <button sm-point="0">Move to Point#1</button>
            <button sm-point="1">Move to Point#2</button>
            <button>Move to coordinates [0, 0]</button>
            <button>Show Group#1</button>
            <button>Show Group#2</button>
            <button>Show All</button>
          </div>
        </div>
        <div className="stagimap-demo-app-locale">
          <a
            href="?locale=en"
            className={this.userLocale === 'en' || !this.userLocale ? 'selected' : ''}
          >
            English
          </a>
          /
          <a
            href="?locale=ru"
            className={this.userLocale === 'ru' ? 'selected' : ''}
          >
            Русский
          </a>
          /
          <a
            href="?locale=uk"
            className={this.userLocale === 'uk' ? 'selected' : ''}
          >
            Українська
          </a>
          /
          <a
            href="?locale=tr"
            className={this.userLocale === 'tr' ? 'selected' : ''}
          >
            Türkçe
          </a>
        </div>
        {`${packageInfo.name}-${packageInfo.version}`}
      </div>
    );
  }
}
