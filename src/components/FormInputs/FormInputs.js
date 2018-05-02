import React, { Component } from 'react';

class FormInputs extends Component {
  render() {
    return (
      <form className="my-4" onSubmit={this.props.getWeather}>
        <div className="row m-0 justify-content-md-center">
          <div className="col-4 col-md-auto pl-0 my-2">
            <input type="text" className="form-control d-none" name="city" placeholder="City" required />
          </div>
          <div className="col-4 col-md-auto pl-0 my-2">
            <input type="text" className="form-control d-none" name="country" placeholder="Country" required />
          </div>
          <div className="col-4 col-md-auto px-0 my-2">
            <button type="submit" className="btn btn-primary w-100 d-none">Get Forecast</button>
          </div>
        </div>
      </form>
    );
  }
}

export default FormInputs;
