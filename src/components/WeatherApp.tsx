import React, { useState, useEffect } from 'react';
import sunny from '../assets/images/sunny.png';
import cloudy from '../assets/images/cloudy.png';
import rainy from '../assets/images/rainy.png';
import snowy from '../assets/images/snowy.png';

// me - because I use TS:
interface WeatherData {
  // me: to check what exactly is needed
  weather: {
    main: string;
  }[];
  main: {
    temp: number | null;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  name: string;
}

const WeatherApp = () => {
  // const [data, setData] = useState({});
  // me - because I use TS:
  const [data, setData] = useState<WeatherData>({
    weather: [{ main: '' }],
    main: {
      temp: null,
      humidity: 0,
    },
    wind: {
      speed: 0,
    },
    name: '',
  });

  const [location, setLocation] = useState('');
  const api_key = '339898cf98c9635ca9c89a112b73f12d';

  useEffect(() => {
    const fetchDefaultWeather = async () => {
      const defaultLocation = 'Belgrade';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=Metric&appid=${api_key}`;
      const res = await fetch(url);
      const defaultData = await res.json();
      setData(defaultData);
    };

    fetchDefaultWeather();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') search();
  };

  const search = async () => {
    if (location.trim() !== '') {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=${api_key}`;
      const res = await fetch(url);
      const searchData = await res.json();
      setData(searchData);
      setLocation('');
    }
  };

  const weatherImages = {
    Clear: sunny,
    Clouds: cloudy,
    Rain: rainy,
    Snow: snowy,
    Haze: cloudy,
    Mist: cloudy,
  };

  const weatherImage = data.weather
    ? weatherImages[data.weather[0].main as keyof typeof weatherImages]
    : null;

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
          <img src={weatherImage} alt='sunny' />
          <div className='weather-type'>
            {data.weather ? data.weather[0].main : null}
          </div>
          <div className='temp'>
            {data.main.temp ? `${Math.floor(data.main.temp)}°` : null}
          </div>
        </div>
        <div className='weather-date'>
          <p>Fri, 3 May</p>
        </div>
        <div className='weather-data'>
          <div className='humidity'>
            <div className='data-name'>Humidity</div>
            <i className='fa-solid fa-droplet'></i>
            <div className='data'>{data.main ? data.main.humidity : null}%</div>
          </div>
          <div className='wind'>
            <div className='data-name'>Wind</div>
            <i className='fa-solid fa-wind'></i>
            <div className='data'>
              {data.wind ? data.wind.speed : null} km/h
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
