import { DateTime, FixedOffsetZone } from 'luxon';

export const getFormattedDate = (
  secs: number | undefined,
  zone: number | undefined,
) => {
  if (secs !== undefined && zone !== undefined) {
    const offsetInMinutes = zone / 60;
    const customZone = FixedOffsetZone.instance(offsetInMinutes);
    const dateTime = DateTime.fromSeconds(secs).setZone(customZone);

    const date = dateTime.toFormat('cccc, dd.LL.yyyy');
    const time = dateTime.toFormat('hh:mm a');

    return { date, time };
  }
  return { date: 'Unknown Date', time: 'Unknown Time' };
};
