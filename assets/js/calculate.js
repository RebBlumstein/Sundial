/* Find the Halachic Zemanim for the given inputs */

function getResults() {
  var latitude = document.getElementById("locLat").value;
  var longitude = document.getElementById("locLon").value;
  var elevation = document.getElementById("locEle").value;
  var timezone = document.getElementById("locTimeZone").value;
  var date = document.getElementById("onDate").valueAsDate;
  
  var neitz = FindNeitz(date, latitude, longitude, timezone, elevation);
  var shkiah = FindShkiah(date, latitude, longitude, timezone, elevation);
  
  document.getElementById("resultsp").innerHTML = "Neitz is on: " + neitz + "<br>Shkiah is on: " + shkiah
}


// Default the date picker to today
document.getElementById("onDate").valueAsDate = new Date();

// run getResults on our default inputs
getResults();
