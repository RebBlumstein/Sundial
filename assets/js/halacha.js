/* Use the NOAA Solar Equations to calculate relevant Zemanim */

function FindNeitz(date, latitude, longitude, timezone, elevation) {
  var angle = -2*SunRadius() - HorizonModifier(elevation);
  
  return FindMorningElevationTime(date, latitude, longitude, timezone, angle);
}

function FindShkiah(date, latitude, longitude, timezone, elevation) {
  var angle = -2*SunRadius() - HorizonModifier(elevation);
  
  return FindEveningElevationTime(date, latitude, longitude, timezone, angle);
}
