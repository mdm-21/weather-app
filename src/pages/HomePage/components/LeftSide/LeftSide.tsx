import React from 'react';
import {
	CitySearch,
	CurrentWeather,
	LocationAndHistoryButtons,
	NotFound,
	TemperatureButtons,
} from '../../../../components';
import { ILeftSideProps } from './ILeftSideProps.ts';
import './LeftSide.scss';
import telegram from '../../../../assets/images/telegram.svg';
import github from '../../../../assets/images/github.svg';

export const LeftSide: React.FC<ILeftSideProps> = ({
	searchHistory,
	handleHistoryCityClick,
	locationSearch,
	isOpen,
	setIsOpen,
	city,
	setCity,
	fetchWeatherData,
	unitsType,
	handleTemperatureUnitChange,
	isLoading,
	cityNotFound,
	weatherData,
}) => (
	<div className='left-side'>
		<div className='left-side__container'>
			<div className='left-side__top'>
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
					city={city}
				/>
			</div>

			{isOpen ? (
				<>
					<h3 className='left-side__name'>History</h3>
					<ul className='left-side__list'>
						{searchHistory.map((searchedCity, index) => (
							<li
								key={index}
								onClick={() => handleHistoryCityClick(searchedCity)}
								className='left-side__list--item'
							>
								{searchedCity}
							</li>
						))}
					</ul>
				</>
			) : // 	: isLoading ? (
			// 	<div className='left-side__loader'>
			// 		<Loader />
			// 	</div>
			// )
			cityNotFound ? (
				<NotFound />
			) : weatherData ? (
				<CurrentWeather
					weatherData={weatherData}
					unitsType={unitsType}
					isLoading={isLoading}
				/>
			) : null}

			<div className='left-side__footer'>
				<a href='https://t.me/mdmytro21'>
					<img
						src={telegram}
						alt='Telegram'
						className='left-side__footer--icon'
					/>
				</a>

				<a href='https://github.com/mdm-21'>
					<img src={github} alt='Github' className='left-side__footer--icon' />
				</a>
				<a href='https://openweathermap.org/'>Open Weather Map</a>
			</div>
		</div>
	</div>
);
