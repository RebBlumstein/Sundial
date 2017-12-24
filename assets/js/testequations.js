/*
This script is designed to test the NOAA Solar Equations for errors and accuracy.
Writes output to id="TestParagraph"
*/

var date = new Date(); // Get the current Date and Time
date.setHours(0, 0, 0, 0); // Set the Time to Midnight

document.getElementById("TestParagraph").value = 
  "<table><tr>
    <th>Julian Day</th>
    <th>Julian Century</th>
    <th>Geo M Long</th>
    <th>Geo M Anomaly</th>
    <th>Ecc Earth Orb</th>
    <th>Sun Eqn Center</th>
    <th>Sun True Long</th>
    <th>Sun True Anom</th>
    <th>Sun Radius Vect</th>
    <th>Sun App Long</th>
    <th>M Obl of Eclipt</th>
    <th>Obl Corrected</th>
    <th>Sun RA</th>
    <th>Sun Dec</th>
    <th>Var y</th>
    <th>Eqn of Time</th>
    <th>HA Sunrise</th>
    <th>Solar Noon</th>
    <th>Ast Sunrise</th>
    <th>Ast Sunset</th>
    <th>Sunlight Dur</th>
    <th>Day Fraction</th>
    <th>True Sol Time</th>
    <th>Sol HA</th>
    <th>Sol Zenith</th>
    <th>Sol Elev</th>
    <th>Sol Azimu</th>
    </tr>";

document.getElementById("TestParagraph").value += "</table>";
