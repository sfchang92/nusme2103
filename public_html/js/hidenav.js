var didScroll;
var lastScrollTop = 0;
var delta = 48;
var navbarHeight = $('header').outerHeight();
var st;

//Navigation hide/show
var show_nav = function() { 
  "use strict";		  
  $('header').removeClass('nav-up');
  $('footer').removeClass('foot-down');
  $('.nav-float').removeClass('btt-out');
};
var hide_nav = function() { 
  "use strict";	  
  $('header').addClass('nav-up');
  $('footer').addClass('foot-down');
  $('.nav-float').addClass('btt-out');
};
var hide_time = 3000;
var hide_timeout = setTimeout(function(){"use strict";hide_nav();}, hide_time);

//Show header and footer when anywhere is clicked and hide afterwards
$(document).on("click tap", function (e) {
	if(!$(e.target).is('figure','figure img')&&autohide){
		clearTimeout(hide_timeout);
		hide_timeout = setTimeout(function(){"use strict";hide_nav();}, hide_time);
		show_nav();
	}
});

// Hide Header, Footer and Btt on scroll down
$(window).scroll(function(){
  "use strict";
  didScroll = true;
});
					  
setInterval(function() {
  "use strict";
  if (didScroll) {
	  hasScrolled();
	  didScroll = false;
  }
}, 250);

function hasScrolled() {
  "use strict";
  st = $(document).scrollTop();			  
  // Make sure they scroll more than delta
  if(Math.abs(lastScrollTop - st) <= delta)
  {return;}
  // If they scrolled down and are past the navbar, add class .nav-up.
  // This is necessary so you never see what is "behind" the navbar.
  if (st > lastScrollTop && st > navbarHeight){
	  // Scroll Down
	  $('header').addClass('nav-up');
	  $('footer').addClass('foot-down');
	  $('.nav-float').addClass('btt-out');
      clearTimeout(hide_timeout);
  } else {
	  // Scroll Up
	  if(st + $(window).height() < $(document).height()) {
		  $('header').removeClass('nav-up');
		  $('footer').removeClass('foot-down');
		  $('.nav-float').removeClass('btt-out');
	  }
  }
  lastScrollTop = st;
}

//Responsive
var min_width;
if (Modernizr.mq('(min-width: 0px)')) {
// Browsers that support media queries
min_width = function (width) {
  return Modernizr.mq('(min-width: ' + width + 'px)');
};
}
else {
// Fallback for browsers that does not support media queries
min_width = function (width) {
	"use strict";
	return $(window).width() >= width;
};
}
var resize = function() {
	"use strict";
	if (min_width(767)) {
	  $('#revealtips,#revealtipsbg').css({"display":"none"});
	  $("#responsive-menu-button").sidr({
		name: 'sidebar',
		source: '#sidr-main',
		body:'body,#mobile-header,footer'
	  });
	  $.sidr('open', 'sidebar');
	  $(document).off("click.close");
	}
	else {
	  $('#revealtips,#revealtipsbg').css({"display":"block"});
	  $.sidr('close', 'sidebar');		   
	  $("#responsive-menu-button").sidr({
		name: 'sidebar',
		source: '#sidr-main',
		body:'header',
		onOpen: function(){$('body').css({"overflow-y":"hidden"});$("#revealtips,#revealtipsbg").addClass("reveal-hide");$('.sidebarbg').addClass("show");},
		onClose: function(){$('body').css({"overflow-y":"auto"});$(".sidebarbg").removeClass("show");},
	  });
	  $(document).on("click.close", function () {		 
		$.sidr('close', 'sidebar');
		$("#revealtips,#revealtipsbg").addClass("reveal-hide");
	  });
	  show_nav();
	}
};
$(window).resize(resize);
resize();
//Wipe to open and close sidebar
$(document).wipetouch({
wipeLeft: function() { $.sidr('close', 'sidebar');},
wipeRight: function() { 
  $.sidr('open', 'sidebar');
  show_nav();
},
});
//Back to Top button
var amountScrolled = 300;
$(window).scroll(function() {
	"use strict";
	if ( $(window).scrollTop() > amountScrolled ) {
		$('.nav-float').css({"display":"block"});
	} else {
		$('.nav-float').css({"display":"none"});
	}
});
$('.back-to-top').click(function() {
	"use strict";
	$('body, html').animate({
		scrollTop: 0
	}, 600);
	return false;
});