/**
 * ## formatAsDayMonthYear
 * 
 * Formats a date in DD/MM/YYYY format.
 * 
 * @description This function takes a JavaScript Date object and converts it to a string
 * in the format "DD/MM/YYYY" where DD is the day (01-31), MM is the month (01-12),
 * and YYYY is the four-digit year.
 * 
 * @param date - The date to format.
 * 
 * @returns Formatted time string in HH:MM:SS format.
 */
export const formatAsDayMonthYear = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  
  return `${ day }/${ month }/${ year }`;
};

/**
 * ## formatAsHoursMinutesSeconds
 * 
 * Formats a date in HH:MM:SS format.
 * 
 * @description This function extracts the time components from a JavaScript Date object
 * and returns a string in the format "HH:MM:SS" where HH is hours (0-23),
 * MM is minutes (00-59), and SS is seconds (00-59). Hours are not zero-padded,
 * but minutes and seconds are always displayed with two digits.
 * 
 * @param date - The date to format.
 * 
 * @returns Formatted time string in HH:MM:SS format.
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
 * Formats a date in DD/MM/YYYY - HH:MM:SS format.
 * 
 * @description This function combines the date and time formatting to create a complete
 * timestamp string. It uses the {@link formatAsDayMonthYear} and {@link formatAsHoursMinutesSeconds}
 * functions, joining their results with a hyphen and spaces.
 * 
 * @param date - The date to format.
 * 
 * @returns Formatted date and time string in DD/MM/YYYY - HH:MM:SS format.
 */
export const formatAsDayMonthYearHoursMinutesSeconds = (date: Date): string => {
  return `${ formatAsDayMonthYear(date) } - ${ formatAsHoursMinutesSeconds(date) }`;
};
