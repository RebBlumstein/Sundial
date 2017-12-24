/*
This script is designed to test the NOAA Solar Equations for errors and accuracy.
Writes output to id="TestParagraph"
*/

var date = new Date(); // Get the current Date and Time
date.setHours(0, 6, 0, 0); // Set the Time to 12:06AM

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
    + "<td>" + GetJulianDay(date) + "</td>\n"
    + "<td>" + GetJulianCentury(date) + "</td>\n"
    + "<td>" + GeoMeanLonSun(date) + "</td>\n"
    + "<td>" + GeoMeanAnoSun(date) + "</td>\n"
    + "<td>" + EccEarthOrbit(date) + "</td>\n"
    + "<td>" + SunEqnCenter(date) + "</td>\n"
    + "<td>" + SunTrueLon(date) + "</td>\n"
    + "<td>" + SunTrueAno(date) + "</td>\n"
    + "<td>" + SunRadiusVector(date) + "</td>\n"
    + "<td>" + SunAppLong(date) + "</td>\n"
    + "<td>" + MeanOblEcl(date) + "</td>\n"
    + "<td>" + OblCorr(date) + "</td>\n"
    + "<td>" + SunRA(date) + "</td>\n"
    + "<td>" + SunDec(date) + "</td>\n"
    + "<td>" + VarY(date) + "</td>\n"
    + "<td>" + EqnOfTime(date) + "</td>\n"
    + "<td>" + HASunrise(date, latitude) + "</td>\n"
    + "<td>" + SolarNoon(date, longitude, timezone) + "</td>\n"
    + "<td>" + SolarSunrise(date, latitude, longitude, timezone) + "</td>\n"
    + "<td>" + SolarSunset(date, latitude, longitude, timezone) + "</td>\n"
    + "<td>" + SunlightDuration(date, latitude) + "</td>\n"
    + "<td>" + DayFraction(date) + "</td>\n"
    + "<td>" + TrueSolarTime(date, longitude, timezone) + "</td>\n"
    + "<td>" + SolarHA(date, longitude, timezone) + "</td>\n"
    + "<td>" + SolarZenith(date, latitude, longitude, timezone) + "</td>\n"
    + "<td>" + SolarElevation(date, latitude, longitude, timezone) + "</td>\n"
    + "<td>" + AtmRefraction(date, latitude, longitude, timezone) + "</td>\n"
    + "<td>" + SolarEAatm(date, latitude, longitude, timezone) + "</td>\n"
    + "<td>" + SolarAZ(date, latitude, longitude, timezone) + "</td>\n"
    + "</tr>\n";

// finish the table
outobj.innerHTML += "</table>";
