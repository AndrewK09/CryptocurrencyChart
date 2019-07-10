import React, { Component } from 'react';

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      start: '',
      end: '',
      display: 'pastYear',
      curr: 'USD'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSelect(e) {
    const { name, value } = e.target;
    this.setState(
      {
        [name]: value
      },
      () => {
        const { display, curr, start, end } = this.state;
        if (display !== 'custom') {
          this.props.handleUpdate(display, curr);
        } else if (display === 'custom' && name === 'curr') {
          this.props.handleUpdate('custom', curr, start, end);
        }
      }
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    const { start, end, curr } = this.state;
    this.props.handleUpdate('custom', curr, start, end).catch(err => {
      console.log(err);
    });
  }

  renderCustom() {
    if (this.state.display === 'custom') {
      return (
        <div className='col-auto'>
          <form onSubmit={this.handleSubmit}>
            <label>
              Start date:
              <input
                id='date'
                type='date'
                name='start'
                value={this.state.start}
                onChange={this.handleChange}
              />
            </label>
            <label>
              End date:
              <input
                id='date'
                type='date'
                name='end'
                value={this.state.end}
                onChange={this.handleChange}
              />
            </label>
            <input type='submit' value='submit' />
          </form>
        </div>
      );
    }
  }

  render() {
    return (
      <div className='row'>
        <label className='col-auto'>
          Display:
          <select
            name='display'
            onChange={this.handleSelect}
            value={this.state.selected}
          >
            <option value='pastYear'>Past year</option>
            <option value='pastMonth'>Past month</option>
            <option value='custom'>Custom</option>
          </select>
        </label>

        <label className='col-auto'>
          Currency:
          <select
            name='curr'
            onChange={this.handleSelect}
            value={this.state.selected}
          >
            <option value='USD'>USD</option>
            <option value='EUR'>EUR</option>
            <option value='GBP'>GBP</option>
          </select>
        </label>

        {this.renderCustom()}
      </div>
    );
  }
}
