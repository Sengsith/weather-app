import React, {useState} from 'react';
import './App.scss';
import axios from 'axios';
import PlacesAutocomplete from 'react-places-autocomplete';

function App() {
  // Contains the API data from axios.get
  const [weather, setWeather] = useState({});
  // Weather container will not render until user inputs a location
  const [locationFlag, setLocationFlag] = useState(false);
  // For autocomplete api, also passed into our weather API
  const [address, setAddress] = useState('');

  // API KEY and weather API URL for our API calls
  const WEATHER_API_KEY = process.env.REACT_APP_API_KEY;

  // const weather_url = `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${latitude}, ${longitude}&aqi=no`;
  const weather_url = `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${address}&aqi=no`;

  // Function called when user makes a selection
  const handleSelect = async value => {
    setAddress(value);

    let response = await axios.get(weather_url);
    setWeather(response.data);
    setLocationFlag(true);
  };

  return (
    <div className="App">
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >{({ getInputProps, suggestions, getSuggestionItemProps, loading} ) => (
        <div>
          <input className="search-bar" {...getInputProps({placeholder: 'Enter a location'})}/>
          <div>
            {loading ? <div>...loading</div> : null}

            {suggestions.map(suggestion => {
              const style= {
                backgroundColor: suggestion.active ? "#41b6e6" : "#7f8c8d"
              }
              return (
                <div {...getSuggestionItemProps(suggestion, { style })}>
                  {suggestion.description}</div>
              );
            })}
          </div>
        </div>
      )}
      </PlacesAutocomplete>
      {locationFlag ? 
          <div className="weather-container">
            <div className="weather-location">
              {weather.location ? <p>{weather.location.name}, <br/ >{weather.location.region}</p> : null}
            </div>
            <div className="weather-temp">
              {weather.location ? <p>{weather.current.temp_f + '°'}</p> : null}
            </div>
            <div className="weather-desc">
              {weather.location ? <p>{weather.current.condition.text}</p> : null}
            </div>
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
        : null}
    </div>
  );
}

export default App;
