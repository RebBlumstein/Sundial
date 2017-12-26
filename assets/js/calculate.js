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
    "Alos HaShachar: " + alos.toLocaleTimeString()
    + "<br><h3>Misheyakir: </h3>" + misheyakir.toLocaleTimeString()
    + "<br><h4>Neitz: </h4>" + neitz.toLocaleTimeString()
    + "<br><h5>Sof Zeman Krias Shema: </h5>" + szKriasShema.toLocaleTimeString()
    + "<br><strong>Sof Zeman Tefillah: </strong>" + szTefillah.toLocaleTimeString()
    + "<br>Chatzos: " + chatzos.toLocaleTimeString()
    + "<br>Minchah Gedolah: " + mGedolah.toLocaleTimeString()
    + "<br>Minchah Ketanah: " + mKetanah.toLocaleTimeString()
    + "<br>Plag HaMinchah: " + plag.toLocaleTimeString()
    + "<br>Shkiah: " + shkiah.toLocaleTimeString()
    + "<br>Tzeis: " + tzeis.toLocaleTimeString();
}


// Default the date picker to today
document.getElementById("onDate").valueAsDate = new Date();

// run getResults on our default inputs
getResults();
