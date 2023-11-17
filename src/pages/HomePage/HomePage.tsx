import { useEffect, useState } from 'react';
import {
  CitySearch,
  CurrentWeather,
  Forecast,
  Loader,
  LocationAndHistoryButtons,
  TemperatureButtons,
  WeatherDetails,
} from '../../components';
import { APIKEY, baseWeatherUrl } from '../../service/API.ts';
import { Coord, WeatherData } from '../../types/IWeather.ts';
import { IFormattedWeatherData } from './IFormattedWeatherData.ts';

import './HomePage.scss';
import { FormattedData } from './HomePageUtils.ts';
import meme from '../../assets/images/peaceout-vanish.gif';

export const HomePage = () => {
  const [weatherData, setWeatherData] = useState<IFormattedWeatherData | null>(
    null,
  );
  const [city, setCity] = useState<string>('');
  const [unitsType, setUnitsType] = useState<string>('metric');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cityNotFound, setCityNotFound] = useState<boolean>(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [currentWeatherOrForecast, setCurrentWeatherOrForecast] =
    useState(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const fetchWeatherData = async (
    cityOrLocation: string | Coord,
    newUnitsType?: string,
  ) => {
    let url;

    if (typeof cityOrLocation === 'string') {
      url = `${baseWeatherUrl}q=${cityOrLocation}&units=${
        newUnitsType || unitsType
      }&appid=${APIKEY}`;
    } else {
      const { lat, lon } = cityOrLocation;
      url = `${baseWeatherUrl}lat=${lat}&lon=${lon}&units=${
        newUnitsType || unitsType
      }&appid=${APIKEY}`;
    }

    try {
      setIsLoading(true);
      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === 404) {
          setIsOpen(false);
          setCityNotFound(true);
          throw new Error('City not found');
        } else {
          throw new Error('Network/server error');
        }
      }

      const data: WeatherData = await response.json();

      const formattedWeatherData = data ? FormattedData(data) : null;
      setWeatherData(formattedWeatherData);

      setCity(data.name);
      setIsOpen(false);
      setCityNotFound(false);

      console.log('API:', formattedWeatherData);

      // HISTORY
      const isDuplicate = searchHistory.some(
        (cityInHistory) =>
          cityInHistory.toLowerCase() === data.name.toLowerCase(),
      );

      if (!isDuplicate) {
        const updatedSearchHistory = [
          ...new Set([...searchHistory, data.name]),
        ].slice(-15);
        setSearchHistory(updatedSearchHistory);
        localStorage.setItem(
          'searchHistory',
          JSON.stringify(updatedSearchHistory),
        );
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const storedHistory = localStorage.getItem('searchHistory');
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
  }, []);

  const locationSearch = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const { latitude: lat, longitude: lon } = position.coords;
        const location = { lat, lon };
        fetchWeatherData(location);
      });
    } else {
      console.error('Геолокація не підтримується в вашому браузері');
    }
  };

  const handleTemperatureUnitChange = (unitType: string) => {
    setUnitsType(unitType);
    fetchWeatherData(city, unitType);
  };

  const handleHistoryCityClick = (city: string) => {
    setCity(city);
    fetchWeatherData(city);
  };

  return (
    <main className="home">
      {isLoading ? (
        <div className="home__loader">
          <Loader />
        </div>
      ) : (
        <div className="home__container">
          <section className="home__left-side">
            <div className="home__search-container">
              <LocationAndHistoryButtons
                searchHistory={searchHistory}
                handleHistoryCityClick={handleHistoryCityClick}
                locationSearch={locationSearch}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              />

              <CitySearch
                city={city}
                setCity={setCity}
                handleSearch={() => fetchWeatherData(city)}
              />

              <TemperatureButtons
                unitsType={unitsType}
                handleTemperatureUnitChange={handleTemperatureUnitChange}
              />
            </div>

            {isOpen ? (
              <>
                <h3 className="home__left-side__name">History</h3>
                <ul className="home__left-side__list">
                  {searchHistory.map((searchedCity, index) => (
                    <li
                      key={index}
                      onClick={() => handleHistoryCityClick(searchedCity)}
                      className="home__left-side__list--item"
                    >
                      {searchedCity}
                    </li>
                  ))}
                </ul>
              </>
            ) : cityNotFound ? (
              <div className="home__left-side__not-found">
                <img
                  src={meme}
                  alt=""
                  height={100}
                  width={150}
                  className="home__left-side__not-found--image"
                />

                <span className="home__left-side__not-found--text">
                  It seems your city no longer exists.
                </span>
                <span className="home__left-side__not-found--text-small">
                  Or you just typed it wrong. Try again.
                </span>
              </div>
            ) : weatherData ? (
              <CurrentWeather weatherData={weatherData} unitsType={unitsType} />
            ) : null}
          </section>

          {weatherData && !cityNotFound ? (
            <section className="home__right-side">
              <div className="home__right-side__buttons">
                <button
                  onClick={() => setCurrentWeatherOrForecast(true)}
                  className={
                    currentWeatherOrForecast
                      ? 'home__right-side__button home__right-side__button--selected'
                      : 'home__right-side__button'
                  }
                >
                  Current Weather
                </button>
                <button
                  onClick={() => setCurrentWeatherOrForecast(false)}
                  className={
                    !currentWeatherOrForecast
                      ? 'home__right-side__button home__right-side__button--selected'
                      : 'home__right-side__button'
                  }
                >
                  Forecast
                </button>
              </div>
              {!currentWeatherOrForecast ? (
                <Forecast
                  lat={weatherData.lat}
                  lon={weatherData.lon}
                  unitsType={unitsType}
                />
              ) : (
                <WeatherDetails
                  feels_like={weatherData.feels_like}
                  temp_min={weatherData.temp_min}
                  temp_max={weatherData.temp_max}
                  sunrise={weatherData.sunrise}
                  sunset={weatherData.sunset}
                  humidity={weatherData.humidity}
                  pressure={weatherData.pressure}
                  wind={weatherData.speed}
                  visibility={weatherData.visibility}
                  timezone={weatherData.timezone}
                  unitsType={unitsType}
                />
              )}
            </section>
          ) : null}
        </div>
      )}

      {/*<WeatherMap />*/}
    </main>
  );
};
