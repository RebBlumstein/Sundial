/*
This script is designed to test the NOAA Solar Equations for errors and accuracy.
Writes output to id="TestParagraph"
*/

var date = new Date(); // Get the current Date and Time
date.setHours(0, 0, 0, 0); // Set the Time to Midnight

document.getElementById("TestParagraph").value = 
  "<table><tr>\n"
    + "<th>Julian Day</th>\n"
    + "<th>Julian Century</th>\n"
    + "<th>Geo M Long</th>\n"
    + "<th>Geo M Anomaly</th>\n"
    + "<th>Ecc Earth Orb</th>\n"
    + <th>Sun Eqn Center</th>\n"
    + <th>Sun True Long</th>\n"
    + <th>Sun True Anom</th>\n"
    + <th>Sun Radius Vect</th>\n"
    + <th>Sun App Long</th>\n"
    + <th>M Obl of Eclipt</th>\n"
    + <th>Obl Corrected</th>\n"
    + <th>Sun RA</th>\n"
    + <th>Sun Dec</th>\n"
    + <th>Var y</th>\n"
    + <th>Eqn of Time</th>\n"
    + <th>HA Sunrise</th>\n"
    + <th>Solar Noon</th>\n"
    + <th>Ast Sunrise</th>\n"
    + <th>Ast Sunset</th>\n"
    + <th>Sunlight Dur</th>\n"
    + <th>Day Fraction</th>\n"
    + <th>True Sol Time</th>\n"
    + <th>Sol HA</th>\n"
    + <th>Sol Zenith</th>\n"
    + <th>Sol Elev</th>\n"
    + <th>Sol Azimu</th>\n"
    + </tr>\n";

document.getElementById("TestParagraph").value += "</table>";
