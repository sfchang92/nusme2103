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

function showCookieAlert() {
	if(!(getCookie("cookie"))){
		$("#cookie-alert-modal").modal("show");
		$('#cookie-alert-modal').on('hide.bs.modal', function () {
			setCookie("cookie", 1, 5);
		});
	}
}

function showBtnTips() {
	if(!(getCookie("fs-btn-shown"))){
		$("#fs-btn-btt-modal").modal("show");
		$(".fs-btn").addClass("fs-btn-show-tip");
		$(".btt").addClass("btt-show-tip");
		
		$('#back-to-top,#fullscreen-btn').one('click', function () {
			$("#fullscreen-btn-modal").modal("hide");
		});
		
		$('#fs-btn-btt-modal').on('hide.bs.modal', function () {
			$(".fs-btn").removeClass("fs-btn-show-tip");
			$(".btt").removeClass("btt-show-tip");
			setCookie("fs-btn-shown", 1, 5);
			showCookieAlert();
		});
	}
}

function toggledOn() {
	$("#wrapper,body").addClass("toggled");
	//$(".navbar-default").addClass("nav-show");
}
function toggledOff() {
	$("#wrapper,body").removeClass("toggled");
	//$(".navbar-default").removeClass("nav-show");
}


var messagesTrue = ["Good!", "Correct!", "Bullseye!", "Bravo!", "You got it right!"];
var messagesFalse = ["Try again.", "Nope.", "That's not it!", "Incorrect. Look carefully!"]
function getMessage(messages) {
   return messages[Math.floor(Math.random() * messages.length)];
}

function quizTrue(el) {
	$(el).removeClass("btn-default").addClass("btn-success");
	$('#quizTrueModalLabel').text(getMessage(messagesTrue));
	$('#quizTrueModal').modal('show');
	$('#quizTrueModal').data('bs.modal').$backdrop.css('background-color','#5cb85c');
	//alert(getMessage(messagesTrue));
}
function quizFalse(el) {
	$(el).removeClass("btn-default").addClass("btn-danger");
	$('#quizFalseModalLabel').text(getMessage(messagesFalse));
	$('#quizFalseModal').modal('show');
	$('#quizFalseModal').data('bs.modal').$backdrop.css('background-color','#d9534f');
}

$(document).ready(function() {
	"use strict";
	
	$('[data-toggle="tooltip"]').tooltip();
	
	/* Cookie alert */
	if(getCookie("fs-btn-shown")){
		showCookieAlert();
	}
	//QR popover
	$('[data-toggle="popover"]').popover({ html : true });
	
	/* Back to top click*/
	$('#back-to-top').on('click', function () {
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
		wipeLeft: function() { toggledOff() },
		wipeRight: function() { toggledOn()	},
	});
	
	$(".fs-btn").on("click", function() {
    if (screenfull.enabled) {
			screenfull.toggle();
    }
		if (screenfull.isFullscreen) {
			$('.fs-btn').addClass('fs-btn-small');
		}else {
			$('.fs-btn').removeClass('fs-btn-small');
		}
	});
	
	//AnchorJS initialisation
	anchors.add();
	anchors.remove('.no-anchor');
	
	//Bootstrap Anchor initialisation
	$(this).anchor();
});