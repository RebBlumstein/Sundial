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
  var commonTzeis = FindCommonTzeis(date, latitude, longitude, timezone, elevation);
  var rtTzeis = FindRTTzeis(date, latitude, longitude, timezone, elevation);
  
  var shaahzemanis = ShaahZemanis(date, latitude, longitude, timezone, elevation);
  
  var chatzosNight = FindChatzosNight(date, latitude, longitude, timezone, elevation);
  
  var szKriasShema = SZShema(date, latitude, longitude, timezone, elevation);
  var szTefillah = SZTefillah(date, latitude, longitude, timezone, elevation);
  var chatzos = Chatzos(date, latitude, longitude, timezone, elevation);
  var mGedolah = MinchahGedolah(date, latitude, longitude, timezone, elevation);
  var mKetanah = MinchahKetanah(date, latitude, longitude, timezone, elevation);
  var plag = Plag(date, latitude, longitude, timezone, elevation);
  var plagBIC = PlagBIC(date, latitude, longitude, timezone, elevation);
  
  var chatzosTonight = FindChatzosTonight(date, latitude, longitude, timezone, elevation);
  
  
  document.getElementById("resultsp").innerHTML =
    "<strong>" + new Date() + "</strong>"
    + "<br><hr>"
    + "<strong>Chatzos Last Night:</strong> " + chatzosNight.toLocaleTimeString()
    + "<br><strong>Alos HaShachar:</strong> " + alos.toLocaleTimeString()
    + "<br><strong>Misheyakir:</strong> " + misheyakir.toLocaleTimeString()
    + "<br><strong>Neitz:</strong> " + neitz.toLocaleTimeString()
    + "<br><hr><strong>Sof Zeman Krias Shema:</strong> " + szKriasShema.toLocaleTimeString()
    + "<br><strong>Sof Zeman Tefillah:</strong> " + szTefillah.toLocaleTimeString()
    + "<br><strong>Chatzos HaYom:</strong> " + chatzos.toLocaleTimeString()
    + "<br><strong>Minchah Gedolah:</strong> " + mGedolah.toLocaleTimeString()
    + "<br><strong>Minchah Ketanah:</strong> " + mKetanah.toLocaleTimeString()
    + "<br><strong>Plag HaMinchah (Gra):</strong> " + plag.toLocaleTimeString()
    + "<br><strong>Plag HaMinchah (Ben Ish Chai):</strong> " + plagBIC.toLocaleTimeString()
    + "<br><hr><strong>Shkiah:</strong> " + shkiah.toLocaleTimeString()
    + "<br><strong>Tzeis HaKochavim:</strong> " + tzeis.toLocaleTimeString()
    + "<br><strong>Common (LeChumrah) Tzeis HaKochavim:</strong> " + commonTzeis.toLocaleTimeString()
    + "<br><strong>Rabbeinu Tam (90 Minutes as Degrees) Tzeis HaKochavim:</strong> " + rtTzeis.toLocaleTimeString()
    + "<br><strong>Chatzos Tonight:</strong> " + chatzosTonight.toLocaleTimeString();
}

// run getResults on our default inputs
getResults();
