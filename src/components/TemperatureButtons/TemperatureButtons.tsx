import React from 'react';
import "./TemperatureButtons.scss";

interface TemperatureButtonsProps {
	unitsType: string;
	handleTemperatureUnitChange: (unitType: string) => void;
}

export const TemperatureButtons: React.FC<TemperatureButtonsProps> = ({ unitsType, handleTemperatureUnitChange }) => {
	return (
		<div className="temp-buttons">
			{['metric', 'imperial', 'standard'].map((unit) => (
				<button
					key={unit}
					onClick={() => handleTemperatureUnitChange(unit)}
					className={unitsType === unit ? 'temp-buttons__item temp-buttons__item--selected' : 'temp-buttons__item'}
				>
					{unit === 'metric' ? '°C' : unit === 'imperial' ? '°F' : unit === 'standard' ? '°K' : '°C'}
				</button>
			))}
		</div>
	);
};

