//----- Global Vars -----//

var map;
var names = [];
var lat = [];
var long = [];
var links = [];
var marker;
var infowindow;
var namesArr;
var allBreweries;
var breweries;

$('.city').change(function() {
   city = $(this).val()
})
$('#state').change(function() {
   state = $(this).val()
})

//----- Error Message for No Results -----//

function noResults(data){
   if (data.data === undefined){
      $(".output").append("<tr><td></td><td>No Breweries in the " + city + ", " + state + " area, please search again!</td><td></td></tr>");
      $("td").css("color", "red");
   };
}

//----- If API has more than one page, return results of pages added together -----//

function multiplePages(data){
   for (i = 2; i <= numPages; i++) {
      $.get('https://galvanize-cors-proxy.herokuapp.com///api.brewerydb.com/v2/locations?locality=' + city + '&region=' + state + '&p=' + i + '&key=ee92426cf2e9727bd6730249465b5c54')
         .then(function(dataTwo) { ///if API has more than one page,
            namesArr = namesArr.concat(dataTwo.data); ///add the data from the second page to the first
            loop(data);
            initMap(lat, long);
            createMarkers(lat, long);
            for (i in namesArr) {
               $(".output").append("<tr><td>" + namesArr[i].brewery.name + " - " + namesArr[i].name + "</td><td>" + namesArr[i].brewery.description + "</td><td><a href=" + namesArr[i].brewery.website + " target=" + "_blank" + ">Website</a> </td></tr>");
               $(".output td:nth-child(2)").css("font-size", "0.8em");
         }
      })
   }
}

//----- If API has one page, return results -----//

function onePage(data){
   for (i in namesArr) {
      loop(data);
      initMap(lat, long);
      createMarkers(lat, long);
      $(".output").append("<tr><td>" + namesArr[i].brewery.name + "</td><td>" + namesArr[i].brewery.description + "</td><td> <a href=" + namesArr[i].brewery.website + " target=" + "_blank" + ">Website</a> </td></tr>")
      $(".output td:nth-child(2)").css("font-size", "0.8em");
   }
}

//----- Creating data arrays for map markers -----//

function loop(data) {
   for (var i in namesArr) {
      // Create arrays to hold names and addresses
      names.push(namesArr[i].brewery.name);
      lat.push(namesArr[i].latitude);
      long.push(namesArr[i].longitude);
      links.push(namesArr[i].brewery.website);
   }
}

//----- Creating the Map, adding markers from data arrays-----//

function initMap(lat, long) {
   map = new google.maps.Map(document.getElementById('map'), {
      center: {
         lat: lat[0],
         lng: long[0]
      },
      scrollwheel: false,
      zoom: 12
   });
}

function createMarkers(lat, long) {
   for (var j in lat) {
      marker = new google.maps.Marker({
         position: {
            lat: lat[j],
            lng: long[j]
         },
         title: names[j],
         map: map
      });

      var content = '<a href="' + links[j] + '" target="_blank">' + names[j] + '</a>';
      infowindow = new google.maps.InfoWindow();
      google.maps.event.addListener(marker, 'click', (function(marker, content, infowindow) {
         return function() {
            infowindow.setContent(content);
            infowindow.open(map, marker);
            setTimeout(function() {
               infowindow.close();
            }, 1500);
         };
      })(marker, content, infowindow));
   }
}

//----- Main Function for Getting API information -----//

$('form').on('submit', function(event) {
   event.preventDefault()
   names = []; // Emptying data markers on google maps on next submit
   lat = []; // Emptying data markers on google maps on next submit
   long = []; // Emptying data markers on google maps on next submit
   links = []; // Emptying data markers on google maps on next submit
   myUrl = 'https://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/locations?locality=' + city + '&region=' + state +
      '&key=ee92426cf2e9727bd6730249465b5c54',
      console.log(myUrl);
   $.get(myUrl)
      .then(function(data) {
         namesArr = data.data; ///assigning variable to the data
         noResults(data);
         if (data.numberOfPages > 1) { ///checking if the API is more than 1 page
            numPages = data.numberOfPages;
            multiplePages(data);
         } else {
            onePage(data);
      }
   })
});

$('.city').focus(function() {
   $('td').remove();
   $("input[type=text], textarea").val("");
})
$('#state').focus(function() {
   $('td').remove();
})

var quotes = [
   "He was a wise man who invented beer. - Plato",
   "Beer, if drunk in moderation, softens the temper, cheers the spirit and promotes health. - Thomas Jefferson",
   "Beer, it’s the best damn drink in the world. - Jack Nicholson",
   "There is no such thing as a bad beer. It’s that some taste better than others. - Bill Carter",
   "The best beer in the world is the open bottle in your hand - Danny Jansen",
   "Beer is not the answer. Beer is the question. 'Yes' is the answer.",
   "Beer’s intellectual. What a shame so many idiots drink it. - Ray Bradbury",
   "I work until beer o'clock",
   "Beer is living proof that God loves us an wants us to be happy.",
   "Beer: It doesn't have many vitamins, that's why you need to drink lots of it.",
   "Friends bring happiness into your life, best friends bring beer.",
   "I got 99 problems & beer solves all of 'em - Earl Dibbles Jr"
];

function generate() {
   return Math.floor(Math.random() * quotes.length);
}
$(document).ready(function() {
   $(".quote").html(quotes[generate()]);
})
