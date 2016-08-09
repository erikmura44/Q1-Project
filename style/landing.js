$(document).ready(function() {
   $('.pour').delay(1000).animate({
      height: '380px'
   }, 1500).delay(1600).slideUp(500); 

   $('#liquid').delay(2400).animate({
      height: '170px'
   }, 2500);

   $('.beer-foam').delay(2400).animate({
      bottom: '200px'
   }, 2500);

   $('.hidden').fadeOut(1);
   $('.hidden').removeClass('hidden');
   $('#button').delay(5000).fadeIn(1);
});
