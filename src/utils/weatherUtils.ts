// import { useEffect } from 'react';

export const formatTemperature = (temperature: number, unitsType: string) => {
	if (unitsType === 'metric') {
		return `${Math.round(temperature)}°C`;
	} else if (unitsType === 'imperial') {
		return `${Math.round(temperature)}°F`;
	} else if (unitsType === 'standard') {
		return `${Math.round(temperature)}°K`;
	} else {
		return `${Math.round(temperature)}°C`;
	}
};

// export const formatTemperatureType = (
// 	unitsType: string,
// 	setTempType: (tempType: string) => void,
// ) => {
// 	if (unitsType === 'metric') {
// 		setTempType('°C');
// 	} else if (unitsType === 'imperial') {
// 		setTempType('°F');
// 	} else if (unitsType === 'standard') {
// 		setTempType('°K');
// 	} else {
// 		setTempType('°C');
// 	}
// };
