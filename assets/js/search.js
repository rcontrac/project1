
    // On click function for Search button
 $("#runSearch").on("click", function(){
  searchVal = $("#searchCity").val().trim();

    //Empties the search results section
 $("#tbodyid").empty();

 
  geoURL = "https://maps.googleapis.com/maps/api/geocode/json?address="+ searchVal +"&key=AIzaSyAUDOon4WO3ZCaMTAeTtmIXVH_6_I9gi_M";
  console.log(searchVal);

  $(document).ready(function() {
    console.log( "ready!" );
//  takes a CITY NAME and returns latitude and longitude for the brewery API
$.ajax({
      url: geoURL,
      method: 'GET'
    })
    .done(function(response) {
         console.log(response);
         console.log(response.results[0].geometry.location.lat);
         console.log(response.results[0].geometry.location.lng);
         var searchLat = response.results[0].geometry.location.lat;
         var searchLong = response.results[0].geometry.location.lng;

searchBrewsInTown(searchLat, searchLong); 
})
         function searchBrewsInTown(searchLat, searchLong) {
        var authKey = "6bf963895d0729291380bc463329fa0e";
        //var queryURL = "http://api.brewerydb.com/v2/locations?locality=cary&key=6bf963895d0729291380bc463329fa0e";
        var queryURL2 = "http://api.brewerydb.com/v2/search/geo/point?lat=" + searchLat + "&lng=" + searchLong + "&key=" + authKey;
// 
        $.ajax({
            url: queryURL2,
            method: "GET"
        })
        .done(function(results) {
            console.log(results);
            var brewsResults = results.data;
            for (var i = 0; i < brewsResults.length; i++) {
                
              console.log(results.data[i].brewery.name);      
              console.log(results.data[i].streetAddress);
              console.log(results.data[i].locality);
              console.log(results.data[i].phone)        
              console.log(results.data[i].website);
              console.log(results.data[i].latitude);
              console.log(results.data[i].longitude);

  //Code to append results
                var tr = $('<tr>');
                var tdName = $('<td>').append(results.data[i].brewery.name);
                var tdAddress = $('<td>').append(results.data[i].streetAddress);
                var tdPhone = $('<td>').append(results.data[i].phone); 
                var tdWebsite = $('<td>').append("<a href='" + results.data[i].website + "'>" + results.data[i].website + "</a>");
    
                tr.append(tdName, tdAddress, tdPhone, tdWebsite );
                $('tbody').append(tr);  

                //Marker Pseudocode:

                //Calling addMarker() when the Search button is clicked. A second option: have a separate 'Reveal Markers' button    google.maps.event.addListener(). Line 122.

                //Note: var map (Line 85) is globalized, so that these functions are possible to carry out outside of the initMap function

                //Clearing all markers when a new search is applied. This might have to be done by having a separate "clear markers" button

                //If there's time, add info windows to markers that display bar name; the following code would go under "var marker"
                  //var contentString = results.data[i].brewery.name
                  //var infowindow = new google.maps.InfoWindow({
                        //content: contentString
                        //});
                        //marker.addListener('click', function() {
                            //infowindow.open(map, marker);
                            //});

                //Marker fuction

                //function addMarker() {
                    //var marker = new google.maps.Marker({
                    //position: {lat: results.data[i].latitude, lng: results.data[i].longitude},
                    //map: map
                //});
                 


                
                    
              } 
            })
          }
        })
      })

  //This button clears the results section
  $('#clearAll').on('click', function () {
    $('#tbodyid').empty();
      console.log("All Clear!");
      });
    