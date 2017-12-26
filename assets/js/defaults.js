
// Default to Tel Tsiyon, Israel
document.getElementById("locLat").value = 31.8836667;
document.getElementById("locLon").value = 35.2323083;
document.getElementById("locEle").value = 842;

// Default the timezone to the computer's local timezone
document.getElementById("locTimeZone").value = -1*(new Date().getTimezoneOffset())/60;

// Default the date picker to today
document.getElementById("onDate").valueAsDate = new Date();
