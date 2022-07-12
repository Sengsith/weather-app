import React, {useState} from 'react';
import './App.scss';
import axios from 'axios';

function App() {
  // Contains the API data from axios.get
  const [weather, setWeather] = useState({});
  // Input for our API call(takes in city)
  const [location, setLocation] = useState('');
  // Weather container will not render until user inputs a location
  const [locationFlag, setLocationFlag] = useState(false);

  // API KEY and weather API URL for our API calls
  const API_KEY = process.env.REACT_APP_API_KEY;
  const weather_url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&aqi=no`;

  // Function called when the user inputs a location and hits the enter key
  const getWeather = (e) => {
    if (e.key === 'Enter') {
      axios.get(weather_url).then((response) => {
        setWeather(response.data)
      })
      // After a user hits enter,  empty out input box and render containers
      setLocation('');
      setLocationFlag(true);
    }
  }

  return (
    <div className="App">
      <input type='text'
      id="weather-search"
      placeholder='Enter a location to get the weather'
      value={location}
      onChange={event => setLocation(event.target.value)}
      onKeyPress={getWeather}/>
      {locationFlag ? 
            <div className="weather-container">
            <div className="weather-top">
              <div className="weather-location">
                {weather.location ? <p>{weather.location.name}</p> : null}
              </div>
              <div className="weather-temp">
                {weather.location ? <h1>{weather.current.temp_f + '°'}</h1> : null}
              </div>
              <div className="weather-desc">
                {weather.location ? <p>{weather.current.condition.text}</p> : null}
              </div>
            </div>
            <div className="weather-bottom">
              <div className="weather-wind">
                {weather.location ? <p>Wind<br />{weather.current.wind_mph + ' MPH ' + weather.current.wind_dir}</p> : null}
              </div>
              <div className="weather-humidity">
                {weather.location ? <p>Humidity<br />{weather.current.humidity + '%'}</p> : null}
              </div>
              <div className="weather-feels-like">
                {weather.location ? <p>Feels Like<br />{weather.current.feelslike_f + '°'}</p> : null}
              </div>
            </div>
          </div>
        : null}
    </div>
  );
}

export default App;
