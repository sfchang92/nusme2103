//Back to top button animation
$(window).scroll(function() {
  "use strict";
	
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
});

$(document).ready(function() {
	"use strict";
	
	/*Back to top*/
	$('#back-to-top').click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 500);
		$(this).blur();
		return false;
	});
	
	$(this).anchor({
		//anchorOffset: '70',
	});
	
	$("#menu-toggle").click(function(e) {
		e.preventDefault();
		$("#wrapper, #modal-bg, .navbar-toggle").toggleClass("toggled");
	});
	$("#modal-bg").on("click tap", function () {
		$("#wrapper, #modal-bg, .navbar-toggle").removeClass("toggled");
	});
		
	$(this).wipetouch({
		wipeRight: function() { $("#wrapper, #modal-bg, .navbar-toggle").removeClass("toggled"); },
		wipeLeft: function() { $("#wrapper, #modal-bg, .navbar-toggle").addClass("toggled"); },
	});
});