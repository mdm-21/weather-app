import { DateTime, FixedOffsetZone } from 'luxon';

export const formatDateAndTime = (
	secs: number | undefined,
	zone: number | undefined,
) => {
	if (secs !== undefined && zone !== undefined) {
		const offsetInMinutes = zone / 60;
		const customZone = FixedOffsetZone.instance(offsetInMinutes);
		const dateTime = DateTime.fromSeconds(secs).setZone(customZone);

		const date = dateTime.toFormat('cccc, dd.LL.yyyy');
		const shortDate = dateTime.toFormat('dd.LL');
		const time = dateTime.toFormat('hh:mm a');

		return { date, shortDate, time };
	}
	return {
		date: 'Unknown Date',
		shortDate: 'Unknown Date',
		time: 'Unknown Time',
	};
};
