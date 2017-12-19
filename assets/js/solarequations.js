/*
These equations for calculating solar position are based on the NOAA equations
*/

/*
  Assumes date is a Date
  Returns the Julian Date
*/
function GetJulianDay(date) {
  var epoch = 2415018.5; // Dec 30, 1899 12:00 AM
  var oaDate = (date - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
  
  return oaDate + epoch;
}

/*
  Assumes date is a Date
  Returns the number of Julian Centuries from Jan 1, 2000
*/
function GetJulianCentury(date) {
  var epoch = 2451545; // Jan 1, 2000 12:00 UTC
  var daysInCentury = 36525;
  
  return (GetJulianDay(date) - epoch) / daysInCentury;
}

/* Geometric Mean Longitude of the Sun, in degrees
  Assumes date is a Date
*/
function GeoMeanLonSun(date) {
  var c = GetJulianCentury(date);
  
  var i = 280.46646;
  var j = 36000.76983;
  var k = 0.0003032;
  
  return (i + c*(j + c*k)) % 360;
}

/* Geometric Mean Anomoly of the Sun, in degrees
  Assumes date is a Date
*/
function GeoMeanAnoSun(date) {
  var c = GetJulianCentury(date);
  
  var i = 357.52911;
  var j = 35999.05029;
  var k = 0.0001537;
  
  return i + c*(j - k*c);
}

/* Eccentricity of Earth's Orbit
  Assumes date is a Date
*/
function EccEarthOrbit(date) {
  var c = GetJulianCentury(date);
  
  var i = 0.016708634;
  var j = 0.000042037;
  var k = 0.0000001267;
  
  return i - c*(j + k*c);
}

/* Convert degrees to radians
*/
function ToRad(degrees) {
  return degrees * Math.PI/180;
}
