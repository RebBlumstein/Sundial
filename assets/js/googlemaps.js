// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

      function initAutocomplete() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -33.8688, lng: 151.2195},
          zoom: 13,
          mapTypeId: 'roadmap'
        });

        // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));
                
            // Rewrite the result into the paragraphs
            document.getElementById("GMLat").innerHTML = "Latitude North: " + place.geometry.location.lat();
            document.getElementById("GMLon").innerHTML = "Longitude East: " + place.geometry.location.lng();
                
            document.getElementById("locLat").value = place.geometry.location.lat();
            document.getElementById("locLon").value = place.geometry.location.lng();
            
            // Get Elevation and write it into the paragraph; default to 0.
            var elevator = new google.maps.ElevationService;
            elevator.getElevationForLocations({
                  'locations': [place.geometry.location]
                  },
                  function(results, status) {
                        document.getElementById("GMEle").innerHTML = "Elevation (meters): 0";
                        document.getElementById("locEle").value = 0;
                        if (status === 'OK') {
                              // Retrieve the first result
                              if (results[0]) {
                                    document.getElementById("GMEle").innerHTML = "Elevation (meters): " + results[0].elevation;
                                    document.getElementById("locEle").value = results[0].elevation;
                              }
                  }
            });
             

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });
      }
