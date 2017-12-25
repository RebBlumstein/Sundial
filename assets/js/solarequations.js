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

/* Convert Degrees to Radians
*/
function ToRad(degrees) {
  return degrees * Math.PI/180;
}

/* Convert Radians to Degrees
*/
function ToDeg(rad) {
  return rad * 180/Math.PI;
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
  var lng = SunTrueLon(date); // Sun True Longitude
  
  var i = 0.00569;
  var j = 0.00478;
  var k = 125.04;
  var l = 1934.136;
  
  return lng - i - j*Math.sin(ToRad(k - l*c));
}

/* Mean Obliquity of the Ecliptic (Degrees)
*/
function MeanOblEcl(date) {
  var c = GetJulianCentury(date); // Julian Century
  
  var t = 23;
  var u = 26;
  var v = 21.448;
  var w = 46.815;
  var x = 0.00059;
  var y = 0.001813;
  var z = 60;
  
  return t + (u + ((v - c*(w + c*(x - c*y))))/z)/z;
}

/* Obliquity Corrected (Degrees)
*/
function OblCorr(date) {
  var c = GetJulianCentury(date); // Julian Century
  var m = MeanOblEcl(date); // Mean Obliquity
  
  var i = 0.00256;
  var j = 125.04;
  var k = 1934.136;
  
  return m + i*Math.cos(ToRad(j - k*c));
}

/* Sun Right-Ascension (Degrees)
*/
function SunRA(date) {
  var lng = ToRad(SunAppLong(date)); // Sun's Apparent Longitude in Radians
  var obl = ToRad(OblCorr(date)); // Corrected Obliquity in Radians
  
  // NOTE: ATAN2 takes parameters in reverse order in Excel and Google Sheets
  return ToDeg(Math.atan2(Math.cos(obl)*Math.sin(lng), Math.cos(lng)));
}

/* Sun Declination (Degrees)
*/
function SunDec(date) {
  var lng = ToRad(SunAppLong(date)); // Sun's Apparent Longitude in Radians
  var obl = ToRad(OblCorr(date)); // Corrected Obliquity in Radians
  
  return ToDeg(Math.asin(Math.sin(obl)*Math.sin(lng)));
}

/* Variable y as used in the Equation of Time
*/
function VarY(date) {
  var obl = ToRad(OblCorr(date)); // Corrected Obliquity in Radians
  
  return Math.tan(obl/2)*Math.tan(obl/2);
}

/* The Equation of Time (minutes)
See https://en.wikipedia.org/wiki/Equation_of_time
Programmer: This appears to be an alternative version of the second-order approximation in e and y.
*/
function EqnOfTime(date) {
  var gmlng = ToRad(GeoMeanLonSun(date)); // Geometric Mean Longitude of the Sun, in Radians
  var gmano = ToRad(GeoMeanAnoSun(date)); // Geometric Mean Anomaly of the Sun, in Radians
  var ecc = EccEarthOrbit(date); // Eccentricity of Earth's Orbit;
  var y = VarY(date); // variable y in the Equation of Time
  
  var A = y*Math.sin(2*gmlng);
  var B = 2*ecc*Math.sin(gmano);
  var C = 4*ecc*y*Math.sin(gmano)*Math.cos(2*gmlng);
  var D = 0.5*y*y*Math.sin(4*gmlng);
  var E = 1.25*ecc*ecc*Math.sin(2*gmano);
  
  var deltat = 4*ToDeg(A-B+C-D-E);
  
  return deltat;
}

/* Hour-Angle of Sunrise, in Degrees
  date is a Date
  lat is latitude in Degrees
*/
function HASunrise(date, lat) {
  var lr = ToRad(lat); // Latitude in Radians
  var dec = ToRad(SunDec(date)); // Sun Declination in Radians
  
  var i = ToRad(90.833);
  
  return ToDeg(Math.acos(Math.cos(i)/(Math.cos(lr)*Math.cos(dec)) - Math.tan(lr)*Math.tan(dec)))
}

/* Solar Noon as a fraction of time from 12:00AM to 12:00AM
*/
function SolarNoon(date, longitude, timezone) {
  
  var deltat = EqnOfTime(date); // Equation of time, in minutes
  var minInDay = 1440; // Minutes in a Day
  
  return (minInDay/2 - 4*longitude - deltat + timezone*60)/minInDay;
}

/* Astronomical Sunrise as a fraction of time from 12AM to 12AM
*/
function AstSunrise(date, latitude, longitude, timezone) {
  var HA = HASunrise(date, latitude);
  var SN = SolarNoon(date, longitude, timezone);
  var minInDay = 1440;
  
  return SN - 4*HA/minInDay;
}

/* Astronomical Sunset as a fraction of time from 12AM to 12AM
*/
function AstSunset(date, latitude, longitude, timezone) {
  var HA = HASunrise(date, latitude);
  var SN = SolarNoon(date, longitude, timezone);
  var minInDay = 1440;
  
  return SN + 4*HA/minInDay;
}

/* Sunlight Duration (minutes)
*/
function SunlightDuration(date, latitude) {
  return 8*HASunrise(date, latitude);
}

/* Day Fraction
  Returns the fractional part of the current day that has elapsed.
*/
function DayFraction(date) {
  var hr = date.getHours();
  var min = date.getMinutes();
  var sec = date.getSeconds();
  var ms = date.getMilliseconds();
  
  var frac;
  
  frac = (ms / 1000) + sec; // seconds from start of current min
  frac = (frac / 60) + min; // minutes from start of current hour
  frac = (frac / 60) + hr; // hours from 12:00AM
  
  frac = frac / 24; // fraction of hours in a day
  
  return frac;
}

/* Time from Day Fraction
*/
function TimeFromFrac(date, frac) {
  var ms = frac * 24 * 60 * 60 * 1000 % 1000;
  var sec = frac * 24 * 60 * 60 % 60;
  var min = frac * 24 * 60 % 60;
  var hr = frac * 24 % 24;
  
  date2 = new Date(date.getTime());
  date2.setHours(hr, min, sec, ms);
  
  return date2;
}

/* True Solar Time (minutes % minutes in day)
*/
function TrueSolarTime(date, longitude, timezone) {
  var deltat = EqnOfTime(date);
  var minInHour = 60;
  var minInDay = 1440;
  
  var dayPart = DayFraction(date);
  
  return (dayPart*minInDay + deltat + 4*longitude - minInHour*timezone) % minInDay;
}

/* Solar Hour Angle in degrees
*/
function SolarHA(date, longitude, timezone) {
  var t = TrueSolarTime(date, longitude, timezone);
  
  if(t/4 < 0) {
    return t/4 + 180;
  }
  else {
    return t/4 - 180;
  }
  
  // shouldn't get here
  return t/4 - 180;
}

/* Solar Zenith Angle in degrees
*/
function SolarZenith(date, latitude, longitude, timezone) {
  var latR = ToRad(latitude); // latitude in Radians
  var sunDecR = ToRad(SunDec(date)); // Sun Declination in Radians
  var sunHAR = ToRad(SolarHA(date, longitude, timezone)); // Solar HA in Radians
  
  return ToDeg(Math.acos(Math.sin(latR)*Math.sin(sunDecR) + Math.cos(latR)*Math.cos(sunDecR)*Math.cos(sunHAR)));
}

/* Solar Elevation Angle (in Degrees)
*/
function SolarElevation(date, latitude, longitude, timezone) {
  return 90 - SolarZenith(date, latitude, longitude, timezone);
}

/* Approximate Atmospheric Refraction
*/
function AtmRefraction(date, latitude, longitude, timezone) {
  var EA = SolarElevation(date, latitude, longitude, timezone);
  var EAR = ToRad(EA);
  
  if (EA > 85) {
    return 0;
  }
  else if (EA > 5) {
    var i = 58.1;
    var j = 0.07;
    var k = 3;
    var l = 0.000086;
    var m = 5;
    var n = 3600;
    
    return (i/Math.tan(EAR) - j/Math.pow(Math.tan(EAR), k) + l/Math.pow(Math.tan(EAR), m)) / n;
  }
  else if (EA > -0.575) {
    var i = 735;
    var j = -518.2;
    var k = 103.4;
    var l = -12.79;
    var m = 0.711;
    var n = 3600;
    
    return (i + EA*(j + EA*(k + EA*(l + EA*m))))/n;
  }
  else {
    var i = -20.772;
    var j = 3600;
    
    return i/Math.tan(EAR)/j;
  }
}

/* Solar Elevation Angle Adjusted for Atmospheric Refraction
*/
function SolarEAatm(date, latitude, longitude, timezone) {
  return SolarElevation(date, latitude, longitude, timezone) + AtmRefraction(date, latitude, longitude, timezone);
}

/* Solar Azimuth Angle in Degrees
*/
function SolarAZ(date, latitude, longitude, timezone) {
  var LatR = ToRad(latitude);
  var DecR = ToRad(SunDec(date)); // Solar Declination in Radians
  var Ha = SolarHA(date, longitude, timezone); // Solar Hour Angle
  var ZaR = ToRad(SolarZenith(date, latitude, longitude, timezone)); // Solar Zenith Angle in Radians
  
  if (Ha > 0) {
    var i = 180;
    var j = 360;
    
    return (ToDeg(Math.acos(((Math.sin(LatR)*Math.cos(ZaR)) - Math.sin(DecR))/(Math.cos(LatR)*Math.sin(ZaR)))) + i) % j;
  }
  else {
    var i = 540;
    var j = 360;
    
    return (i - ToDeg(Math.acos(((Math.sin(LatR)*Math.cos(ZaR)) - Math.sin(DecR))/(Math.cos(LatR)*Math.sin(ZaR))))) % j;
  }
}






/* My Equations */

/* Horizon Modifier in Degrees
Elevation from Earth's surface causes the horizon to "Lower"
elevation in meters
*/
function HorizonModifier(elevation) {
  var h = elevation/1000; // convert elevation to km
  
  var R = 6371; // Earth Radius in km
  
  return ToDeg(Math.PI/2 - Math.asin(R/(R + h)));
}

/* Sun Apparent Angular Radius in Degrees
*/
function SunRadius() {
  return 0.271014;
}

/* Find Morning Elevation Time
Find the time that a given sun elevation angle is reached
*/
function FindMorningElevationTime(date, latitude, longitude, timezone, angle) {
  var sunrise = TimeFromFrac(date, AstSunrise(date, latitude, longitude, timezone));
  
  // Get a better approximation by rerunning the equation from the first result
  sunrise = TimeFromFrac(sunrise, AstSunrise(sunrise, latitude, longitude, timezone));
  
  var increment;
  var found;
  var date1;
  var date2;
  
  if (angle > SolarEAatm(sunrise, latitude, longitude, timezone)) {
    increment = 3600000;
  }
  else if (angle < SolarEAatm(sunrise, latitude, longitude, timezone)) {
    increment = -3600000;
  }
  else {
    return sunrise;
  }
  
  date1 = new Date(sunrise.getTime());
  found = false;
  while (!found) {
    // increment time forwards or backwards
    date2 = new Date(date1.getTime() + increment);
    
    if (increment < 0) {
      if (SolarEAatm(date2, latitude, longitude, timezone) < angle) {
        // we overshot it, so revert the increment
        date2 = new Date(date1.getTime());
        increment /= 10;
        
        if(Math.abs(increment) <= 1000) {
          found = true;
        }
      }
    }
    else {
      if (SolarEAatm(date2, latitude, longitude, timezone) > angle) {
        // we overshot it, so revert the increment
        date2 = new Date(date1.getTime());
        increment /= 10;
        
        if(Math.abs(increment) <= 1000) {
          found = true;
        }
      }
    }
      
    if (Math.abs(sunrise.getTime() - date2.getTime()) > 86400000) {
      return "Error"
    }
    
    date1 = new Date(date2.getTime());
  }
  
  return date1;
}

/* Find Evening Elevation Time
Find the time that a given sun elevation angle is reached
*/
function FindEveningElevationTime(date, latitude, longitude, timezone, angle) {
  var sunset = TimeFromFrac(date, AstSunset(date, latitude, longitude, timezone));
  
  // Get a better approximation by rerunning the equation from the first result
  sunset = TimeFromFrac(sunset, AstSunset(sunset, latitude, longitude, timezone));
  
  var increment;
  var found;
  var date1;
  var date2;
  
  if (angle > SolarEAatm(sunset, latitude, longitude, timezone)) {
    increment = -3600000;
  }
  else if (angle < SolarEAatm(sunset, latitude, longitude, timezone)) {
    increment = 3600000;
  }
  else {
    return sunset;
  }
  
  date1 = new Date(sunset.getTime());
  found = false;
  while (!found) {
    // increment time forwards or backwards
    date2 = new Date(date1.getTime() + increment);
    
    if (increment < 0) {
      if (SolarEAatm(date2, latitude, longitude, timezone) > angle) {
        // we overshot it, so revert the increment
        date2 = new Date(date1.getTime());
        increment /= 10;
        
        if(Math.abs(increment) <= 1000) {
          found = true;
        }
      }
    }
    else {
      if (SolarEAatm(date2, latitude, longitude, timezone) < angle) {
        // we overshot it, so revert the increment
        date2 = new Date(date1.getTime());
        increment /= 10;
        
        if(Math.abs(increment) <= 1000) {
          found = true;
        }
      }
    }
      
    if (Math.abs(sunset.getTime() - date2.getTime()) > 86400000) {
      return "Error"
    }
    
    date1 = new Date(date2.getTime());
  }
  
  return date1;
}
