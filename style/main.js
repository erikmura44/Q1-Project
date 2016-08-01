$('.city').change(function(){
   city = $(this).val()

   console.log(city)
})
$('.state').change(function(){
   state = $(this).val()
   console.log(state)
})
$('form').on('submit', function(event){
   event.preventDefault()
      myUrl = 'https://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/locations?locality='+city+'&region='+state+'&key=ee92426cf2e9727bd6730249465b5c54',
         console.log(myUrl);
         $.get(myUrl)
         .then (function (data){
            var namesArr = data.data;
               console.log(data.numberOfPages);
                  if (data.numberOfPages > 1){
                     numPages = data.numberOfPages;
                        for(i = 2; i <= numPages; i++){
                           $.get('https://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/locations?locality='+city+'&region='+state+'&p='+i+'&key=ee92426cf2e9727bd6730249465b5c54')
                           .then (function (dataTwo){
                              namesArr = namesArr.concat(dataTwo.data);
                              for(i in namesArr){
                                 if (namesArr[i].brewery.name !== ('Main Brewery')){
                                    console.log(namesArr[i].brewery.name);

                                    var listItems = $('<li>');
                                    listItems.text(namesArr[i].brewery.name);
                                    listItems.addClass('list-group-item');
                                    listItems.attr('data-website', namesArr[i].brewery.website);
                                    listItems.on('click', function(){
                                       var website = $(this).attr('data-website');
                                       $(location).attr('href', website);
                                    })
                                    $('.list-group').append(listItems);
                  }
               }
            })
         }
      } else {
         for(i in namesArr){
               if (namesArr[i].brewery.name !== ('Main Brewery')){
                  console.log(namesArr[i].brewery.name);
                  var listItems = $('<li>');
                  listItems.text(namesArr[i].brewery.name);
                  listItems.addClass('list-group-item');
                  listItems.attr('data-website', namesArr[i].brewery.website);
                  listItems.on('click', function(){
                     var website = $(this).attr('data-website');
                     $(location).attr('href', website);
                  })
                  $('.list-group').append(listItems);

            }
         }
      }
   })
})
