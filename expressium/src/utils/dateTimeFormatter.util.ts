/**
 * ## formatAsDayMonthYear
 * 
 * @description This function takes a JavaScript Date object and converts it to a string
 * in the format "DD-MM-YYYY" where DD is the day (01-31), MM is the month (01-12),
 * and YYYY is the four-digit year.
 * 
 * The function ensures that both day and month are zero-padded to always be two digits,
 * creating a consistent format suitable for sorting and display purposes. This format
 * follows the day-month-year convention commonly used in Europe and many other regions.
 * 
 * @param date - The JavaScript Date object to format. Must be a valid Date instance.
 * If an invalid date is provided, the behavior is undefined.
 * 
 * @returns Formatted date string in DD-MM-YYYY format. For example, January 5, 2023
 * would be formatted as "05-01-2023".
 * 
 * @throws If the provided date is not a Date object.
 */
export const formatAsDayMonthYear = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  
  return `${ day }-${ month }-${ year }`;
};

/**
 * ## formatAsHoursMinutesSeconds
 * 
 * Formats a date in HH:MM:SS format.
 * 
 * @description This function extracts the time components from a JavaScript Date object
 * and returns a string in the format "HH:MM:SS" where HH is hours (0-23),
 * MM is minutes (00-59), and SS is seconds (00-59).
 * 
 * Note that hours are not zero-padded for single-digit values (e.g., "9" instead of "09"),
 * while minutes and seconds are always displayed with two digits. This format is commonly
 * used for displaying time in a 24-hour format.
 * 
 * @param date - The JavaScript Date object to format. Must be a valid Date instance.
 * If an invalid date is provided, the behavior is undefined.
 * 
 * @returns Formatted time string in HH:MM:SS format. For example, 9:05:02 AM
 * would be formatted as "9:05:02".
 * 
 * @throws If the provided date is not a Date object.
 */
export const formatAsHoursMinutesSeconds = (date: Date): string => {
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return `${ hours }:${ minutes }:${ seconds }`;
};

/**
 * ## formatAsDayMonthYearHoursMinutesSeconds
 * 
 * Formats a date in DD-MM-YYYY HH:MM:SS format.
 * 
 * @description This function combines the date and time formatting to create a complete
 * timestamp string. It uses the {@link formatAsDayMonthYear} and {@link formatAsHoursMinutesSeconds}
 * functions internally, joining their results with a space.
 * 
 * This format is useful for providing a complete timestamp that includes both date and time
 * information, making it suitable for logs, reports, and other scenarios where precise
 * datetime information needs to be displayed.
 * 
 * @param date - The JavaScript Date object to format. Must be a valid Date instance.
 * If an invalid date is provided, the behavior is undefined.
 * 
 * @returns Formatted date and time string in DD-MM-YYYY HH:MM:SS format. For example,
 * January 5, 2023, 9:05:02 AM would be formatted as "05-01-2023 9:05:02".
 * 
 * @throws If the provided date is not a Date object.
 * @throws If any of the internal formatting functions throw an error.
 */
export const formatAsDayMonthYearHoursMinutesSeconds = (date: Date): string => {
  return `${ formatAsDayMonthYear(date) } ${ formatAsHoursMinutesSeconds(date) }`;
};
