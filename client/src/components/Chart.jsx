import React, { Component } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

import Search from './Search.jsx';

export default class Chart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        labels: [],
        datasets: [
          {
            label: 'Bitcoin Price',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgb(209, 1, 1)',
            borderColor: 'rgb(209, 1, 1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgb(209, 1, 1)',
            pointBackgroundColor: 'rgb(209, 1, 1)',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'black',
            pointHoverBorderColor: 'black',
            pointHoverBorderWidth: 1,
            pointRadius: 1,
            pointHitRadius: 10,
            data: []
          }
        ]
      },
      options: {
        scales: {
          xAxes: [
            {
              ticks: {
                maxTicksLimit: 12
              }
            }
          ]
        }
      }
    };
    this.updateChart = this.updateChart.bind(this);
  }

  updateChart(endpoint, curr, start, end) {
    let url = `/${endpoint}/${curr}`;
    if (endpoint === 'custom') {
      url += `/${start}/${end}`;
    }

    return axios.get(url).then(({ data }) => {
      let dates = Object.keys(data.bpi);
      let values = Object.values(data.bpi);
      let newData = Object.assign({}, this.state.data);

      newData.labels = dates;
      newData.datasets[0].data = values;
      this.setState({
        data: newData
      });
    });
  }

  componentDidMount() {
    axios.get(`/pastYear/USD`).then(({ data }) => {
      let dates = Object.keys(data.bpi);
      let values = Object.values(data.bpi);
      let newData = Object.assign({}, this.state.data);

      newData.labels = dates;
      newData.datasets[0].data = values;

      this.setState({
        data: newData
      });
    });
  }

  render() {
    return (
      <div>
        <Search handleUpdate={this.updateChart} />
        <Line data={this.state.data} options={this.state.options} />
      </div>
    );
  }
}
