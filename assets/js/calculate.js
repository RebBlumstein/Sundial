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
  
  var szKriasShema = SZShema(date, latitude, longitude, timezone, elevation);
  var szTefillah = SZTefillah(date, latitude, longitude, timezone, elevation);
  var chatzos = Chatzos(date, latitude, longitude, timezone, elevation);
  var mGedolah = MinchahGedolah(date, latitude, longitude, timezone, elevation);
  var mKetanah = MinchahKetanah(date, latitude, longitude, timezone, elevation);
  var plag = Plag(date, latitude, longitude, timezone, elevation);
  
  
  document.getElementById("resultsp").innerHTML =
    "Alos HaShachar: " + TimeFormat(alos)
    + "<br>Neitz: " + TimeFormat(neitz)
    + "<br>Sof Zeman Krias Shema: " + TimeFormat(szKriasShema);
}


// Default the date picker to today
document.getElementById("onDate").valueAsDate = new Date();

// run getResults on our default inputs
getResults();
