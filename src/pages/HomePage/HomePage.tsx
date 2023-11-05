import { useState, useEffect, KeyboardEvent } from 'react';
import {
	CitySearch,
	CurrentWeather,
	Forecast,
	Loader,
	LocationAndHistoryButtons,
	TemperatureButtons, WeatherDetails
} from "../../components";
import { APIKEY, baseWeatherUrl } from "../../service/API.ts";
import {Coord, WeatherData} from "../../types/IWeather.ts";

import './HomePage.scss';

export const HomePage = () => {
	const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
	const [city, setCity] = useState<string>('');
	const [unitsType, setUnitsType] = useState<string>('metric');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [searchHistory, setSearchHistory] = useState<string[]>([]);
	const [currentWeatherOrForecast, setCurrentWeatherOrForecast] = useState(true);

	const fetchWeatherData = async (url: string) => {
		if (url === '') {
			return;
		}

		try {
			setIsLoading(true);
			const response = await fetch(url);

			if (!response.ok) {
				if (response.status === 404) {
					throw new Error('City not found');
				} else {
					throw new Error('Network/server error');
				}
			}

			const data: WeatherData = await response.json();
			setWeatherData(data);
			setCity(data.name)
			console.log("API:", data)

			// HISTORY
			const isDuplicate = searchHistory.some((cityInHistory) =>
				cityInHistory.toLowerCase() === data.name.toLowerCase()
			);

			if (!isDuplicate) {
				const updatedSearchHistory = [...new Set([...searchHistory, data.name])].slice(-10);
				setSearchHistory(updatedSearchHistory);
				localStorage.setItem('searchHistory', JSON.stringify(updatedSearchHistory));
			}

			setIsLoading(false);

		} catch (error) {
			setIsLoading(false);
		}
	};

	const fetchWeatherDataByCity = async (searchCity: string) => {
		const url = `${baseWeatherUrl}q=${searchCity}&units=${unitsType}&appid=${APIKEY}`;
		fetchWeatherData(url);
	};

	const fetchWeatherDataWithNewUnits = async (city: string, newUnitsType: string) => {
		const url = `${baseWeatherUrl}q=${city}&units=${newUnitsType}&appid=${APIKEY}`;
		fetchWeatherData(url);
	};

	const fetchWeatherDataByLocation = async (location: Coord) => {
		const { lat, lon } = location;
		const url = `${baseWeatherUrl}lat=${lat}&lon=${lon}&units=${unitsType}&appid=${APIKEY}`;
		fetchWeatherData(url);
	};

	useEffect(() => {
		const storedHistory = localStorage.getItem('searchHistory');
		if (storedHistory) {
			setSearchHistory(JSON.parse(storedHistory));
		}
	}, []);

	const locationSearch = () => {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(
				function (position) {
					const { latitude: lat, longitude: lon } = position.coords;
					const location = { lat, lon};
					console.log("Location:", location);
					fetchWeatherDataByLocation(location);
				},
				// function (error) {
					// if (error.code === error.PERMISSION_DENIED) {
					// 	const userConfirmed = window.confirm(
					// 		"Доступ до геолокації відхилено. Бажаєте надати доступ ще раз?"
					// 	);
					//
					// 	if (userConfirmed) {
					// 		if ("geolocation" in navigator) {
					// 			navigator.geolocation.getCurrentPosition(
					// 				function (position) {
					// 					const { latitude, longitude } = position.coords;
					// 					const location = { latitude, longitude };
					// 					console.log("Location:", location);
					// 					fetchWeatherDataByLocation(location);
					// 				},
					// 			);
					// 		}
					// 	}
					// } else {
					// 	console.error("Помилка геолокації:", error);
					// }
				// }
			);
		} else {
			console.error("Геолокація не підтримується в вашому браузері");
		}
	}

	const handleTemperatureUnitChange = (unitType: string) => {
		setUnitsType(unitType);
		fetchWeatherDataWithNewUnits(city, unitType);
	};

	const handleHistoryCityClick = (city: string) => {
		setCity(city);
		fetchWeatherDataByCity(city);
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			fetchWeatherDataByCity(city);
		}
	};

	return (
		<div className="home">
			{isLoading ? (
				<div className="home__loader">
					<Loader />
				</div>
			) : (
				<div className="home__container">
					<div className="home__left-side">
						<div className="home__search-container">
							<LocationAndHistoryButtons searchHistory={searchHistory} handleHistoryCityClick={handleHistoryCityClick} locationSearch={locationSearch}/>

							<CitySearch
								city={city}
								setCity={setCity}
								handleKeyDown={handleKeyDown}
								handleSearch={() => fetchWeatherDataByCity(city)}
							/>

							<TemperatureButtons unitsType={unitsType} handleTemperatureUnitChange={handleTemperatureUnitChange} />

						</div>

						<CurrentWeather weatherData={weatherData} unitsType={unitsType} />
					</div>

					{weatherData ? (
						<div className="home__right-side">
							<div>
								<div className="home__right-side__buttons">
									<button
										onClick={() => setCurrentWeatherOrForecast(true)}
										className={currentWeatherOrForecast ? 'home__right-side__button home__right-side__button--selected' : 'home__right-side__button'}
									>
										Current Weather
									</button>
									<button
										onClick={() => setCurrentWeatherOrForecast(false)}
										className={!currentWeatherOrForecast ? 'home__right-side__button home__right-side__button--selected' : 'home__right-side__button'}
									>
										Forecast
									</button>
								</div>
							</div>
							{!currentWeatherOrForecast && weatherData ? (
									<Forecast lat={weatherData.coord.lat} lon={weatherData.coord.lon} unitsType={unitsType} />
								) :
								<WeatherDetails weatherData={weatherData} unitsType={unitsType} />
							}
						</div>
					) : null}
				</div>
			)}
		</div>
	);
};
