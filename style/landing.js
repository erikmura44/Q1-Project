$(document).ready(function() {
  $('.pour').delay(2000).animate({height: '360px'}, 1500).delay(1600).slideUp(500);//Pour Me Another Drink, Bartender!

  $('#liquid').delay(3400).animate({height: '170px'}, 2500);// I Said Fill 'Er Up!

  $('.beer-foam').delay(3400).animate({bottom: '200px'}, 2500); // Keep that Foam Rollin' Toward the Top! Yahooo!

  $('.hidden').fadeOut(1);
  $('.hidden').removeClass('hidden');
  $('#button').delay(7000).fadeIn(1);
  });
