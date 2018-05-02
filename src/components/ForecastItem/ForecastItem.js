import React from 'react';

// Image dependancies
import Sunny from '../../assets/images/sunny.png';
import PartlyCloudy from '../../assets/images/partly-cloudy.png';
import Cloudy from '../../assets/images/cloudy.png';
import Rainy from '../../assets/images/rainy.png';
import Stormy from '../../assets/images/stormy.png';
import Snowy from '../../assets/images/snowy.png';
import Misty from '../../assets/images/misty.png';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default ({ ...props }) => {
  const parseDate = (string) => {
    const date = new Date(string);
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  };

  const renderIcon = (icon) => {
    switch (icon) {
      case '01d':
      case '01n':
        return Sunny;
      case '02d':
      case '02n':
        return PartlyCloudy;
      case '03d':
      case '03n':
        return Cloudy;
      case '04d':
      case '04n':
        return Cloudy;
      case '09d':
      case '09n':
        return Rainy;
      case '10d':
      case '10n':
        return Rainy;
      case '11d':
      case '11n':
        return Stormy;
      case '13d':
      case '13n':
        return Snowy;
      case '50d':
      case '50n':
        return Misty;
      default:
        return Sunny;
    }
  };

  return (
    <div className="col-xs-12 col-6 col-md-4 col-lg-3 p-3 my-3 float-left">
      <div className="col-12 forecast-card py-3 px-2 z-depth-2 text-center float-left d-none">
        <div className="col-12 p-0 float-left">
          <h6 className="text-white shadowed-text my-2">{parseDate(props.date)}</h6>
          <h6 style={{textTransform: 'capitalize'}} className="text-white shadowed-text my-2">{props.description}</h6>
          <img height="80px" className="weather-icon shadowed-text my-3 mx-auto" src={renderIcon(props.icon)} alt={props.description} />
        </div>
        <div className="col-6 p-0 text-center float-left">
          <h6 className="text-white shadowed-text my-2">Humidity:</h6>
          <h6 className="text-white shadowed-text my-2">{props.humidity}%</h6>
        </div>
        <div className="col-6 p-0 text-center float-left">
          <h6 className="text-white shadowed-text my-2">Temperature:</h6>
          <h6 className="text-white shadowed-text my-2">{Math.round(props.temperature)}&#176;</h6>
        </div>
      </div>
    </div>
  );
};
