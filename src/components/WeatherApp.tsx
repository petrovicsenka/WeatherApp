import React, { useState } from 'react';
import sunny from '../assets/images/sunny.png';
import cloudy from '../assets/images/cloudy.png';
import rainy from '../assets/images/rainy.png';
import snowy from '../assets/images/snowy.png';

// me - because I use TS:
interface WeatherData {
  // me: to check what exactly is needed
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
}

const WeatherApp = () => {
  // const [data, setData] = useState({});
  // me - because I use TS:
  const [data, setData] = useState<WeatherData>({
    name: '',
    main: {
      temp: 0,
      humidity: 0,
    },
    wind: {
      speed: 0,
    },
  });

  const [location, setLocation] = useState('');
  const api_key = '339898cf98c9635ca9c89a112b73f12d';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') search();
  };

  const search = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=${api_key}`;
    const res = await fetch(url);
    const searchData = await res.json();
    console.log(searchData);
    setData(searchData);
    setLocation('');
  };

  return (
    <div className='container'>
      <div className='weather-app'>
        <div className='search'>
          <div className='search-top'>
            <i className='fa-solid fa-location-dot'></i>
            <div className='location'>{data.name}</div>
          </div>
          <div className='search-bar'>
            <input
              type='text'
              placeholder='Enter Location'
              value={location}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <i className='fa-solid fa-magnifying-glass' onClick={search}></i>
          </div>
        </div>
        <div className='weather'>
          <img src={sunny} alt='sunny' />
          <div className='weather-type'>Clear</div>
          <div className='temp'>28°</div>
        </div>
        <div className='weather-date'>
          <p>Fri, 3 May</p>
        </div>
        <div className='weather-data'>
          <div className='humidity'>
            <div className='data-name'>Humidity</div>
            <i className='fa-solid fa-droplet'></i>
            <div className='data'>35%</div>
          </div>
          <div className='wind'>
            <div className='data-name'>Wind</div>
            <i className='fa-solid fa-wind'></i>
            <div className='data'>3 km/h</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
