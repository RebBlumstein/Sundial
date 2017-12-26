/* Find the Halachic Zemanim for the given inputs */

function getResults() {
  var latitude = document.getElementById("locLat").value;
  var longitude = document.getElementById("locLon").value;
  var elevation = document.getElementById("locEle").value;
  var timezone = document.getElementById("locTimeZone").value;
  var date = document.getElementById("onDate").valueAsDate;
  
  var alos = FindAlos(date, latitude, longitude, timezone, elevation);
  var misheyakir = FindMisheyakir(date, latitude, longitude, timezone, elevation);
  var neitz = FindNeitz(date, latitude, longitude, timezone, elevation);
  var shkiah = FindShkiah(date, latitude, longitude, timezone, elevation);
  var tzeis = FindTzeis(date, latitude, longitude, timezone, elevation);
  
  var shaahzemanis = ShaahZemanis(date, latitude, longitude, timezone, elevation);
  
  var chatzosNight = FindChatzosNight(date, latitude, longitude, timezone, elevation);
  
  var szKriasShema = SZShema(date, latitude, longitude, timezone, elevation);
  var szTefillah = SZTefillah(date, latitude, longitude, timezone, elevation);
  var chatzos = Chatzos(date, latitude, longitude, timezone, elevation);
  var mGedolah = MinchahGedolah(date, latitude, longitude, timezone, elevation);
  var mKetanah = MinchahKetanah(date, latitude, longitude, timezone, elevation);
  var plag = Plag(date, latitude, longitude, timezone, elevation);
  
  var chatzosTonight = FindChatzosTonight(date, latitude, longitude, timezone, elevation);
  
  
  document.getElementById("resultsp").innerHTML =
    "<strong>Chatzos Last Night:</strong> " + chatzosNight.toLocaleTimeString()
    + "<br><strong>Alos HaShachar:</strong> " + alos.toLocaleTimeString()
    + "<br><strong>Misheyakir:</strong> " + misheyakir.toLocaleTimeString()
    + "<br><strong>Neitz:</strong> " + neitz.toLocaleTimeString()
    + "<br><hr><strong>Sof Zeman Krias Shema:</strong> " + szKriasShema.toLocaleTimeString()
    + "<br><strong>Sof Zeman Tefillah:</strong> " + szTefillah.toLocaleTimeString()
    + "<br><strong>Chatzos:</strong> " + chatzos.toLocaleTimeString()
    + "<br><strong>Minchah Gedolah:</strong> " + mGedolah.toLocaleTimeString()
    + "<br><strong>Minchah Ketanah:</strong> " + mKetanah.toLocaleTimeString()
    + "<br><strong>Plag HaMinchah:</strong> " + plag.toLocaleTimeString()
    + "<br><hr><strong>Shkiah:</strong> " + shkiah.toLocaleTimeString()
    + "<br><strong>Tzeis HaKochavim:</strong> " + tzeis.toLocaleTimeString()
    + "<br><strong>Chatzos Tonight:</strong> " + chatzosTonight.toLocaleTimeString();
}


// Default the date picker to today
document.getElementById("onDate").valueAsDate = new Date();

// Get the current timezone for the default location
var loc = "31.8836667, 35.2323083"; // Tel Tsiyon
var d = new Date(); // Current date/time of user computer
var ts = d.getTime()/1000 + d.getTimezoneOffset() * 60; // seconds since January 1, 1970 00:00 UTC
var key = "AIzaSyCX7sylZzfohGH2lTNdVny47k0LY36XZmw";
var call = "https://maps.googleapis.com/maps/api/timezone/json?location=" + loc + "&timestamp=" + ts + "&key=" + key;
 
var xhr = new XMLHttpRequest();
xhr.open("GET", call);
xhr.onload = function() {
    if (xhr.status === 200) { // if Ajax request successful
        var output = JSON.parse(xhr.responseText); // convert returned JSON string to JSON object
        console.log(output.status); // log API return status for debugging purposes
        if (output.status == "OK") { // if API reports everything was returned successfully
            var offsets = output.dstOffset * 1000 + output.rawOffset * 1000 // get DST and time zone offsets in milliseconds
            var localdate = new Date(ts * 1000 + offsets) // Date object containing current time of Tokyo (timestamp + dstOffset + rawOffset)
            console.log(localdate.toLocaleString()) // Display current date and time
        }
    }
    else {
        console.log("Timezone request failed.  Returned status of " + xhr.status)
    }
};
xhr.send();

// run getResults on our default inputs
getResults();
