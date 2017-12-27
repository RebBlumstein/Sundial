/* Use the NOAA Solar Equations to calculate relevant Zemanim */


/* Find Alos HaShachar
*/
function FindAlos(date, latitude, longitude, timezone, elevation) {
  var angle = -20.384972;
  
  return FindMorningElevationTime(date, latitude, longitude, timezone, angle);
}

/* Find Misheyakir
*/
function FindMisheyakir(date, latitude, longitude, timezone, elevation) {
  var angle = -11.5;
  
  return FindMorningElevationTime(date, latitude, longitude, timezone, angle);
}

/* Find the time of Neitz
this will yield an uncommon zeman because of elevation and our sophisticated model of atmospheric refraction.
*/
function FindNeitz(date, latitude, longitude, timezone, elevation) {
  var angle = -SunRadius() - HorizonModifier(elevation);
  
  return FindMorningElevationTime(date, latitude, longitude, timezone, angle);
}

/* Find the time of Shkiah
this will yield an uncommon zeman because of elevation and our sophisticated model of atmospheric refraction.
*/
function FindShkiah(date, latitude, longitude, timezone, elevation) {
  var angle = -SunRadius() - HorizonModifier(elevation);
  
  return FindEveningElevationTime(date, latitude, longitude, timezone, angle);
}

/* Find Tzeis HaKochavim
*/
function FindTzeis(date, latitude, longitude, timezone, elevation) {
  var angle = -5.355806;
  
  return FindEveningElevationTime(date, latitude, longitude, timezone, angle);
}

/* Find "36 Minutes" Common Tzeis HaKochavim
*/
function FindCommonTzeis(date, latitude, longitude, timezone, elevation) {
  var angle = -8.5;
  
  return FindEveningElevationTime(date, latitude, longitude, timezone, angle);
}

/* Find "90 Minutes" Rabbeinu Tam Tzeis HaKochavim
*/
function FindRTTzeis(date, latitude, longitude, timezone, elevation) {
  var angle = -20.384972;
  
  return FindEveningElevationTime(date, latitude, longitude, timezone, angle);
}


/* Find Chatzos HaLailah of last night
*/
function FindChatzosNight(date, latitude, longitude, timezone, elevation) {
  var yesterday = new Date(date.getTime() - 86400000);
  
  var tzeis = FindTzeis(yesterday, latitude, longitude, timezone, elevation);
  var alos = FindAlos(date, latitude, longitude, timezone, elevation);
  
  return new Date(tzeis.getTime() + (alos.getTime() - tzeis.getTime())/2);
}

/* Find Chatzos HaLailah of tonight
*/
function FindChatzosTonight(date, latitude, longitude, timezone, elevation) {
  var tomorrow = new Date(date.getTime() + 86400000);
  
  var tzeis = FindTzeis(date, latitude, longitude, timezone, elevation);
  var alos = FindAlos(tomorrow, latitude, longitude, timezone, elevation);
  
  return new Date(tzeis.getTime() + (alos.getTime() - tzeis.getTime())/2);
}

/* Find the length of a Sha'ah Zemanis in ms
*/
function ShaahZemanis(date, latitude, longitude, timezone, elevation) {
  var neitz = FindNeitz(date, latitude, longitude, timezone, elevation);
  var shkiah = FindShkiah(date, latitude, longitude, timezone, elevation);
  
  return (shkiah.getTime() - neitz.getTime())/12;
}

/* Find Sof Zeman Krias Shema
*/
function SZShema(date, latitude, longitude, timezone, elevation) {
  var neitz = FindNeitz(date, latitude, longitude, timezone, elevation);
  var sz = ShaahZemanis(date, latitude, longitude, timezone, elevation);
  
  return new Date(neitz.getTime() + sz*3);
}

/* Find Sof Zeman Tefillah
*/
function SZTefillah(date, latitude, longitude, timezone, elevation) {
  var neitz = FindNeitz(date, latitude, longitude, timezone, elevation);
  var sz = ShaahZemanis(date, latitude, longitude, timezone, elevation);
  
  return new Date(neitz.getTime() + sz*4);
}

/* Find Chatzos
*/
function Chatzos(date, latitude, longitude, timezone, elevation) {
  var neitz = FindNeitz(date, latitude, longitude, timezone, elevation);
  var sz = ShaahZemanis(date, latitude, longitude, timezone, elevation);
  
  return new Date(neitz.getTime() + sz*6);
}

/* Find Minchah Gedolah
*/
function MinchahGedolah(date, latitude, longitude, timezone, elevation) {
  var neitz = FindNeitz(date, latitude, longitude, timezone, elevation);
  var sz = ShaahZemanis(date, latitude, longitude, timezone, elevation);
  
  return new Date(neitz.getTime() + sz*6.5);
}

/* Find Minchah Ketanah
*/
function MinchahKetanah(date, latitude, longitude, timezone, elevation) {
  var neitz = FindNeitz(date, latitude, longitude, timezone, elevation);
  var sz = ShaahZemanis(date, latitude, longitude, timezone, elevation);
  
  return new Date(neitz.getTime() + sz*9.5);
}

/* Find Plag HaMinchah
*/
function Plag(date, latitude, longitude, timezone, elevation) {
  var neitz = FindNeitz(date, latitude, longitude, timezone, elevation);
  var sz = ShaahZemanis(date, latitude, longitude, timezone, elevation);
  
  return new Date(neitz.getTime() + sz*10.75);
}
