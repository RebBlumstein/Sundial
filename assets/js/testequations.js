/*
This script is designed to test the NOAA Solar Equations for errors and accuracy.
Writes output to id="TestParagraph"
*/

var date = new Date(); // Get the current Date and Time
date.setHours(0, 0, 0, 0); // Set the Time to Midnight

var latitude = document.getElementById("locLat").value;
var longitude = document.getElementById("locLon").value;
var elevation = document.getElementById("locEle").value;
var timezone = document.getElementById("locTimeZone").value;

var outobj = document.getElementById("TestParagraph"); // get the reference for the output paragraph


// Put in the table headers
outobj.innerHTML = 
  "<table><tr>\n"
    + "<th>Julian Day</th>\n"
    + "<th>Julian Century</th>\n"
    + "<th>Geo M Long</th>\n"
    + "<th>Geo M Anomaly</th>\n"
    + "<th>Ecc Earth Orb</th>\n"
    + "<th>Sun Eqn Center</th>\n"
    + "<th>Sun True Long</th>\n"
    + "<th>Sun True Anom</th>\n"
    + "<th>Sun Radius Vect</th>\n"
    + "<th>Sun App Long</th>\n"
    + "<th>M Obl of Eclipt</th>\n"
    + "<th>Obl Corrected</th>\n"
    + "<th>Sun RA</th>\n"
    + "<th>Sun Dec</th>\n"
    + "<th>Var y</th>\n"
    + "<th>Eqn of Time</th>\n"
    + "<th>HA Sunrise</th>\n"
    + "<th>Solar Noon</th>\n"
    + "<th>Ast Sunrise</th>\n"
    + "<th>Ast Sunset</th>\n"
    + "<th>Sunlight Dur</th>\n"
    + "<th>Day Fraction</th>\n"
    + "<th>True Sol Time</th>\n"
    + "<th>Sol HA</th>\n"
    + "<th>Sol Zenith</th>\n"
    + "<th>Sol Elev</th>\n"
    + "<th>Atm Refrac</th>\n"
    + "<th>Sol Elev w/ Atm Refrac</th>\n"
    + "<th>Sol Azimu</th>\n"
    + "</tr>\n";

// Enter the values for midnight
outobj.innerHTML = 
  "<table><tr>\n"
    + "<th>" + GetJulianDay(date) + "</th>\n"
    + "<th>" + GetJulianCentury(date) + "</th>\n"
    + "<th>" + GeoMeanLonSun(date) + "</th>\n"
    + "<th>" + GeoMeanAnoSun(date) + "</th>\n"
    + "<th>" + EccEarthOrbit(date) + "</th>\n"
    + "<th>" + SunEqnCenter(date) + "</th>\n"
    + "<th>" + SunTrueLon(date) + "</th>\n"
    + "<th>" + SunTrueAno(date) + "</th>\n"
    + "<th>" + SunRadiusVector(date) + "</th>\n"
    + "<th>" + SunAppLong(date) + "</th>\n"
    + "<th>" + MeanOblEcl(date) + "</th>\n"
    + "<th>" + OblCorr(date) + "</th>\n"
    + "<th>" + SunRA(date) + "</th>\n"
    + "<th>" + SunDec(date) + "</th>\n"
    + "<th>" + VarY(date) + "</th>\n"
    + "<th>" + EqnOfTime(date) + "</th>\n"
    + "<th>" + HASunrise(date, latitude) + "</th>\n"
    + "<th>" + SolarNoon(date, longitude, timezone) + "</th>\n"
    + "<th>" + SolarSunrise(date, latitude, longitude, timezone) + "</th>\n"
    + "<th>" + SolarSunset(date, latitude, longitude, timezone) + "</th>\n"
    + "<th>" + SunlightDuration(date, latitude) + "</th>\n"
    + "<th>" + DayFraction(date) + "</th>\n"
    + "<th>" + TrueSolarTime(date, longitude, timezone) + "</th>\n"
    + "<th>" + SolarHA(date, longitude, timezone) + "</th>\n"
    + "<th>" + SolarZenith(date, latitude, longitude, timezone) + "</th>\n"
    + "<th>" + SolarElevation(date, latitude, longitude, timezone) + "</th>\n"
    + "<th>" + AtmRefraction(date, latitude, longitude, timezone) + "</th>\n"
    + "<th>" + SolarEAatm(date, latitude, longitude, timezone) + "</th>\n"
    + "<th>" + SolarAZ(date, latitude, longitude, timezone) + "</th>\n"
    + "</tr>\n";

// finish the table
outobj.innerHTML += "</table>";
