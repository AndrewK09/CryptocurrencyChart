import React, { Component } from 'react';
import Chart from './Chart.jsx';
export default class App extends Component {
  render() {
    return (
      <div className='container'>
        <h1 className='title'>Cryptocurrency Charting Tool</h1>
        <Chart />
      </div>
    );
  }
}
