import { dayNames } from './dayNames.ts';

export const formatTimeAndTime = (dateAndTime: string) => {
  const date = new Date(dateAndTime);
  const dayIndex = date.getDay();

  const dayName = dayNames[dayIndex];
  const formattedDate = `${date.getDate()}.${date.getMonth() + 1}`;

  let hours = date.getHours();
  const minutes = date.getMinutes();
  let period = 'AM';

  if (hours >= 12) {
    period = 'PM';
    if (hours > 12) {
      hours -= 12;
    }
  }

  const formattedHours = `${hours}:${
    minutes < 10 ? '0' : ''
  }${minutes} ${period}`;

  return { dayName, formattedDate, formattedHours };
};
