// @koala-prepend "anchor.min.js"
// @koala-prepend "bootstrap-anchor.min.js"
// @koala-prepend "screenfull.min.js"

function insertPanel(data, dir) {
	"use strict";
	
	var count = 0;
	var expandedSwitch = [
		{
			ariaExpanded : "true",
			titleClass : "",
			collapseClass : " in"
		},
		{
			ariaExpanded : "false",
			titleClass : "collapsed",
			collapseClass : ""
		}
	];
	var regexp = new RegExp(".html$", "i");
	
	$.each(data, function(i, panelData) {
		$.ajax({
			url: dir + panelData.categorydir,
			success: function (data) {
				//List all pdf in the page				
				var first = panelData.expandfirstitem ? 1:0;
				
				$(data).find("a").filter(function () {return regexp.test(this.href);}).each(function () {
					var name = this.href.substr(this.href.lastIndexOf('/') + 1).replace(regexp, "").replace(/%20/g, " ").replace(/frasl;/g, "/").split('_');
					var isExpanded = first ? expandedSwitch[0] : expandedSwitch[1];
					
					//console.log("this.href: "+this.href);
					var bodySkeleton;
					switch(panelData.itemtype) {
						case "table" :
							bodySkeleton = "<table class='table'><thead><tr></tr></thead><tbody id='" + name[0] + "'></tbody></table>";
							break;
						case "list" :
							bodySkeleton = "<ul class='list-group' id=" + name[0] + "></ul>";
							break;
						default :
							bodySkeleton = "";
					}
					
					$("#" + panelData.categoryid).append(
						"<div class='panel panel-default'>" +
							"<div class='panel-heading' role='tab' id='heading" + count + "'>" +
								"<div class='panel-title h4'>" +
									"<a role='button' data-toggle='collapse' data-parent='" + panelData.parent + "' href='#collapse" + count + "' aria-expanded='" + isExpanded.ariaExpanded + "' aria-controls='collapse" + count + "' class='" + isExpanded.titleClass + "' onclick='panelScroll()'>" +
										name[1] +
									"</a>" +
								"</div>" +
							"</div>" +
							"<div id='collapse" + count + "' class='panel-collapse collapse" + isExpanded.collapseClass + "' role='tabpanel' aria-labelledby='heading" + count + "'>" +
								bodySkeleton +
							"</div>" +
						"</div>"
					);
					if (panelData.itemtype === "table") {
						addThead(panelData.th, "collapse" + count);
					}
					//console.log(location.hostname + "," + location.hostname.slice(0,location.hostname.lastIndexOf('/')) +","+ this.getAttribute('href'));
					//appendToId(location.href.slice(0,location.href.lastIndexOf('/') + 1) + dir + panelData.categorydir + this.getAttribute('href'), name[0]);
					//appendToId(location.href.slice(0,location.href.lastIndexOf('/')) + this.getAttribute('href'), name[0]);
					appendToId(this.getAttribute('href'), name[0]);
					count++;
					first = 0;
				});
			}
		});
	});
}

/* Scroll to active panel */
function panelScroll() {
	"use strict";
	$('.panel-group').one('shown.bs.collapse', function () {
		var panelExpanded = $(this).find('.in');
		
		$('html, body').animate({
			scrollTop: panelExpanded.offset().top - 105
		}, 400);
	});
}

/*Adds table headings*/
function addThead(th, id) {
	"use strict";
	$.each(th, function(i, heading) {
		$("#" + id + " tr").append("<th scope='col'>" + heading + "</th>");
	});
}

/*Append data to id*/
function appendToId(path, id) {
	"use strict";
	$.get(path, function(data) {
		$( "#" + id ).append(data);
	});
}

function insertDownload(id, filedir) {
	"use strict";
	var regexp = new RegExp(".pdf$", "i");
	$.ajax({
		url: filedir,
		success: function (data) {
			//List all pdf in the page
			$(data).find("a").filter(function () {return regexp.test(this.href);}).each(function () {
				var name = this.href.substr(this.href.lastIndexOf('_') + 1).replace(regexp, "").replace(/%20/g, " ");
				
				//$("#" + id + " ol").append("<li class='h4'><a href='"+ filedir + this.getAttribute('href') +"' title='Preview Online'>"+ name +"</a></li>");
				$("#" + id + " ol").append("<li class='h4'><a href='" + this.getAttribute('href') +"' title='Preview Online'>"+ name +"</a></li>");
			});
		}
	});
}

function insertPreview(id, filedir, vjsdir, vjspdfdir) {
	"use strict";
	var regexp = new RegExp(".pdf$", "i");
	$.ajax({
		url: filedir,
		success: function (data) {
			//List all images in the page
			$(data).find("a").filter(function () {return regexp.test(this.href);}).each(function () {
				var name = this.href.substr(this.href.lastIndexOf('_') + 1).replace(regexp, "").replace(/%20/g, " ");
				
				//$("#" + id + " ol").append("<li class='h4'><a href='"+ vjsdir + "#" + vjspdfdir + "/" + filedir + this.getAttribute('href') + "' title='Download PDF'>"+ name +"</a></li>");
				$("#" + id + " ol").append("<li class='h4'><a href='"+ vjsdir + "#" + vjspdfdir + this.getAttribute('href').replace(location.pathname, "/") + "' title='Download PDF'>"+ name +"</a></li>");
			});
		}
	});
}

function insertCarousel(root, sub) {
	"use strict";
	var regexp = new RegExp("(.*?(\\b/" + sub + "/\\b)[^$]*)", "i");
	//console.log(regexp);
	$.ajax({
		url: root + sub,
		success: function (data) {
			$(data).find("a").filter(function () {return regexp.test(this.href.replace(location.href.slice(0,location.href.lastIndexOf('/') + 1),""));}).each(function () {
				var dirpath = this.href.slice(0,this.href.lastIndexOf('/'));
				var dirname = dirpath.slice(dirpath.lastIndexOf('/')+1);
				var id = dirname.replace(/%20/g,"");
				//console.log(dirname + ", " + id);
				$("#carousel-insert").before("<div class='container container-carousel'>"+
					"<div class='row'>"+
						"<div id='"+ id +"' class='carousel slide carousel-fade' data-ride='carousel' data-interval='15000'>"+
							"<h2 class='carousel-title'>"+dirname.replace(/%20/g," ")+"</h2>"+
							"<ol class='carousel-indicators'></ol>" + 
							"<div class='carousel-inner' role='listbox'></div>" + 
							"<a class='left carousel-control' href='#" + id + "' role='button' data-slide='prev'><span class='glyphicon glyphicon-chevron-left' aria-hidden='true'></span><span class='sr-only'>Previous</span></a>" +
							"<a class='right carousel-control' href='#" + id + "' role='button' data-slide='next'><span class='glyphicon glyphicon-chevron-right' aria-hidden='true'></span><span class='sr-only'>Next</span></a>"+
						"</div>"+
					"</div>"+
				"</div>"
				);
				insertCarouselImage(root+sub+"/", dirname, id);
			});
		}
	});
	if (screenfull.enabled) {
		document.addEventListener(screenfull.raw.fullscreenchange, function () {
			if(!screenfull.isFullscreen) {
				$(".carousel").removeClass("fullscreen");
			}
		});
	}
}

function insertCarouselImage(root, dirname, id){
	"use strict";
	var regexp = new RegExp(".(png|jpe?g|gif)$", "i");
	$.ajax({
		//This will retrieve the contents of the folder if the folder is configured as 'browsable'
		url: root + dirname,
		success: function (data) {
			var count = 0;
			//List all images in the page
			$(data).find("a").filter(function () {return regexp.test(this.href);}).each(function () {
				var name = this.href.substr(this.href.lastIndexOf('_') + 1).replace(regexp, "").replace(/%20/g, " ");
				var isFirst = (!count ? "active":"");
				//console.log(root + dirname);

				$("#" + id + " .carousel-indicators").append("<li data-target='#" + id + "' data-slide-to='"+ count + "' class='" + isFirst + "'></li>");
				
				count++;
				
				$("#" + id + " .carousel-inner").append("<div class='item " + isFirst + "'><img src='" + this.getAttribute('href') + "' alt='" + name + "' onclick='goFullscreen(" + id + ")' role='fullscreen' class='center-block'><div class='carousel-caption'><h4 class='no-anchor'>" + name + "</h4></div></div>");
			}); 
		}
	});
}

/*Carousel image add to page
function carouselImage(root, id) {
	"use strict";
	var regexp = new RegExp(".(png|jpe?g|gif)", "i");
	$.each(id, function(i, dir) {
		$("#" + dir).append(
			"<ol class='carousel-indicators'></ol>" + 
			"<div class='carousel-inner' role='listbox'></div>" + 
			"<a class='left carousel-control' href='#" + dir + "' role='button' data-slide='prev'><span class='glyphicon glyphicon-chevron-left' aria-hidden='true'></span><span class='sr-only'>Previous</span></a>" +
			"<a class='right carousel-control' href='#" + dir + "' role='button' data-slide='next'><span class='glyphicon glyphicon-chevron-right' aria-hidden='true'></span><span class='sr-only'>Next</span></a>"
		);
		$.ajax({
			//This will retrieve the contents of the folder if the folder is configured as 'browsable'
			url: root + dir,
			success: function (data) {
				var count = 0;
				//List all images in the page
				$(data).find("a").filter(function () {return regexp.test(this.href);}).each(function () {
					var name = this.href.substr(this.href.lastIndexOf('_') + 1).replace(regexp, "").replace(/%20/g, " ");
					var isFirst = (!count ? "active":"");

					$("#" + dir + " .carousel-indicators").append("<li data-target='#" + dir + "' data-slide-to='"+ count + "' class='" + isFirst + "'></li>");
					
					count++;
					
					$("#" + dir + " .carousel-inner").append("<div class='item " + isFirst + "'><img src='" + root + dir + "/" + this.getAttribute('href') + "' alt='" + name + "' onclick='goFullscreen(" + dir + ")' role='fullscreen' class='center-block'><div class='carousel-caption'><h4 class='no-anchor'>" + name + "</h4></div></div>");
				}); 
			}
		});
	});

	if (screenfull.enabled) {
    document.addEventListener(screenfull.raw.fullscreenchange, function () {
			if(!screenfull.isFullscreen) {
				$(".carousel").removeClass("fullscreen");
			}
    });
	}	
}
*/
/*Carousel image click to fullscreen*/
function goFullscreen(target) {
	"use strict";
	if (screenfull.enabled) {
		if(screenfull.isFullscreen) {
			screenfull.exit(target);
			//$(target).removeClass("fullscreen");
		}else{
			screenfull.request(target);
			$(target).addClass("fullscreen");
		}
	}
}


$(document).ready(function() {
	"use strict";
	
	//AnchorJS initialisation
	anchors.add();
	anchors.remove('.no-anchor, .panel-title');
	
	//Bootstrap Anchor initialisation
	$(this).anchor();
	
	//Popover initialisation
	$('[data-toggle="popover"]').popover({ html : true });
	/*
	$('[data-toggle="popover"]').each(function(i, el){
		$(el).popover({ 
			html : true,
			content: $(el).attr('data-image')
		});
	});*/
	

	/* Go to download tab in Lecture Slides page */
	$('#gotoDownload').on('click',function () {
		$('html,body').animate({
			scrollTop: $('#pptslide').offset().top - $('div.alert').outerHeight(),
	  }, 300);
	});
	
	//Back to top button animation
	$(window).on("load scroll resize", function() {
		
		/*Btt button position*/
		if($(this).scrollTop() < 100) {
			$('.btt').removeClass('btt-show');
			$('.btt').removeClass('btt-end');
			$('.arrow-bounce').removeClass('arrow-hide');
		}else if($(this).scrollTop() >= $(document).height() - $(this).height() - $('footer').height() ){
			$('.btt').addClass('btt-end');
		}else{
			$('.btt').addClass('btt-show');
			$('.btt').removeClass('btt-end');
			$('.arrow-bounce').addClass('arrow-hide');
		}
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
		$('#bs-example-navbar-collapse-1').collapse('hide');
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
		/*// Avoid following the href location when clicking
		event.preventDefault(); */
		// Avoid having the menu to close when clicking
		event.stopPropagation(); 
		// If a menu is already open we close it
		$('ul.dropdown-menu [data-toggle=dropdown]').parent().removeClass('open');
		// opening the one you clicked on
		$(this).parent().addClass('open');
	});
	
	var mq = window.matchMedia( "(max-width: 767px)" );
	
	/*Jumbotron height issue*/
	$(window).one("load resize", function() {
		if (mq.matches) {
			$("#homepagejumbo .container").css("min-height", 1*$(window).height());
		}
	});
	$(window).on("resize", function() {
		if (!mq.matches) {
			$("#homepagejumbo .container").css("min-height", 0);
		}
	});
});