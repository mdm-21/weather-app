import React, { useCallback, useState } from 'react';
import {
	formatDateAndTime,
	formatTemperature,
	weatherIcons,
} from '../../../../utils';
import arrow_right from '../../../../assets/images/arrow_right.svg';
import arrow_left from '../../../../assets/images/arrow_left.svg';
import { IHourlyForecast } from './IHourlyForecast.ts';

export const HourlyForecast: React.FC<IHourlyForecast> = ({
	forecastData,
	unitsType,
}) => {
	const items = 4;
	const [removeVisibleItems, setRemoveVisibleItems] = useState(0);
	const [addVisibleItems, setAddVisibleItems] = useState(items);

	const handleVisibleItems = useCallback(
		(direction: number) => {
			const newRemoveVisibleItems = removeVisibleItems + direction * items;
			const newAddVisibleItems = addVisibleItems + direction * items;

			if (
				newRemoveVisibleItems >= 0 &&
				newAddVisibleItems <= forecastData.list.length
			) {
				setRemoveVisibleItems(newRemoveVisibleItems);
				setAddVisibleItems(newAddVisibleItems);
			}
		},
		[
			removeVisibleItems,
			setRemoveVisibleItems,
			addVisibleItems,
			setAddVisibleItems,
			items,
			forecastData.list.length,
		],
	);

	return (
		<>
			<span className='forecast__container--name'>Hourly Forecast</span>

			<section className='forecast__container--item'>
				<button
					className={
						removeVisibleItems === 0
							? 'forecast__buttons forecast__buttons--disabled'
							: 'forecast__buttons'
					}
					onClick={() => handleVisibleItems(-1)}
				>
					<img
						src={arrow_left}
						alt='swipe-left'
						className='forecast__buttons--item'
					/>
				</button>
				{forecastData.list
					.slice(removeVisibleItems, addVisibleItems)
					.map((item, index) => (
						<div key={index} className='forecast__item'>
							<span className='forecast__item--time'>
								{formatDateAndTime(item.dt, forecastData.timezone).time}
								<br />
								{formatDateAndTime(item.dt, forecastData.timezone).shortDate}
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
						</div>
					))}
				<button
					className={
						addVisibleItems >= forecastData.list.length
							? 'forecast__buttons forecast__buttons--disabled'
							: 'forecast__buttons'
					}
					onClick={() => handleVisibleItems(1)}
				>
					<img
						src={arrow_right}
						alt='swipe-right'
						className='forecast__buttons--item'
					/>
				</button>
			</section>
		</>
	);
};
