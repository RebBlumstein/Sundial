/*
These equations for calculating solar position are based on the NOAA equations
*/

/*
  Assumes date is a Date
  Assumes timezone is UTC offset
*/
function getJulianDay(date, timezone) {
  var epoch = 2415018.5; // Dec 30, 1899 12:00 AM
  var oaDate = (date - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
  
  return oaDate + epoch;
}

/*
  Assumes date is a Date
  Assumes timezone is UTC offset
*/
function getJulianCentury(date, timezone) {
  var epoch = 2451545; // Jan 1, 2000 12:00 UTC
  var daysInCentury = 36525;
  
  return (getJulianDay(date. timezone) - epoch) / daysInCentury;
}
