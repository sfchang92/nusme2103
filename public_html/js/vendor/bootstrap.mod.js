//Back to top button animation
$(window).scroll(function() {
  "use strict";
  
	/*Btt button position*/
	if($(this).scrollTop() < 100) {
		$('.btt').removeClass('btt-show');
		$('.btt').removeClass('btt-end');
	}else if($(this).scrollTop() >= $(document).height() - $(this).height() - 60){
		$('.btt').addClass('btt-end');
	}else{
		$('.btt').addClass('btt-show');
		$('.btt').removeClass('btt-end');
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
	
	/*Blur when open menu*/
	$('#bs-example-navbar-collapse-1').on('show.bs.collapse', function () {
		$('#modal-bg').addClass('bg-show');
	});
	$('#bs-example-navbar-collapse-1').on('hide.bs.collapse', function () {
		$('#modal-bg').removeClass('bg-show');
	});
	/*Blur closes menu when pressed*/
	$('#modal-bg').on('click',function () {
		$('#bs-example-navbar-collapse-1').collapse('hide')
	});
	
	/* Go to download tab in Lecture Slides page */
	$('#gotoDownload').on('click',function () {
		$('html,body').animate({
			scrollTop: $('#downloadTab').offset().top - $('div.alert').outerHeight(),
	  }, 300)
	});
	
	/*Back to top*/
	$('#back-to-top').on('click',function () {
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