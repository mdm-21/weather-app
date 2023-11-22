import React from 'react';
import show_more from '../../../../assets/images/show_more.svg';
import {
	formatDateAndTime,
	formatTemperature,
	weatherIcons,
} from '../../../../utils';
import { IDailyForecastProps } from './IDailyForecastProps.ts';
import { selectedDayName } from '../../../../utils/dayNames.ts';

export const DailyForecast: React.FC<IDailyForecastProps> = ({
	forecastDailyData,
	unitsType,
	activeItemIndex,
	handleShowMoreClick,
}) => {
	return (
		<>
			<span className='forecast__container--name'>5-day Forecast</span>

			<section className='forecast__container--item'>
				{forecastDailyData.list.map((item, index) => (
					<div key={index} className='forecast__item'>
						<span className='forecast__item--time'>
							{index < 2
								? index === 0
									? 'Today'
									: 'Tomorrow'
								: selectedDayName(item.dt_txt)}
							<br />
							{formatDateAndTime(item.dt, forecastDailyData.timezone).shortDate}
						</span>
						<span className='forecast__item--temp'>
							{formatTemperature(item.temp, unitsType)}
						</span>

						<img
							src={weatherIcons[item.main]}
							className='forecast__item--icon'
							alt=''
						/>

						<span className='forecast__item--weather'>{item.main}</span>

						<button
							className={`forecast__item--button ${
								activeItemIndex === index
									? 'forecast__item--button--active'
									: ''
							}`}
							onClick={() => handleShowMoreClick(item, index)}
						>
							<img
								src={show_more}
								className='forecast__item--show-more'
								alt='show more'
							/>
						</button>
					</div>
				))}
			</section>
		</>
	);
};
