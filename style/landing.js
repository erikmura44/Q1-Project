$(document).ready(function() {
  $('.pour').delay(1000).animate({height: '380px'}, 1500).delay(1600).slideUp(500);//Pour Me Another Drink, Bartender!

  $('#liquid').delay(2400).animate({height: '170px'}, 2500);// I Said Fill 'Er Up!

  $('.beer-foam').delay(2400).animate({bottom: '200px'}, 2500); // Keep that Foam Rollin' Toward the Top! Yahooo!

  $('.hidden').fadeOut(1);
  $('.hidden').removeClass('hidden');
  $('#button').delay(5000).fadeIn(1);
  });
