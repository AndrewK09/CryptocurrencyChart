import React, { Component } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        labels: [],
        datasets: [
          {
            label: 'My First dataset',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
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
              type: 'time',
              ticks: {
                autoSkip: true,
                maxTicksLimit: 12
              }
            }
          ]
        }
      }
    };
  }

  componentDidMount() {
    axios.get('/yearly').then(({ data }) => {
      let dates = Object.keys(data.bpi);
      // let filtered = dates.map(date => date.substring(5));

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
        <Line data={this.state.data} options={this.state.options} />
      </div>
    );
  }
}
