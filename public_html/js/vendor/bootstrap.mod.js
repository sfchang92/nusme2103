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
	var regexp = new RegExp("\.html");
	
	$.each(data, function(i, panelData) {
		$.ajax({
			url: dir + panelData.categorydir,
			success: function (data) {
				//List all pdf in the page
				var first = panelData.expandfirstitem ? 1:0;
				
				$(data).find("a").filter(function () {return regexp.test(this.href);}).each(function () {
					var filename = this.href.substr(this.href.lastIndexOf('/') + 1);
					var name = filename.replace(regexp, "").replace(/%20/g, " ").replace(/&frasl/g, "/").split('_');
					
					var isExpanded = first ? expandedSwitch[0] : expandedSwitch[1];
					
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
						"<div class='panel panel-default'>
							<div class='panel-heading' role='tab' id='heading" + count + "'>
								<div class='panel-title h4'>
									<a role='button' data-toggle='collapse' data-parent='" + panelData.parent + "' href='#collapse" + count + "' aria-expanded='" + isExpanded.ariaExpanded + "' aria-controls='collapse" + count + "' class='" + isExpanded.titleClass + "' onclick='panelScroll()'>
										" + name[1] + "
									</a>
								</div>
							</div>
							<div id='collapse" + count + "' class='panel-collapse collapse" + isExpanded.collapseClass + "' role='tabpanel' aria-labelledby='heading" + count + "'>
								"+ bodySkeleton +"
							</div>
						</div>"
					);
					if (panelData.itemtype === "table") {
						addThead(panelData.th, "collapse" + count);
					}
					appendToId(dir + panelData.categorydir, filename, name[0]);
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
			scrollTop: panelExpanded.offset().top - 92
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
function appendToId(dir, filename, id) {
	"use strict";
	$.get(dir + filename, function(data) {
		$( "#" + id ).append(data);
	});
}

function insertDownload(id, filedir) {
	"use strict";
	var regexp = new RegExp("\.pdf");
	$.ajax({
		url: filedir,
		success: function (data) {
			//List all pdf in the page
			$(data).find("a").filter(function () {return regexp.test(this.href)}).each(function () {
				var filename = this.href.substr(this.href.lastIndexOf('/') + 1);
				var name = filename.substr(filename.lastIndexOf('_') + 1).replace(regexp, "").replace(/%20/g, " ");
				
				$("#" + id + " ol").append("<li class='h4'><a href='"+ filedir + filename +"' title='Preview Online'>"+ name +"</a></li>");
			});
		}
	});
}

function insertPreview(id, filedir, vjsdir, vjspdfdir) {
	"use strict";
	var regexp = new RegExp("\.pdf");
	$.ajax({
		url: filedir,
		success: function (data) {
			//List all images in the page
			$(data).find("a").filter(function () {return regexp.test(this.href);}).each(function () {
				var filename = this.href.substr(this.href.lastIndexOf('/') + 1);
				var name = filename.substr(filename.lastIndexOf('_') + 1).replace(regexp, "").replace(/%20/g, " ");
				
				$("#" + id + " ol").append("<li class='h4'><a href='"+ vjsdir + "#" + vjspdfdir + filedir + filename + "' title='Download PDF'>"+ name +"</a></li>");
			});
		}
	});
}

/*Carousel image add to page*/
function carouselImage(root, id) {
	"use strict";
	var regexp = new RegExp("\.png|\.jpg|\.gif");				
	$.each(id, function(i, dir) {
		$("#" + dir).append("<ol class='carousel-indicators'></ol> <div class='carousel-inner' role='listbox'></div> <a class='left carousel-control' href='#" + dir + "' role='button' data-slide='prev'><span class='glyphicon glyphicon-chevron-left' aria-hidden='true'></span><span class='sr-only'>Previous</span></a><a class='right carousel-control' href='#" + dir + "' role='button' data-slide='next'><span class='glyphicon glyphicon-chevron-right' aria-hidden='true'></span><span class='sr-only'>Next</span></a>");
		$.ajax({
			//This will retrieve the contents of the folder if the folder is configured as 'browsable'
			url: root + dir,
			success: function (data) {
				var count = 0;
				//List all images in the page
				$(data).find("a").filter(function () {return regexp.test(this.href);}).each(function () {
					var filename = this.href.substr(this.href.lastIndexOf('/') + 1);
					var name = filename.substr(filename.lastIndexOf('_') + 1).replace(regexp, "").replace(/%20/g, " ");
					var isFirst = (!count ? "active":"");

					$("#" + dir + " .carousel-indicators").append("<li data-target='#" + dir + "' data-slide-to='"+ count + "' class='" + isFirst + "'></li>");
					
					count++;
					
					$("#" + dir + " .carousel-inner").append("<div class='item " + isFirst + "'><img src='" + root + dir + "/" + filename + "' alt='" + name + "' onclick='goFullscreen(" + dir + ")' role='fullscreen' class='center-block'><div class='carousel-caption'><h4 class='no-anchor'>" + name + "</h4></div></div>");
				}); 
			}
		});
	});	
}

/*Carousel image click to fullscreen*/
function goFullscreen(target) {
	"use strict";
	if (screenfull.enabled) {
		if(screenfull.isFullscreen) {
			screenfull.exit(target);
			$(target).removeClass("fullscreen");
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
	
	/* Go to download tab in Lecture Slides page */
	$('#gotoDownload').on('click',function () {
		$('html,body').animate({
			scrollTop: $('#downloadTab').offset().top - $('div.alert').outerHeight(),
	  }, 300);
	});
	
	//Back to top button animation
	$(window).on("load scroll", function() {
		
		/*Btt button position*/
		if($(this).scrollTop() < 100) {
			$('.btt').removeClass('btt-show');
			$('.btt').removeClass('btt-end');
			$('.arrow').removeClass('arrow-hide');
		}else if($(this).scrollTop() >= $(document).height() - $(this).height() - $('footer').height() ){
			$('.btt').addClass('btt-end');
		}else{
			$('.btt').addClass('btt-show');
			$('.btt').removeClass('btt-end');
			$('.arrow').addClass('arrow-hide');
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