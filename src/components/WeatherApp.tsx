import React, { useState, useEffect } from 'react';
import sunny from '../assets/images/sunny.png';
import cloudy from '../assets/images/cloudy.png';
import rainy from '../assets/images/rainy.png';
import snowy from '../assets/images/snowy.png';
import loadingGif from '../assets/images/loading.gif';

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
  notFound: boolean;
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
    notFound: false,
  });

  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<string>('');
  const api_key = '339898cf98c9635ca9c89a112b73f12d';

  useEffect(() => {
    const fetchDefaultWeather = async () => {
      setLoading(true);
      const defaultLocation = 'Belgrade';

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=Metric&appid=${api_key}`;
      const res = await fetch(url);
      const defaultData = await res.json();
      setData(defaultData);
      setLoading(false);
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

      if (searchData.cod !== 200) {
        setData((prevState) => ({
          ...prevState,
          notFound: true,
        }));
      } else {
        setData(searchData);
        setLocation('');
      }

      setLoading(false);

      // try {
      //   const res = await fetch(url);

      //   if (!res.ok) {
      //     throw new Error('City not found!');
      //   }

      //   const searchData = await res.json();
      //   if (searchData.cod !== 200) {
      //     setData((prevState) => ({
      //       ...prevState,
      //       notFound: true,
      //     }));
      //   } else {
      //     setData(searchData);
      //     setLocation('');
      //     setError('');
      //   }

      //   //obrisi svoju obradu greske!
      // } catch (error) {
      //   if (error instanceof Error) {
      //     setError(error.message);

      //     setTimeout(() => {
      //       setLocation('');
      //       setError('');
      //     }, 3000);
      //   } else {
      //     setError('An unknown error occurred');
      //   }
      // }
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

  const backgroundImages = {
    Clear: 'linear-gradient(to right, #f3b07c, #fcd283)',
    Clouds: 'linear-gradient(to right, #57d6d4, #71eeec)',
    Rain: 'linear-gradient(to right, #5bc8fb, #80eaff)',
    Snow: 'linear-gradient(to right, #aff2ff, #fff)',
    Haze: 'linear-gradient(to right, #57d6d4, #71eeec)',
    Mist: 'linear-gradient(to right, #57d6d4, #71eeec)',
  };

  const backgroundImage = data.weather
    ? backgroundImages[data.weather[0].main as keyof typeof backgroundImages]
    : 'linear-gradient(to top, #32a852, #fcd283)';

  const currentDate = new Date();

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const dayOfWeek = daysOfWeek[currentDate.getDay()];
  const month = months[currentDate.getMonth()];
  const dayOfMonth = currentDate.getDate();
  const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${month}`;

  return (
    <div className='container' style={{ backgroundImage }}>
      <div
        className='weather-app'
        style={{
          backgroundImage:
            backgroundImage?.replace?.('to right', 'to top') || '',
        }}
      >
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
        {loading ? (
          <img className='loader' src={loadingGif} alt='loading' />
        ) : data.notFound ? (
          <div className='not-found'>Not found 😒</div>
        ) : (
          <>
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
              <p>{formattedDate}</p>
            </div>
            <div className='weather-data'>
              <div className='humidity'>
                <div className='data-name'>Humidity</div>
                <i className='fa-solid fa-droplet'></i>
                <div className='data'>
                  {data.main ? data.main.humidity : null}%
                </div>
              </div>
              <div className='wind'>
                <div className='data-name'>Wind</div>
                <i className='fa-solid fa-wind'></i>
                <div className='data'>
                  {data.wind ? data.wind.speed : null} km/h
                </div>
              </div>
            </div>
          </>
        )}
        {/* {error && <div className='error-message'>{error}</div>} */}
      </div>
    </div>
  );
};

export default WeatherApp;
