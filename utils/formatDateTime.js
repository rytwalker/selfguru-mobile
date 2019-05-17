const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];
const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

const formatDateTime = dateToParse => {
  let utcDate = new Date(dateToParse);
  let day = days[utcDate.getDay()];
  let month = months[utcDate.getMonth()];
  let date = utcDate.getDate();
  let year = utcDate.getFullYear();
  let hour = utcDate.getHours();

  let minutes = utcDate.getMinutes();
  if (minutes < 10) minutes = `0${minutes}`;
  let period = hour >= 12 ? 'pm' : 'am';
  if (hour > 12) {
    hour -= 2;
  } else if (hour === 0) {
    hour = 12;
  }
  return `${day} ${month} ${date}, ${year} at ${hour}:${minutes}${period}`;
};

export default formatDateTime;

// formatDateTime('2019-05-20T18:00:00.000Z');
