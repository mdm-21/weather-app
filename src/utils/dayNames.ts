export const dayNames = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
];

export const selectedDayName = (day: string) => {
	const date = new Date(day);
	const dayIndex = date.getDay();

	return dayNames[dayIndex];
};
