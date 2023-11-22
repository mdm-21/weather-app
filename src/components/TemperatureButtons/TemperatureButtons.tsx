import React from 'react';
import './TemperatureButtons.scss';
import { ITemperatureButtonsProps } from './ITemperatureButtonsProps.ts';
import { TemperatureUnits } from '../../types/TemperatureUnits.ts';

export const TemperatureButtons: React.FC<ITemperatureButtonsProps> = ({
	unitsType,
	handleTemperatureUnitChange,
	city,
}) => {
	const isCityEmpty = !city.trim();

	return (
		<div className='temp-buttons'>
			{Object.values(TemperatureUnits).map(unit => (
				<button
					key={unit}
					onClick={() => !isCityEmpty && handleTemperatureUnitChange(unit)}
					className={
						unitsType === unit
							? 'temp-buttons__item temp-buttons__item--selected'
							: 'temp-buttons__item'
					}
				>
					{unit === TemperatureUnits.METRIC
						? '°C'
						: unit === TemperatureUnits.IMPERIAL
						? '°F'
						: unit === TemperatureUnits.STANDARD
						? '°K'
						: '°C'}
				</button>
			))}
		</div>
	);
};
