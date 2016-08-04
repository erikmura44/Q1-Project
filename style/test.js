$('.city').change(function(){
   city = $(this).val()
   console.log(city)
})
$('.state').change(function(){
   state = $(this).val()
   console.log(state)
})

var map;
var names = [];
var lat = [];
var long = [];
var links = [];
var marker;
var markers = [];
var infowindow;


//----- Functions for Map -----//

function loop(data){
  for(var i in data.data){
    // Create arrays to hold names and addresses
    names.push(data.data[i].brewery.name);
    lat.push(data.data[i].latitude);
    long.push(data.data[i].longitude);
    links.push(data.data[i].brewery.website);
  }
}

function initMap(lat,long) {
  // Create a map object and specify the DOM element for display.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: lat[0], lng: long[0]},
    scrollwheel: false,
    zoom: 12
  });
}

function createMarkers(lat,long){
  for (var j in lat){
    marker = new google.maps.Marker({
      position: {lat: lat[j], lng: long[j]},
      title: names[j],
      map: map
    });

    var content = '<a href="' + links[j] + '" target="_blank">' + names[j] + '</a>';
    infowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){
        return function() {
           infowindow.setContent(content);
           infowindow.open(map,marker);
           setTimeout(function () { infowindow.close(); }, 3000);
        };
    })(marker,content,infowindow));
  }
}

//----- Main Function for Getting API information -----//


$('form').on('submit', function(event){
   event.preventDefault()
   var allBreweries = []
   var breweries = []
      myUrl = 'https://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/locations?locality='+city+'&region='+state+'&key=ee92426cf2e9727bd6730249465b5c54',
      console.log(myUrl)
         $.get(myUrl)
         .then (function (data){
            var namesArr = data.data; ///assigning variable to the data
            if (data.numberOfPages > 1){ ///checking if the API is more than 1 page
               numPages = data.numberOfPages;
               for(i = 2; i <= numPages; i++){
                  $.get('https://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/locations?locality='+city+'&region='+state+'&p='+i+'&key=ee92426cf2e9727bd6730249465b5c54')
                  .then(function (dataTwo) {
                    loop(data);
                    initMap(lat,long);
                    createMarkers(lat,long);
                        namesArr = namesArr.concat(dataTwo.data);  ///add the data from the second page to the first
                        for(i in namesArr){
                           $(".output").append("<tr><td>"+namesArr[i].brewery.name+"</td><td>"+namesArr[i].brewery.description+"</td><td> <a href="+namesArr[i].brewery.website+" target="+"_blank"+">Website</a> </td></tr>")
                              allBreweries.push(namesArr[i]);
                        }
                     })
                  }
               } else {
                  for(i in namesArr){
                     loop(data);
                     initMap(lat,long);
                     createMarkers(lat,long);
                        $(".output").append("<tr><td>"+namesArr[i].brewery.name+"</td><td>"+namesArr[i].brewery.description+"</td><hr><td> <a href="+namesArr[i].brewery.website+" target="+"_blank"+">Website</a> </td></tr>")
                           allBreweries.push(namesArr[i])
            }
         }
      })
   });

$('.city').focus(function(){
   $('td').remove();
   $("input[type=text], textarea").val("");
   marker = {};
})
$('.state').focus(function(){
   $('td').remove();
})

var quotes = [
   "Beer, it’s the best damn drink in the world.",
   "There is no such thing as a bad beer. It’s that some taste better than others.",
   "The best beer in the world is the open bottle in your hand - Danny Jansen",
   "Beer is not the answer. Beer is the question. 'Yes' is the answer.",
   "I work until beer o'clock",
   "Beer is living proof that God loves us an wants us to be happy.",
   "Beer: It doesn't have many vitamins, that's why you need to drink lots of it.",
   "Friends bring happiness into your life, best friends bring beer.",
   "I got 99 problems & beer solves all of 'em - Earl Dibbles Jr'"
            ];
function generate(){
   return Math.floor(Math.random() * quotes.length);
}
$(document).ready(function() {
   $(".quote").html(quotes[generate()]);
})