import React, { Component } from 'react';

class Reservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <div className="form-group">
            <label>
            Is going:
            <input
                name="isGoing"
                type="checkbox"
                checked={this.state.isGoing}
                onChange={this.handleInputChange}
                className="form-control" />
            </label>
        </div>
        <div className="form-group">
            <label>
            Number of guests:
            <input
                name="numberOfGuests"
                type="number"
                value={this.state.numberOfGuests}
                onChange={this.handleInputChange} 
                className="form-control" />
            </label>
        </div>
        <button type="submit" className="btn btn-default">Submit</button>
      </form>
    );
  }
}

export default Reservation;