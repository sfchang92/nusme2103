// @koala-prepend "anchor.min.js"
// @koala-prepend "bootstrap-anchor.min.js"
// @koala-prepend "gif.min.js"
// @koala-prepend "jquery.wipetouch.js"

//Back to top button animation
$(window).scroll(function() {
  "use strict";
	
	if($(this).scrollTop() < 100) {
		$('.btt').removeClass('btt-show btt-end');
	}else if($(this).scrollTop() >= $(document).height() - $(this).height() - $('footer').height()) {
		$('.btt').addClass('btt-end');
	}else{
		$('.btt').addClass('btt-show');
		$('.btt').removeClass('btt-end');
	}
});

/* Navbar hide on scrolling */
var didScroll;
var lastScrollTop = 0;
var navbarHeight = $('.navbar').outerHeight();
var width = $(window).width(); 

$(window).scroll(function(event){
		didScroll = true;
});

var scrollDetect = setInterval(function() {
	if (didScroll) {
		hasScrolled();
		didScroll = false;
	}
}, 500);

function hasScrolled() {
	var st = $(this).scrollTop();
	
	// Make sure they scroll more than delta
	if(Math.abs(lastScrollTop - st) <= navbarHeight)
			return;
	
	// If they scrolled down and are past the navbar, add class .nav-up.
	// This is necessary so you never see what is "behind" the navbar.
	if (st > lastScrollTop && st > navbarHeight){
			// Scroll Down
			$('.navbar').addClass('nav-hide');
	} else {
			// Scroll Up
			if(st + $(window).height() < $(document).height()) {
					$('.navbar').removeClass('nav-hide');
			}
	}
	lastScrollTop = st;
}
	
$(document).ready(function() {
	"use strict";
	
	var showLeft = true;
	//var showRight = true;
	function toggledOn() {
		$("#wrapper,body").addClass("toggled");
		$(".navbar-default").addClass("nav-show");
	}
	function toggledOff() {
		$("#wrapper,body").removeClass("toggled");
		$(".navbar-default").removeClass("nav-show");
	}

	/* Back to top click*/
	$('#back-to-top,#back-to-top2').on('click', function () {
		$('body,html').animate({
			scrollTop: 0
		}, 500);
		$(this).blur();
		return false;
	});

	$("#menu-toggle").on("click", function(e) {
		e.preventDefault();
		toggledOn();
		setTimeout(function(){
			if(showLeft) {
				$("#gesture-left-modal").modal("show");
			};
			showLeft = false;
		}, 600);
	});
	$("#menu-toggle2,#modal-bg").on("click", function(e) {
		e.preventDefault();
		toggledOff();
		/*
		setTimeout(function(){
			if(showRight) {
				$("#gesture-right-modal").modal("show");
			};
			showRight = false;
		}, 600);*/
	});
	
	$(this).wipetouch({
		wipeRight: function() { toggledOff() },
		wipeLeft: function() { toggledOn()	},
	});

	//AnchorJS initialisation
	anchors.add();
	
	//Bootstrap Anchor initialisation
	$(this).anchor();
});