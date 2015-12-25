// @koala-prepend "anchor.min.js"
// @koala-prepend "bootstrap-anchor.min.js"
// @koala-prepend "gif.min.js"
// @koala-prepend "jquery.wipetouch.js"
// @koala-prepend "screenfull.min.js"

//Back to top button animation
$(window).on("load resize scroll", function() {
  "use strict";
	
	var posFooter = ($(document).height() - $(this).outerHeight() - $('footer').height() + 30);

	if($(this).scrollTop() < 200) {
		$('.btt').removeClass('btt-show btt-end');
		$('.fs-btn').removeClass('fs-btn-hide');
	}else if( $(this).scrollTop() >= posFooter) {
		$('.btt').addClass('btt-end'); 
		$('.fs-btn').addClass('fs-btn-hide');
	}else{
		$('.btt').addClass('btt-show');
		$('.btt').removeClass('btt-end');
		$('.fs-btn').addClass('fs-btn-hide');
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
	
	//Cookie functions
	function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
	
	}
	function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
	}

	$('[data-toggle="tooltip"]').tooltip();
	
	if(!(getCookie("fs-btn-shown"))){
		$("#fullscreen-btn-modal").modal("show");
		$(".fs-btn").addClass("fs-btn-show");
		$(".btt").addClass("btt-show-tip");
		
		$('#back-to-top,#fullscreen-btn').one('click', function () {
			$("#fullscreen-btn-modal").modal("hide");
		});
		
		$('#fullscreen-btn-modal').on('hide.bs.modal', function () {
			$(".fs-btn").removeClass("fs-btn-show");
			$(".btt").removeClass("btt-show-tip");
			setCookie("fs-btn-shown", 1, 5);
		});
	}
	
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
			if(!(getCookie("gesture-left-shown"))) {
				$("#gesture-left-modal").modal("show");
			};
			setCookie("gesture-left-shown", 1, 5);
		}, 600);
	});
	$("#menu-toggle2,#modal-bg").on("click", function(e) {
		e.preventDefault();
		toggledOff();
	});
	
	$(this).wipetouch({
		wipeRight: function() { toggledOff() },
		wipeLeft: function() { toggledOn()	},
	});
	
	$(".fs-btn").on("click", function() {
    if (screenfull.enabled) {
			screenfull.toggle(); 
			if (screenfull.isFullscreen) {
				$('.fs-btn').addClass('fs-btn-small');
			}else {
				$('.fs-btn').removeClass('fs-btn-small');
			}
    }
	});
	
	//AnchorJS initialisation
	anchors.add();
	
	//Bootstrap Anchor initialisation
	$(this).anchor();
});