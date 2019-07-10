import React, { Component } from 'react';
import Chart from './Chart.jsx';
import Axios from 'axios';
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      USD: '',
      EUR: '',
      GBP: ''
    };
  }

  fetchPrice() {
    Axios.get('/currentPrice').then(({ data }) => {
      const { USD, GBP, EUR } = data.bpi;
      this.setState({
        USD: USD.rate,
        GBP: GBP.rate,
        EUR: EUR.rate
      });
    });
  }

  componentDidMount() {
    this.fetchPrice();
  }

  render() {
    return (
      <div className='container'>
        <h1 className='title'>Cryptocurrency Charting Tool</h1>
        <h4>Current prices:</h4>
        <table className='table'>
          <thead>
            <tr>
              <th>USD</th>
              <th>EUR</th>
              <th>GBP</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>&#x24;{this.state.USD}</td>
              <td>&#x20AC;{this.state.EUR}</td>
              <td>&#163;{this.state.GBP}</td>
            </tr>
          </tbody>
        </table>
        <Chart />
      </div>
    );
  }
}
