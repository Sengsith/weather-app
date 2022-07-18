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
  // const weather_url = `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${address}&aqi=no`;
  const weather_url = `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${address}&days=3&aqi=no&alerts=no`;

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
                backgroundColor: suggestion.active ? "#41b6e6" : "#7f8c8d",
                fontSize: "20px",
                width: "300px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                paddingLeft: "5px",
                paddingRight: "15px"
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
      <div className="weather-container">
          <div className="daily-container">
            <div className="weather-tile" id="location">
              {weather.location ? <h2>{weather.location.name}, {weather.location.region}</h2> : <h2>Search a location to get the weather!</h2>}
            </div>
            <div className="weather-tile" id="temp">
              {weather.location ? <h1>{weather.current.temp_f + '°'}</h1> : null}
            </div>
            <div className="weather-tile" id="condition">
              {weather.location ? <img src={weather.current.condition.icon} /> : null}
              {weather.location ? <h3>{weather.current.condition.text}</h3> : null}
            </div>
            <div className="weather-tile" id="wind">
              {weather.location ? <p>Wind: {weather.current.wind_mph + ' MPH ' + weather.current.wind_dir}</p> : null}
            </div>
            <div className="weather-tile" id="humidity">
              {weather.location ? <p>Humidity: {weather.current.humidity + '%'}</p> : null}
            </div>
          </div>
      </div>
    </div>
  );
}

export default App;
