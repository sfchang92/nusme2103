//Back to top button animation
$(window).scroll(function() {
  "use strict";
  
  if($(this).width() < 849 || ($(this).width() > 979 && $(this).width() < 1069) || ($(this).width() > 1187 && $(this).width() < 1269)){
	 if($(this).scrollTop() < 100) {
		 $('.btn.btt').stop(true,false).animate({
			opacity:0,
			bottom:"0px"
		 },200);
	 }else if($(this).scrollTop() >= $(document).height() - $(this).height() - 60){
		$('.btn.btt').stop(true,false).animate({
			opacity:1,
			bottom:"90px"
		},200);
	 }else{
		 $('.btn.btt').stop(true,false).animate({
			opacity:0.8,
			bottom:"10px"
		 },200);
	 }
  }else{
	  if($(this).scrollTop() > 100) {
		$('.btn.btt').stop(true,false).animate({
			opacity:1,
		    bottom:"10px"
		},200);
	  }else{
		$('.btn.btt').stop(true,false).animate({
		    opacity:0,
			bottom:"0px"
		},200);
	  }
  }
});

$(document).ready(function() {
	"use strict";
	//Panel scroll to active heading
	$('.panel-group').on('shown.bs.collapse', function () {
	
	  var panel = $(this).find('.in');
	
	  $('html, body').animate({
			scrollTop: panel.offset().top - 92
	  }, 400);
	
	});

	/*Back to top*/
	$('#back-to-top').click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 300);
		$(this).blur();
		return false;
	});
	
	$('ul.dropdown-menu [data-toggle=dropdown]').on('click', function(event) {
		// Avoid following the href location when clicking
		event.preventDefault(); 
		// Avoid having the menu to close when clicking
		event.stopPropagation(); 
		// If a menu is already open we close it
		$('ul.dropdown-menu [data-toggle=dropdown]').parent().removeClass('open');
		// opening the one you clicked on
		$(this).parent().addClass('open');
	});
});