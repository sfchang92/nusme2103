	  // Hide Header on on scroll down
	  var didScroll;
	  var lastScrollTop = 0;
	  var delta = 48;
	  var navbarHeight = $('header').outerHeight();
	  var st;
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
		  } else {
			  // Scroll Up
			  if(st + $(window).height() < $(document).height()) {
				  $('header').removeClass('nav-up');
				  $('footer').removeClass('foot-down');	
			  }
		  }
		  lastScrollTop = st;
	  }
	  //Show header and footer when anywhere is clicked
	  $(document).on("click.nav", function () {	"use strict";	 
		  $('header').removeClass('nav-up');
		  $('footer').removeClass('foot-down');
	  });