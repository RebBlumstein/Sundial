/* Use the NOAA Solar Equations to calculate relevant Zemanim */


/* Find Alos HaShachar
*/
function FindAlos(date, latitude, longitude, timezone, elevation) {
  var angle = 5.3558056;
  
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
  var angle = 5.3558056;
  
  return FindMorningElevationTime(date, latitude, longitude, timezone, angle);
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
