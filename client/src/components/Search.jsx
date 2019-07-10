import React, { Component } from 'react';

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      start: '',
      end: '',
      selected: 'pastYear'
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
    this.setState(
      {
        selected: e.target.value
      },
      () => {
        if (this.state.selected !== 'custom') {
          this.props.handleUpdate(this.state.selected);
        }
      }
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    const { start, end } = this.state;
    this.props.handleUpdate('custom', start, end).then(() => {
      this.setState({
        selected: 'custom'
      });
    });
  }

  renderCustom() {
    if (this.state.selected === 'custom') {
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
        <form className='col-auto'>
          <label>
            Display:
            <select onChange={this.handleSelect} value={this.state.selected}>
              <option value='pastYear'>Past year</option>
              <option value='pastMonth'>Past month</option>
              <option value='custom'>Custom</option>
            </select>
          </label>
        </form>
        {this.renderCustom()}
      </div>
    );
  }
}
