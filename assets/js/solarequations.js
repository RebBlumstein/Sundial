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

/* Geometric Mean Anomaly of the Sun, in degrees
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

/* Sun Equation of Center
*/
function SunEqnCenter(date) {
  var c = GetJulianCentury(date);
  var m = GeoMeanAnoSun(date);
  
  var u = 1.914602;
  var v = 0.004817;
  var w = 0.000014;
  var x = 0.019993;
  var y = 0.000101;
  var z = 0.000289;
  
  return Math.sin(ToRad(m))*(u - c*(v + w*c)) + Math.sin(ToRad(2*m))*(x - y*c) + Math.sin(ToRad(3*m))*z;
}

/* Sun True Longitude (Degrees)
*/
function SunTrueLon(date) {
  return GeoMeanLonSun(date) + SunEqnCenter(date);
}

/* Sun True Anomaly (Degrees)
*/
function SunTrueAno(date) {
  return GeoMeanAnoSun(date) + SunEqnCenter(date);
}

/* Sun Radius Vector (in AU)
*/
function SunRadiusVector(date) {
  var e = EccEarthOrbit(date); // Eccentricity of Earth's Orbit
  var a = ToRad(SunTrueAno(date)); // Sun True Anomaly in Radians
  
  var i = 1.000001018;
  
  return (i*(1 - e*e))/(1 + e*Math.cos(a))
}

/* Sun Apparent Longitude (Degrees)
*/
function SunAppLong(date) {
  var c = GetJulianCentury(date); // Julian Century
  var lng = SunTrueLon(date); // Sun True Longitude in Radians
  
  var i = 0.00569;
  var j = 0.00478;
  var k = 125.04;
  var l = 1934.136;
  
  return lng - i - j*Math.sin(ToRad(k - l*c));
}
