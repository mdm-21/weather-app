import React, { useCallback, useEffect, useState } from 'react';
import { LeftSide, RightSide } from './components';
import { APIKEY, baseWeatherUrl } from '../../service/API.ts';
import { Coord, WeatherData } from '../../types/IWeather.ts';
import { IFormattedWeatherData } from '../../types/IFormattedWeatherData.ts';

import './HomePage.scss';
import { formattedData } from '../../utils';
import { TemperatureUnits } from '../../types/TemperatureUnits.ts';

export const HomePage: React.FC = () => {
	const [weatherData, setWeatherData] = useState<IFormattedWeatherData | null>(
		null,
	);
	const [city, setCity] = useState<string>('');
	const [unitsType, setUnitsType] = useState<TemperatureUnits>(
		TemperatureUnits.METRIC,
	);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [cityNotFound, setCityNotFound] = useState<boolean>(false);
	const [searchHistory, setSearchHistory] = useState<string[]>([]);
	const [currentWeatherOrForecast, setCurrentWeatherOrForecast] =
		useState(true);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const fetchWeatherData = useCallback(
		async (cityOrLocation: string | Coord, newUnitsType?: TemperatureUnits) => {
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
						setCityNotFound(true);
						setWeatherData(null);
						throw new Error('City not found');
					} else {
						throw new Error('Network/server error');
					}
				}

				const data: WeatherData = await response.json();

				const formattedWeatherData = data ? formattedData(data) : null;
				setWeatherData(formattedWeatherData);

				setCity(data.name);
				setIsOpen(false);
				setCityNotFound(false);

				console.log('API:', formattedWeatherData);

				// HISTORY
				const isDuplicate = searchHistory.some(
					cityInHistory =>
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
			} catch (error) {
				setCityNotFound(true);
				setWeatherData(null);
				console.error('Error fetching weather data:', error);
			} finally {
				setIsLoading(false);
			}
		},
		[unitsType, searchHistory],
	);

	const locationSearch = () => {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(function (position) {
				const { latitude: lat, longitude: lon } = position.coords;
				const location = { lat, lon };
				fetchWeatherData(location);
			});
		} else {
			console.error('Geolocation is disabled in your browser');
		}
	};

	const handleTemperatureUnitChange = useCallback(
		(unitType: TemperatureUnits) => {
			setUnitsType(unitType);
			fetchWeatherData(city, unitType);
		},
		[city, fetchWeatherData],
	);

	const handleHistoryCityClick = useCallback(
		(city: string) => {
			setCity(city);
			fetchWeatherData(city);
		},
		[fetchWeatherData],
	);

	useEffect(() => {
		const storedHistory = localStorage.getItem('searchHistory');
		if (storedHistory) {
			setSearchHistory(JSON.parse(storedHistory));
		}
	}, []);

	return (
		<main className='home'>
			{
				// 	isLoading ? (
				// 	<div className='home__loader'>
				// 		<Loader />
				// 	</div>
				// ) :
				<div className='home__container'>
					<LeftSide
						searchHistory={searchHistory}
						handleHistoryCityClick={handleHistoryCityClick}
						locationSearch={locationSearch}
						isOpen={isOpen}
						setIsOpen={setIsOpen}
						city={city}
						setCity={setCity}
						fetchWeatherData={fetchWeatherData}
						unitsType={unitsType}
						handleTemperatureUnitChange={handleTemperatureUnitChange}
						isLoading={isLoading}
						cityNotFound={cityNotFound}
						weatherData={weatherData}
					/>

					{weatherData && !cityNotFound ? (
						<RightSide
							currentWeatherOrForecast={currentWeatherOrForecast}
							setCurrentWeatherOrForecast={setCurrentWeatherOrForecast}
							weatherData={weatherData}
							cityNotFound={cityNotFound}
							unitsType={unitsType}
						/>
					) : null}
				</div>
			}

			{/*<WeatherMap />*/}
		</main>
	);
};
