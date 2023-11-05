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
