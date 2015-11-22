var didScroll;
var lastScrollTop = 0;
var delta = 48;
var navbarHeight = $('header').outerHeight();
var st;
var hidable = true;

//Navigation hide/show
var show_nav = function() { 
  "use strict";		  
  $('.header').removeClass('nav-up');
  //$('footer').removeClass('foot-down');
  $('.nav-float').removeClass('btt-out');
  clearTimeout(hide_timeout);
};
var hide_nav = function() { 
  "use strict";	  
  $('.header').addClass('nav-up');
  //$('footer').addClass('foot-down');
  $('.nav-float').addClass('btt-out');
  clearTimeout(hide_timeout);
};
var hide_time = 4000;
function hide_timeout(){setTimeout(function(){"use strict";hide_nav();}, hide_time)};

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

//Show header and footer when anywhere is clicked and hide afterwards
$(document).on("click tap", function (e) {
	if(!$(e.target).is('figure, figure *,.reveal-modal,.reveal-modal *,#responsive-menu-button,#responsive-menu-button *')&&autohide&&hidable){
		show_nav();
		clearTimeout(hide_timeout);
		hide_timeout = setTimeout(function(){hide_nav();}, hide_time);
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
  // If they scrolled down and are past the navbar, show navbar.
  // This is necessary so you never see what is "behind" the navbar.

  // Show navbar when reaching bottom.
  if (st + $(window).height() > $(document).height() - 40) {
	  show_nav();
	  hidable=false;
  } else {
	  // Scroll Down
      if (st > lastScrollTop && st > navbarHeight){
	      hide_nav();
      } else {
	      // Scroll Up
	      if(st + $(window).height() < $(document).height()) {
		      show_nav();
			  hidable=true;
	      }
      }
  }
  lastScrollTop = st;
}

//Screen size matters
var resize = function() {
	"use strict";
	if (min_width(767)) {
	  $('#revealtips,#revealtipsbg').css({"display":"none"});
	  $("#responsive-menu-button").sidr({
		name: 'sidebar',
		source: '#sidr-main',
		body:'body, .header',
		side:'right',
		onOpen: function(){clearTimeout(hide_timeout);}
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
		body:'.header',
		side:'right',
		onOpen: function(){$('body').css({"overflow-y":"hidden"});$("#revealtips,#revealtipsbg").addClass("reveal-hide");$('.sidebarbg').addClass("show");clearTimeout(hide_timeout);},
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
wipeRight: function() { $.sidr('close', 'sidebar');},
wipeLeft: function() { 
  $.sidr('open', 'sidebar');
  show_nav();
},
});

//Back to Top button
$('.back-to-top').click(function() {
	"use strict";
	$('body, html').animate({
		scrollTop: 0
	}, 600);
	clearTimeout(hide_timeout);
	return false;
});