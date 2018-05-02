import React, { Component } from 'react';
import FormInputs from './components/FormInputs/FormInputs';
import ForecastItem from './components/ForecastItem/ForecastItem';

// CSS dependancies
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import './App.css';

// JS dependancies
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'slick-carousel/slick/slick.min.js';
import VanillaTilt from 'vanilla-tilt';
import $ from 'jquery';

// API key
const API_Key = "399b6964f358772d144333897a0f8e14";

class App extends Component {

  componentDidMount() {
    $(document).ready(function() {
      // check if animation ended in chrome, mozilla, internet explorer and safari
      var animationEnds = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      // form submit button on click removes class hidden
      $("form button").on("click", function() {
        $(".location").addClass("d-none");
        $(".forecast-card").addClass("d-none");
      });
      // title fade down animation
      $(".title").addClass("animated fadeInDown").one(animationEnds, function() {
        $(this).removeClass("animated fadeInDown");
      });
      // set timeout function for fade up animation of input and button
      setTimeout(function() {
        $("form input").addClass("animated fadeInUp").removeClass("d-none").one(animationEnds, function() {
          $(this).removeClass("animated fadeInUp");
        });
        $("form button").addClass("animated fadeInUp").removeClass("d-none").one(animationEnds, function() {
          $(this).removeClass("animated fadeInUp");
        });
      }, 500);
    });
  }

  // initial state
  state = {
    forecast: [],
    city: undefined,
    country: undefined,
    error: undefined
  }

  // call to fetch weather data
  getWeather = async (e) => {
    // prevent browser reload
    e.preventDefault();
    let api_call, data;
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    try {
      api_call = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${API_Key}&units=imperial`);
    } catch (err) {
      console.log(err);
    }

    try {
      data = await api_call.json();
    } catch (err) {
      console.log(err);
    }

    if (data.list) {
      const forecast = [];
      for(let i = 0; i < data.list.length; i+=8) {
        forecast.push(data.list[i]);
      }

      this.setState({
        forecast,
        city: data.city.name,
        country: data.city.country
      });

      // check if animation ended in chrome, mozilla, internet explorer and safari
      var animationEnds = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      // location fade down animation
      $(".location").addClass("animated fadeInDown").removeClass("d-none").one(animationEnds, function() {
        $(this).removeClass("animated fadeInDown");
      });
      // forecast card flip animation
      $(".forecast-card").addClass("animated flipInY").removeClass("d-none").one(animationEnds, function() {
        $(this).removeClass("animated flipInY");
      });

      // initialize forecast slider
      $('.forecast-slider').not('.slick-initialized').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        swipeToSlide: true,
        infinite: true,
        arrows: false,
        edgeFriction: 1,
        dots: false,
        draggable: true,
        touchThreshold: 100,
        centerMode: true,
        centerPadding: '60px',
        cssEase: 'ease-in-out',
        focusOnSelect: true,
        swipe: true,
        speed: 1000,
        variableWidth: false,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              centerPadding: '30px'
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              centerPadding: '100px'
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              centerPadding: '60px'
            }
          },
          {
            breakpoint: 400,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              centerPadding: '30px'
            }
          },
          {
            breakpoint: 331,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              centerPadding: '20px'
            }
          }
        ]
      });

      // initialize forecast card tilt
      VanillaTilt.init(document.querySelectorAll(".forecast-card"), {
    		max: 30,
    		speed: 400,
        perspective: 1000,
        transition: true,
        reset: true,
        scale: 1.1,
        glare: true,
        "max-glare": 0.5
    	});
    }
  }

  render() {
    return (
      <div className="container-fluid p-0">
        <div className="container p-0">
          <section className="row m-0">
            <div className="col-12 p-0 float-left">
              <div className="col-12 py-5 px-4 px-sm-0 float-left">
                <h2 className="text-white font-weight-bold shadowed-text title text-center">Weekly Forecast</h2>

                <FormInputs getWeather={this.getWeather} />

                {this.state.city && this.state.country && <h4 className="text-white font-weight-bold shadowed-text location text-center my-4 d-none">{this.state.city}, {this.state.country}</h4>}

                {this.state.city && this.state.country && <div className="col-12 p-0 my-1 forecast-slider float-left">
                  {this.state.forecast.map((forecast) => {
                    return <ForecastItem
                      key={forecast.dt}
                      date={forecast.dt_txt}
                      humidity={forecast.main.humidity}
                      temperature={forecast.main.temp}
                      icon={forecast.weather[0].icon}
                      description={forecast.weather[0].description}
                      error={this.state.error}
                    />
                  })}
                </div>}

              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default App;
