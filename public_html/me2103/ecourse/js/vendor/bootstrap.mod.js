/*!
 * Bootstrap Anchor v0.0.1 (http://markcarver.github.io/bootstrap-anchor/)
 * Copyright 2015 Mark Carver
 * Dual licensed under MIT/GLPv2 (https://github.com/markcarver/bootstrap-anchor/blob/master/LICENSE)
 */
+function(a,b){"use strict";function c(b){var c=a.extend([],arguments);c.shift();var d=this.selector;return this.each(function(){var f=a(this),g=f.data("bs.anchor"),h="object"==typeof b&&b;g||f.data("bs.anchor",g=new e(this,h,d)),"string"==typeof b&&g[b].apply(g,c)})}var d=a.fn.tooltip&&a.fn.tooltip.Constructor,e=function(a,b,c){this.$anchor=null,this.$container=null,this.$delegates=null,this.dom=null,this.enabled=null,this.link=null,this.id=null,this.originalId=null,this.scrollTop=null,this.scrolling=null,this.init("anchor",a,b,c)};if(e.VERSION="0.0.1",e.checkVersion=function(a,b){if(!a)return!1;var c,d=a.split("."),e=b.split(".");for(c=0;c<d.length;++c)d[c]=Number(d[c]);for(c=0;c<e.length;++c)e[c]=Number(e[c]);return d[0]>e[0]?!0:d[0]<e[0]?!1:d[1]>e[1]?!0:d[1]<e[1]?!1:d[2]>e[2]?!0:d[2]>=e[2]},!d||!e.checkVersion(d.VERSION,"3.3.4"))throw new Error("Bootstrap Anchor requires the Bootstrap tooltip.js plugin, version 3.3.4 or greater.");e.proxy=function(a,b){return b=b||d,function(){b.prototype[a].apply(this.getDelegate.apply(this,arguments),arguments)}},e.DEFAULTS=a.extend({},d.DEFAULTS,{anchors:"h1,h2,h3,h4,[data-anchor]",anchorContainer:!0,anchorDuration:300,anchorFindNamed:!1,anchorGenerateId:!0,anchorHistory:"append",anchorIcon:'<span class="glyphicon glyphicon-link" aria-hidden="true"></span>',anchorIgnore:'[data-anchor-ignore]:not([data-anchor-ignore="false"]),[data-dismiss],[data-slide],[data-toggle]:not([data-toggle="anchor"])',anchorLinks:'a[href*="#"],[data-toggle="anchor"]',anchorNormalizeId:{separator:"-",convertCamel:!0,convertCase:"lower",convert:/[\s_.(){}\[\]]/g,strip:/[^\w-]/gi,singleSeparator:!0,trim:!0,maxLength:32},anchorPrefixId:!1,anchorUniqueId:!0,anchorOffset:20,anchorTarget:!1,scrollOnHashchange:!0,scrollOnLoad:!0,placement:"auto left",template:'<span class="anchor-link text-primary" role="tooltip"><a href="#"></a></span>',trigger:{anchors:"hover focus",links:"click"},viewport:{selector:"body",padding:0}}),e.prototype=a.extend({},d.prototype);for(var f=["enter","leave","hide","show","toggle"],g=0,h=f.length;h>g;g++)e.prototype[f[g]]=e.proxy(f[g]);e.prototype.constructor=e,e.prototype.getDefaults=function(){return e.DEFAULTS},e.prototype.getOptions=function(c,d){var e=this.$element.data()||null,f=this.getDefaults();d=d&&!this.dom&&{anchors:d}||null;var g=!this.dom&&f.anchorContainer;if(e.anchorContainer!==b?g=e.anchorContainer||null:c.anchorContainer!==b&&(g=c.anchorContainer||null),g){var h="string"==typeof g&&a(g);h&&h[0]||(h=this.$element.parent().closest("[data-anchor-container]")),g=h[0]&&h.data()||null}return c=a.extend(!0,{},f,d,c,g,e),c.delay&&"number"==typeof c.delay&&(c.delay={show:c.delay,hide:c.delay}),c},e.prototype.getPosition=function(a){return a||this.options.previousContainer?this.options.previousContainer&&(this.options.container=this.options.previousContainer,delete this.options.previousContainer):(this.options.previousContainer=this.options.container,this.options.container=this.$viewport),a||(a=this.getContainer()),d.prototype.getPosition.apply(this,[a])},e.prototype.hasContent=function(){return!!(!this.isLink()&&this.id&&this.$anchor&&this.$anchor.is(this.options.anchors)&&this.options.anchorIcon)},e.prototype.setContent=function(){var a=this,b=this.tip().removeClass("fade in");b.find("a").attr("href","#"+this.id).off("click.bs."+this.type).on("click.bs."+this.type,function(b){b.preventDefault(),b.stopPropagation(),a.scrollTo()}).html(this.options.anchorIcon)},e.prototype.init=function(b,c,d,e){if(null===this.enabled){var f=this;if(this.enabled=!0,this.type=b,this.dom=this.isDOM(c),this.$element=a(this.dom?document:c),this.options=this.getOptions(d,e),this.$anchor=this.getAnchor(),this.$delegates=!1,this.$viewport=this.options.viewport&&a(this.options.viewport.selector||this.options.viewport),this.link=this.isLink(),this.id=this.getID(),this.bind(),this.dom){var g=a(window);this._options=a.extend({},this.options,{trigger:"manual"}),g.on("scroll.bs."+this.type,function(){f.scrollTop=f.getPosition(f.$viewport).scroll}),this.options.scrollOnLoad&&g.on("load.bs."+this.type,a.proxy(this.scrollToHash,this)),this.options.scrollOnHashchange&&g.on("hashchange.bs."+this.type,a.proxy(this.scrollToHash,this)),a.fn.scrollspy&&this.$element.on("change.bs.anchor",function(){"complete"===document.readyState&&a('[data-spy="scroll"]').scrollspy("refresh")}),a(function(){f.$delegates=a(f.options.anchors).not(f.getExclude()).anchor(f._options)})}else this.link||(this.id||(this.$anchor=!1),this.$anchor&&this.hasContent()&&(this.options.originalContainer=this.options.container,this.options.container=this.getContainer()))}},e.prototype.bind=function(){var b=this,c=this.dom||this.isLink();if(this.dom&&!this.options.anchors&&!this.options.anchorLinks)throw new Error("`anchors` or `anchorLinks` option must be specified when initializing "+this.type+" on any top level DOM object!");if(this.dom||c||this.hasContent()){var d=this.getExclude(),e=this.dom||!d?this.$element:this.$element.not(d),f=function(a){var c="anchors"===a?"> ."+b.type+"-wrapper":"",e="anchors"===a&&b.options.anchors||"links"===a&&b.options.anchorLinks||"";if(!b.dom)return c||null;var f=function(a){for(var b=e&&e.split(/\s*,\s*(?![^(]*\))/gi)||[],c=0,d=b.length;d>c;c++)b[c]=a.apply(this,[b[c],b]);return b.join(",")};return f(function(a){return a+":not("+d+")"+c})},g=this.getTriggers();for(var h in g)if(g.hasOwnProperty(h))for(var i=f(h),j="string"==typeof g[h]&&g[h].split(" ")||[],k=j.length;k--;){var l=j[k];if("click"===l){"links"===h&&c?e.on("click.bs."+this.type,i,a.proxy(this.scrollTo,this)):e.on("click.bs."+this.type,i,a.proxy(this.toggle,this))}}}},e.prototype.getAnchor=function(){if(null!==this.$anchor)return this.$anchor||!1;var b,c=this.$element[0];if(this.dom)return!1;if(this.options.anchorTarget)return b=a(this.options.anchorTarget).first(),b[0]&&b||!1;if(this.isLink()){var d=c&&"A"===this.$element[0].nodeName&&c.host===window.location.host&&c.pathname===window.location.pathname&&c.search===window.location.search&&c.hash;return d=d&&d.replace(/^#/,"")||d,d&&d.length?(b=a("#"+d+', a[name="'+d+'"]').first(),b[0]&&b||!1):!1}return c&&this.$element||!1},e.prototype.getContainer=function(){if(!this.hasContent())return this.$anchor;if(this.$container)return this.$container;if(this.$container=this.$anchor.find(">."+this.type+"-wrapper"),this.$container[0])return this.$container;var b=this.$anchor[0],c=document.createElement("span");for(c.className="anchor-wrapper";b.childNodes.length;)c.appendChild(b.removeChild(b.childNodes[0]));return b.insertBefore(c,b.firstChild),this.$container=a(c),this.$container},e.prototype.getDelegate=function(b,c){if(b instanceof this.constructor)return b;c=c||b instanceof jQuery.Event&&a(b.currentTarget)||a(),c.is("."+this.type+"-wrapper")&&(c=c.parent(),b.currentTarget&&(b.currentTarget=c[0]));var d=c.data("bs."+this.type);return d||this.dom?(!d&&c[0]&&c.data("bs."+this.type,d=new this.constructor(c[0],this.getDelegateOptions())),d||this):this},e.prototype.getExclude=function(){var a=this.options.anchorIgnore||!1;return a&&"function"==typeof a&&(a=this.options.anchorIgnore.call(this)),a&&"string"!=typeof this.options.anchorIgnore&&(a=!1),a},e.prototype.getID=function(a){if(this.dom)return this.id=this.originalId=!1,this.id;var b="function"==typeof this.options.id||"function"==typeof this.options.originalId;if(null!==this.id&&!b&&!a)return this.id;if(this.originalId="function"==typeof this.options.originalId&&this.options.originalId.call(this)||this.options.originalId||!1,this.id="function"==typeof this.options.id&&this.options.id.call(this)||this.options.id||this.originalId||!1,!this.id){var c=this.$element[0],d=c&&c.id||c&&"A"===c.nodeName&&c.name;if(!d&&this.options.anchorFindNamed)for(var e,f=["next","prev","find"],g=f.length;g--;)if(e=this.$element[f[g]]("a[name]:empty"),e[0]&&!d){d=e[0].id||e[0].name;break}d&&this.$element.removeAttr("id"),c&&"A"===c.nodeName&&c.name&&this.$element.removeAttr("name"),this.id=this.originalId=d||!1,this.id||!this.options.anchorGenerateId||this.isLink()||(this.id=this.$anchor.text()||!1,this.id&&(this.options.anchorNormalizeId&&(this.id=this.normalizeId(this.id)),this.options.anchorPrefixId&&(this.id=this.options.anchorPrefixId+"-"+this.id),this.options.anchorUniqueId&&(this.id=this.getUID(this.id)))),this.$element.attr("data-original-id",this.originalId.toString()),this.id&&this.$element.attr("id",this.id).attr("data-id",this.id)}return this.id!==this.originalId&&this.$element.trigger("change.bs.anchor",this),this.id},e.prototype.getTop=function(){var a="fixed"===this.$anchor.css("position")?this.$anchor[0].offsetTop:this.getPosition(this.$anchor).top;return a-=parseInt(this.$viewport.css("margin-top"),10)||0,a-=parseInt(this.$viewport.css("padding-top"),10)||0,this.options.anchorOffset&&(a-=parseInt(this.options.anchorOffset,10)),0>a?0:a},e.prototype.getTriggers=function(){var b=this.options.trigger||!1;return b&&"function"==typeof b&&(b=b.call(this)),b&&"string"==typeof b&&(b={anchors:b,links:b}),a.isPlainObject(b)||(b=!1),b},e.prototype.getUID=function(a){for(var b=0,c=""+a;document.getElementById(a);)b++,a=c+"-"+b;return a},e.prototype.isDOM=function(a,b){return b||null===this.dom?(a=a||this.$element&&this.$element[0],a&&(a instanceof document.constructor||a instanceof window.constructor||a instanceof HTMLHtmlElement||a instanceof HTMLBodyElement)):this.dom},e.prototype.isLink=function(a){if(this.dom)return!1;if(!a&&null!==this.link)return this.link;var b=this.getExclude();return this.options.anchorLinks&&b?this.$element.not(b).is(this.options.anchorLinks):this.$element.is(this.options.anchorLinks)},e.prototype.normalizeId=function(a){var b=this.options.anchorNormalizeId;if(!b||"object"!=typeof b)return a;var c=b.separator||"",d=c&&c.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")||"";return b.convertCamel&&(a=a.replace(/[A-Z]/g,function(a){return c+a})),b.convertCase&&(a="upper"===b.convertCase?a.toUpperCase():a.toLowerCase()),b.convert&&(a=a.replace(b.convert,c)),b.strip&&(a=a.replace(b.strip,"")),b.singleSeparator&&(a=a.replace(new RegExp(d+"+","g"),c)),b.trim&&(a=a.replace(new RegExp("^"+d+"*|"+d+"*$","g"),"")),b.maxLength&&(a=a.substring(0,b.maxLength)),a||!1},e.prototype.scrollTo=function(b){var c=this,d=c.getDelegate.apply(c,arguments);if(d.$anchor&&a.contains(document,d.$anchor[0])&&d.enabled&&!d.scrolling&&!c.scrolling){if(d.link)return b&&b.preventDefault(),d.$element.trigger("blur.bs."+d.type),void c.scrollTo.apply(c,[null,d.$anchor]);var e=a.Event("scroll.bs."+d.type);if(!e.isDefaultPrevented()){var f=d.getTop(),g=a.Deferred();g.then(function(){d.scrolling=c.scrolling=!0}).then(function(){return d.options.animation&&d.options.anchorDuration&&d.options.anchorDuration>0?d.$viewport.stop(!0).animate({scrollTop:f},{anchorDuration:d.options.anchorDuration}).promise():d.$viewport.scrollTop(f).promise()}).then(function(){return d.updateHistory.call(d)}).then(function(){d.scrolling=c.scrolling=!1,d.$element.trigger("focus.bs."+d.type),d.$element.trigger("scrolled.bs."+d.type)}),g.resolve()}}},e.prototype.scrollToHash=function(b){if(this.enabled&&!this.scrolling){"complete"===document.readyState&&null!==this.scrollTop&&this.$viewport.scrollTop(this.scrollTop),b=b&&"string"==typeof b&&b.replace(/^#/,"")||window.location.hash.replace(/^#/,"");var c=b&&document.getElementById(b)||document.getElementsByName(b);c&&a(c).anchor("scrollTo")}},e.prototype.updateHistory=function(){var b=this;return a.Deferred(function(c){var d=b.options.anchorHistory;if("function"==typeof d&&(d=d.call(b)||!1),!d||"append"!==d&&"replace"!==d)return c.resolve();var e=b.getID();b.$element.attr("id","");var f=a('<div id="'+e+'"></div>').css({position:"absolute",visibility:"hidden",top:b.getTop()+"px"}).appendTo(b.$viewport);"replace"===d&&window.anchorHistory&&window.anchorHistory.replaceState?window.anchorHistory.replaceState(null,null,"#"+b.id):window.location.hash=e,f.remove(),b.$element.attr("id",e),setTimeout(function(){c.resolve()},10)})};var i=a.fn.anchor;a.fn.anchor=c,a.fn.anchor.Constructor=e,a.fn.anchor.noConflict=function(){return a.fn.anchor=i,this}}(jQuery);
//Gif Click
!function($){var t=function(){var t=[];return $("figure img").each(function(){var a=$(this).data("alt");t.push(a)}),t},a=t(),r=[];$.each(a,function(t){r[t]=new Image,r[t].src=a[t]}),$("figure").on("click",function(){var t=$(this),a=t.index(),r=t.children("img"),i=r.attr("src"),n=r.attr("data-alt"),c=n.split(".g");"if"===c[1]?r.attr("src",r.data("alt")).attr("data-alt",i):r.attr("src",n).attr("data-alt",r.data("alt")),t.toggleClass("play")})}(jQuery);
/**
 * jQuery Unveil
 * A very lightweight jQuery plugin to lazy load images
 * http://luis-almeida.github.com/unveil
 *
 * Licensed under the MIT license.
 * Copyright 2013 Luís Almeida
 * https://github.com/luis-almeida
 */

;(function($) {

  $.fn.unveil = function(threshold, callback) {

    var $w = $(window),
        th = threshold || 0,
        retina = window.devicePixelRatio > 1,
        attrib = retina? "data-src-retina" : "data-src",
        images = this,
        loaded;

    this.one("unveil", function() {
      var source = this.getAttribute(attrib);
      source = source || this.getAttribute("data-src");
      if (source) {
        this.setAttribute("src", source);
        if (typeof callback === "function") callback.call(this);
      }
    });

    function unveil() {
      var inview = images.filter(function() {
        var $e = $(this);
        if ($e.is(":hidden")) return;

        var wt = $w.scrollTop(),
            wb = wt + $w.height(),
            et = $e.offset().top,
            eb = et + $e.height();

        return eb >= wt - th && et <= wb + th;
      });

      loaded = inview.trigger("unveil");
      images = images.not(loaded);
    }

    $w.on("scroll.unveil resize.unveil lookup.unveil", unveil);

    unveil();

    return this;

  };

})(window.jQuery || window.Zepto);
// jQuery WipeTouch 1.2.0
// ------------------------------------------------------------------------
//
// Developed and maintained by Igor Ramadas
// http://aboutigor.com
// http://devv.com
//
// USAGE
// ------------------------------------------------------------------------
//
// $(selector).wipetouch(config);
//
// The wipe events should expect the result object with the following properties:
// speed - the wipe speed from 1 to 5
// x - how many pixels moved on the horizontal axis
// y - how many pixels moved on the vertical axis
// source - the element which triggered the wipe gesture
//
// EXAMPLE
//		$(document).wipetouch({
//			allowDiagonal: true,
//			wipeLeft: function(result) { alert("Left on speed " + result.speed) },
//			wipeTopLeft: function(result) { alert("Top left on speed " + result.speed) },
//			wipeBottomLeft: function(result) { alert("Bottom left on speed " + result.speed) }
//		});
//
//
// More details at http://wipetouch.codeplex.com/
//
// CHANGE LOG
// ------------------------------------------------------------------------
// 1.2.0
// - New: wipeMove event, triggered while moving the mouse/finger.
// - New: added "source" to the result object.
// - Bug fix: sometimes vertical wipe events would not trigger correctly.
// - Bug fix: improved tapToClick handler.
// - General code refactoring.
// - Windows Phone 7 is not supported, yet! Its behaviour is completely broken and would require some special tricks to make it work. Maybe in the future...
//
// 1.1.0
// - New: tapToClick, if true will identify taps and and trigger a click on the touched element. Default is false.
// - Changed: events wipeBottom*** and wipeTop*** renamed to wipeDown*** and wipeUp***.
// - Changed: better touch speed calculation (was always too fast before).
// - Changed: speed will be an integer now (instead of float).
// - Changed: better wipe detection (if Y movement is more than X, do a vertical wipe instead of horizontal).
// - Bug fix: added preventDefault to touchStart and touchEnd internal events (this was missing).
// - Other general tweaks to the code.
//
// The minified version of WipeTouch can be generated using Jasc: http://jasc.codeplex.com

(function ($)
{
	$.fn.wipetouch = function (settings)
	{
		// ------------------------------------------------------------------------
		// PLUGIN SETTINGS
		// ------------------------------------------------------------------------

		var config = {

			// Variables and options
			moveX: 100, 	// minimum amount of horizontal pixels to trigger a wipe event
			moveY: 40, 	// minimum amount of vertical pixels to trigger a wipe event
			tapToClick: true, // if user taps the screen it will fire a click event on the touched element
			preventDefault: false, // if true, prevents default events (click for example)
			allowDiagonal: false, // if false, will trigger horizontal and vertical movements so wipeUpLeft, wipeDownLeft, wipeUpRight, wipeDownRight are ignored

			// Wipe events
			wipeLeft: false, // called on wipe left gesture
			wipeRight: false, // called on wipe right gesture
			wipeUp: false, // called on wipe up gesture
			wipeDown: false, // called on wipe down gesture
			wipeUpLeft: false, // called on wipe top and left gesture
			wipeDownLeft: false, // called on wipe bottom and left gesture
			wipeUpRight: false, // called on wipe top and right gesture
			wipeDownRight: false, // called on wipe bottom and right gesture
			wipeMove: false, // triggered whenever touchMove acts

			// DEPRECATED EVENTS
			wipeTopLeft: false, // USE WIPEUPLEFT
			wipeBottomLeft: false, // USE WIPEDOWNLEFT
			wipeTopRight: false, // USE WIPEUPRIGHT
			wipeBottomRight: false	// USE WIPEDOWNRIGHT
		};

		if (settings)
		{
			$.extend(config, settings);
		}

		this.each(function ()
		{
			// ------------------------------------------------------------------------
			// INTERNAL VARIABLES
			// ------------------------------------------------------------------------

			var startX; 					// where touch has started, left
			var startY; 					// where touch has started, top
			var startDate = false; 			// used to calculate timing and aprox. acceleration
			var curX; 						// keeps touch X position while moving on the screen
			var curY; 						// keeps touch Y position while moving on the screen
			var isMoving = false; 			// is user touching and moving?
			var touchedElement = false; 	// element which user has touched

			// These are for non-touch devices!
			var useMouseEvents = false; 	// force using the mouse events to simulate touch
			var clickEvent = false; 		// holds the click event of the target, when used hasn't clicked

			// ------------------------------------------------------------------------
			// TOUCH EVENTS
			// ------------------------------------------------------------------------

			// Called when user touches the screen.
			function onTouchStart(e)
			{
				var start = useMouseEvents || (e.originalEvent.touches && e.originalEvent.touches.length > 0);

				if (!isMoving && start)
				{
					if (config.preventDefault)
					{
						e.preventDefault();
					}

					// Temporary fix for deprecated events, these will be removed on next version!
					if (config.allowDiagonal)
					{
						if (!config.wipeDownLeft)
						{
							config.wipeDownLeft = config.wipeBottomLeft;
						}

						if (!config.wipeDownRight)
						{
							config.wipeDownRight = config.wipeBottomRight;
						}

						if (!config.wipeUpLeft)
						{
							config.wipeUpLeft = config.wipeTopLeft;
						}

						if (!config.wipeUpRight)
						{
							config.wipeUpRight = config.wipeTopRight;
						}
					}

					// When touch events are not present, use mouse events.
					if (useMouseEvents)
					{
						startX = e.pageX;
						startY = e.pageY;

						$(this).bind("mousemove", onTouchMove);
						$(this).one("mouseup", onTouchEnd);
					}
					else
					{
						startX = e.originalEvent.touches[0].pageX;
						startY = e.originalEvent.touches[0].pageY;

						$(this).bind("touchmove", onTouchMove);
					}

					// Set the start date and current X/Y.
					startDate = new Date().getTime();
					curX = startX;
					curY = startY;
					isMoving = true;

					touchedElement = $(e.target);
				}
			}

			// Called when user untouches the screen.
			function onTouchEnd(e)
			{
				if (config.preventDefault)
				{
					e.preventDefault();
				}

				// When touch events are not present, use mouse events.
				if (useMouseEvents)
				{
					$(this).unbind("mousemove", onTouchMove);
				}
				else
				{
					$(this).unbind("touchmove", onTouchMove);
				}

				// If is moving then calculate the touch results, otherwise reset it.
				if (isMoving)
				{
					touchCalculate(e);
				}
				else
				{
					resetTouch();
				}
			}

			// Called when user is touching and moving on the screen.
			function onTouchMove(e)
			{
				if (config.preventDefault)
				{
					e.preventDefault();
				}

				if (useMouseEvents && !isMoving)
				{
					onTouchStart(e);
				}

				if (isMoving)
				{
					if (useMouseEvents)
					{
						curX = e.pageX;
						curY = e.pageY;
					}
					else
					{
						curX = e.originalEvent.touches[0].pageX;
						curY = e.originalEvent.touches[0].pageY;
					}

					// If there's a wipeMove event, call it passing
					// current X and Y position (curX and curY).
					if (config.wipeMove)
					{
						triggerEvent(config.wipeMove, {
							curX: curX,
							curY: curY
						});
					}
				}
			}

			// ------------------------------------------------------------------------
			// CALCULATE TOUCH AND TRIGGER
			// ------------------------------------------------------------------------

			function touchCalculate(e)
			{
				var endDate = new Date().getTime(); 	// current date to calculate timing
				var ms = startDate - endDate; 			// duration of touch in milliseconds

				var x = curX; 							// current left position
				var y = curY; 							// current top position
				var dx = x - startX; 					// diff of current left to starting left
				var dy = y - startY; 					// diff of current top to starting top
				var ax = Math.abs(dx); 					// amount of horizontal movement
				var ay = Math.abs(dy); 					// amount of vertical movement

				// If moved less than 15 pixels, touch duration is less than 100ms,
				// and tapToClick is true then trigger a click event and stop processing.
				if (ax < 15 && ay < 15 && ms < 100)
				{
					clickEvent = false;

					if (config.preventDefault)
					{
						resetTouch();

						touchedElement.trigger("click");
						return;
					}
				}
				// When touch events are not present, use mouse events.
				else if (useMouseEvents)
				{
					var evts = touchedElement.data("events");

					if (evts)
					{
						// Save click event to the temp clickEvent variable.
						var clicks = evts.click;

						if (clicks && clicks.length > 0)
						{
							$.each(clicks, function (i, f)
							{
								clickEvent = f;
								return;
							});

							touchedElement.unbind("click");
						}
					}
				}

				// Is it moving to the right or left, top or bottom?
				var toright = dx > 0;
				var tobottom = dy > 0;

				// Calculate speed from 1 to 5, 1 being slower and 5 faster.
				var s = ((ax + ay) * 60) / ((ms) / 6 * (ms));

				if (s < 1) s = 1;
				if (s > 5) s = 5;

				var result = {
					speed: parseInt(s),
					x: ax,
					y: ay,
					source: touchedElement
				};

				if (ax >= config.moveX)
				{
					// Check if it's allowed and trigger diagonal wipe events.
					if (config.allowDiagonal && ay >= config.moveY)
					{
						if (toright && tobottom)
						{
							triggerEvent(config.wipeDownRight, result);
						}
						else if (toright && !tobottom)
						{
							triggerEvent(config.wipeUpRight, result);
						}
						else if (!toright && tobottom)
						{
							triggerEvent(config.wipeDownLeft, result);
						}
						else
						{
							triggerEvent(config.wipeUpLeft, result);
						}
					}
					// Otherwise trigger horizontal events if X > Y.
					else if (ax >= ay)
					{
						if (toright)
						{
							triggerEvent(config.wipeRight, result);
						}
						else
						{
							triggerEvent(config.wipeLeft, result);
						}
					}
				}
				// If Y > X and no diagonal, trigger vertical events.
				else if (ay >= config.moveY && ay > ax)
				{
					if (tobottom)
					{
						triggerEvent(config.wipeDown, result);
					}
					else
					{
						triggerEvent(config.wipeUp, result);
					}
				}

				resetTouch();
			}

			// Resets the cached variables.
			function resetTouch()
			{
				startX = false;
				startY = false;
				startDate = false;
				isMoving = false;

				// If there's a click event, bind after a few miliseconds.
				if (clickEvent)
				{
					window.setTimeout(function ()
					{
						touchedElement.bind("click", clickEvent);
						clickEvent = false;
					}, 50);
				}
			}

			// Trigger a wipe event passing a result object with
			// speed from 1 to 5, x / y movement amount in pixels,
			// and the source element.
			function triggerEvent(wipeEvent, result)
			{
				if (wipeEvent)
				{
					wipeEvent(result);
				}
			}

			// ------------------------------------------------------------------------
			// ADD TOUCHSTART AND TOUCHEND EVENT LISTENERS
			// ------------------------------------------------------------------------

			if ("ontouchstart" in document.documentElement)
			{
				$(this).bind("touchstart", onTouchStart);
				$(this).bind("touchend", onTouchEnd);
			}
			else
			{
				useMouseEvents = true;

				$(this).bind("mousedown", onTouchStart);
				$(this).bind("mouseout", onTouchEnd);
			}
		});

		return this;
	};
})(jQuery);
/**
 * AnchorJS - v2.0.0 - 2015-10-31
 * https://github.com/bryanbraun/anchorjs
 * Copyright (c) 2015 Bryan Braun; Licensed MIT
 */
function AnchorJS(A){"use strict";function t(A){o.options.icon=o.options.hasOwnProperty("icon")?A.icon:"",o.options.visible=o.options.hasOwnProperty("visible")?A.visible:"hover",o.options.placement=o.options.hasOwnProperty("placement")?A.placement:"right",o.options.class=o.options.hasOwnProperty("class")?A.class:"",o.options.truncate=o.options.hasOwnProperty("truncate")?Math.floor(A.truncate):64}function e(){if(null===document.head.querySelector("style.anchorjs")){var A,t=document.createElement("style"),e=" .anchorjs-link {   opacity: 0;   text-decoration: none;   -webkit-font-smoothing: antialiased;   -moz-osx-font-smoothing: grayscale; }",o=" *:hover > .anchorjs-link, .anchorjs-link:focus  {   opacity: 1; }",n=' @font-face {   font-family: "anchorjs-icons";   font-style: normal;   font-weight: normal;   src: url(data:application/x-font-ttf;charset=utf-8;base64,AAEAAAALAIAAAwAwT1MvMg8SBTUAAAC8AAAAYGNtYXAWi9QdAAABHAAAAFRnYXNwAAAAEAAAAXAAAAAIZ2x5Zgq29TcAAAF4AAABNGhlYWQEZM3pAAACrAAAADZoaGVhBhUDxgAAAuQAAAAkaG10eASAADEAAAMIAAAAFGxvY2EAKACuAAADHAAAAAxtYXhwAAgAVwAAAygAAAAgbmFtZQ5yJ3cAAANIAAAB2nBvc3QAAwAAAAAFJAAAACAAAwJAAZAABQAAApkCzAAAAI8CmQLMAAAB6wAzAQkAAAAAAAAAAAAAAAAAAAABEAAAAAAAAAAAAAAAAAAAAABAAADpywPA/8AAQAPAAEAAAAABAAAAAAAAAAAAAAAgAAAAAAADAAAAAwAAABwAAQADAAAAHAADAAEAAAAcAAQAOAAAAAoACAACAAIAAQAg6cv//f//AAAAAAAg6cv//f//AAH/4xY5AAMAAQAAAAAAAAAAAAAAAQAB//8ADwABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAAAQAAAAAAAAAAAAIAADc5AQAAAAACADEARAJTAsAAKwBUAAABIiYnJjQ/AT4BMzIWFxYUDwEGIicmND8BNjQnLgEjIgYPAQYUFxYUBw4BIwciJicmND8BNjIXFhQPAQYUFx4BMzI2PwE2NCcmNDc2MhcWFA8BDgEjARQGDAUtLXoWOR8fORYtLTgKGwoKCjgaGg0gEhIgDXoaGgkJBQwHdR85Fi0tOAobCgoKOBoaDSASEiANehoaCQkKGwotLXoWOR8BMwUFLYEuehYXFxYugC44CQkKGwo4GkoaDQ0NDXoaShoKGwoFBe8XFi6ALjgJCQobCjgaShoNDQ0NehpKGgobCgoKLYEuehYXAAEAAAABAACiToc1Xw889QALBAAAAAAA0XnFFgAAAADRecUWAAAAAAJTAsAAAAAIAAIAAAAAAAAAAQAAA8D/wAAABAAAAAAAAlMAAQAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAACAAAAAoAAMQAAAAAACgAUAB4AmgABAAAABQBVAAIAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAADgCuAAEAAAAAAAEADgAAAAEAAAAAAAIABwCfAAEAAAAAAAMADgBLAAEAAAAAAAQADgC0AAEAAAAAAAUACwAqAAEAAAAAAAYADgB1AAEAAAAAAAoAGgDeAAMAAQQJAAEAHAAOAAMAAQQJAAIADgCmAAMAAQQJAAMAHABZAAMAAQQJAAQAHADCAAMAAQQJAAUAFgA1AAMAAQQJAAYAHACDAAMAAQQJAAoANAD4YW5jaG9yanMtaWNvbnMAYQBuAGMAaABvAHIAagBzAC0AaQBjAG8AbgBzVmVyc2lvbiAxLjAAVgBlAHIAcwBpAG8AbgAgADEALgAwYW5jaG9yanMtaWNvbnMAYQBuAGMAaABvAHIAagBzAC0AaQBjAG8AbgBzYW5jaG9yanMtaWNvbnMAYQBuAGMAaABvAHIAagBzAC0AaQBjAG8AbgBzUmVndWxhcgBSAGUAZwB1AGwAYQByYW5jaG9yanMtaWNvbnMAYQBuAGMAaABvAHIAagBzAC0AaQBjAG8AbgBzRm9udCBnZW5lcmF0ZWQgYnkgSWNvTW9vbi4ARgBvAG4AdAAgAGcAZQBuAGUAcgBhAHQAZQBkACAAYgB5ACAASQBjAG8ATQBvAG8AbgAuAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==) format("truetype"); }',i=" [data-anchorjs-icon]::after {   content: attr(data-anchorjs-icon); }";t.className="anchorjs",t.appendChild(document.createTextNode("")),A=document.head.querySelector('[rel="stylesheet"], style'),void 0===A?document.head.appendChild(t):document.head.insertBefore(t,A),t.sheet.insertRule(e,t.sheet.cssRules.length),t.sheet.insertRule(o,t.sheet.cssRules.length),t.sheet.insertRule(i,t.sheet.cssRules.length),t.sheet.insertRule(n,t.sheet.cssRules.length)}}var o=this;this.options=A||{},t(A),this.add=function(A){var o,n,i,s,a,r,l,c,h,g,B,u;if(t(this.options),A){if("string"!=typeof A)throw new Error("The selector provided to AnchorJS was invalid.")}else A="h1, h2, h3, h4, h5, h6";if(o=document.querySelectorAll(A),0===o.length)return!1;for(e(),n=document.querySelectorAll("[id]"),i=[].map.call(n,function(A){return A.id}),a=0;a<o.length;a++){if(o[a].hasAttribute("id"))s=o[a].getAttribute("id");else{r=o[a].textContent,l=this.urlify(r),g=l,h=0;do void 0!==c&&(g=l+"-"+h),c=i.indexOf(g),h+=1;while(-1!==c);c=void 0,i.push(g),o[a].setAttribute("id",g),s=g}B=s.replace(/-/g," "),u=document.createElement("a"),u.className="anchorjs-link "+this.options.class,u.href="#"+s,u.setAttribute("aria-label","Anchor link for: "+B),u.setAttribute("data-anchorjs-icon",this.options.icon),"always"===this.options.visible&&(u.style.opacity="1"),""===this.options.icon&&(u.style.fontFamily="anchorjs-icons",u.style.fontStyle="normal",u.style.fontVariant="normal",u.style.fontWeight="normal",u.style.lineHeight=1,"left"===this.options.placement&&(u.style.lineHeight="inherit")),"left"===this.options.placement?(u.style.position="absolute",u.style.marginLeft="-1em",u.style.paddingRight="0.5em",o[a].insertBefore(u,o[a].firstChild)):(u.style.paddingLeft="0.375em",o[a].appendChild(u))}return this},this.remove=function(A){for(var t,e=document.querySelectorAll(A),o=0;o<e.length;o++)t=e[o].querySelector(".anchorjs-link"),t&&e[o].removeChild(t);return this},this.urlify=function(A){var e,o=/[& +$,:;=?@"#{}|^~[`%!'\]\.\/\(\)\*\\]/g;return t(this.options),e=A.replace(/\'/gi,"").replace(o,"-").replace(/-{2,}/g,"-").substring(0,this.options.truncate).replace(/^-+|-+$/gm,"").toLowerCase()}}var anchors=new AnchorJS;
//Back to top button animation
$(window).scroll(function() {
  "use strict";
	
	if($(this).scrollTop() < 100) {
		$('.btt').removeClass('btt-show btt-end');
	}else if($(this).scrollTop() >= $(document).height() - $(this).height() - $('footer').height()){
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
	
	/* UnveilJS initialisation*/
	$("#page-content img").unveil(300, function() {
		$(this).load();
	});
});