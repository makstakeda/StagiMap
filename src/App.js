import React from 'react';
import './App.css';
import { StagiMap } from './modules/stagimap';

export default class StagiMapDemo extends React.PureComponent {
  constructor() {
    const map = new StagiMap({
      locale: 'en'
    });
  };

  render = () => (
    <div className="stagimap-demo-app">
      <h1>StagiMap Demo</h1>
      <div id="stagimap"></div>
    </div>
  ) 
};
