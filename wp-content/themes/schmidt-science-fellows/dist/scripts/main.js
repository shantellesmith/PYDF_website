! function(e) {
  "use strict";
  "function" == typeof define && define.amd ? define(["jquery"], e) : "undefined" != typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
}(function(e) {
  "use strict";
  var i = window.Slick || {};
  i = function() {
    function i(i, o) {
      var s, n = this;
      n.defaults = {
        accessibility: !0,
        adaptiveHeight: !1,
        appendArrows: e(i),
        appendDots: e(i),
        arrows: !0,
        asNavFor: null,
        prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
        nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
        autoplay: !1,
        autoplaySpeed: 3e3,
        centerMode: !1,
        centerPadding: "50px",
        cssEase: "ease",
        customPaging: function(i, t) {
          return e('<button type="button" />').text(t + 1)
        },
        dots: !1,
        dotsClass: "slick-dots",
        draggable: !0,
        easing: "linear",
        edgeFriction: .35,
        fade: !1,
        focusOnSelect: !1,
        focusOnChange: !1,
        infinite: !0,
        initialSlide: 0,
        lazyLoad: "ondemand",
        mobileFirst: !1,
        pauseOnHover: !0,
        pauseOnFocus: !0,
        pauseOnDotsHover: !1,
        respondTo: "window",
        responsive: null,
        rows: 1,
        rtl: !1,
        slide: "",
        slidesPerRow: 1,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        swipe: !0,
        swipeToSlide: !1,
        touchMove: !0,
        touchThreshold: 5,
        useCSS: !0,
        useTransform: !0,
        variableWidth: !1,
        vertical: !1,
        verticalSwiping: !1,
        waitForAnimate: !0,
        zIndex: 1e3
      }, n.initials = {
        animating: !1,
        dragging: !1,
        autoPlayTimer: null,
        currentDirection: 0,
        currentLeft: null,
        currentSlide: 0,
        direction: 1,
        $dots: null,
        listWidth: null,
        listHeight: null,
        loadIndex: 0,
        $nextArrow: null,
        $prevArrow: null,
        scrolling: !1,
        slideCount: null,
        slideWidth: null,
        $slideTrack: null,
        $slides: null,
        sliding: !1,
        slideOffset: 0,
        swipeLeft: null,
        swiping: !1,
        $list: null,
        touchObject: {},
        transformsEnabled: !1,
        unslicked: !1
      }, e.extend(n, n.initials), n.activeBreakpoint = null, n.animType = null, n.animProp = null, n.breakpoints = [], n.breakpointSettings = [], n.cssTransitions = !1, n.focussed = !1, n.interrupted = !1, n.hidden = "hidden", n.paused = !0, n.positionProp = null, n.respondTo = null, n.rowCount = 1, n.shouldClick = !0, n.$slider = e(i), n.$slidesCache = null, n.transformType = null, n.transitionType = null, n.visibilityChange = "visibilitychange", n.windowWidth = 0, n.windowTimer = null, s = e(i).data("slick") || {}, n.options = e.extend({}, n.defaults, o, s), n.currentSlide = n.options.initialSlide, n.originalSettings = n.options, "undefined" != typeof document.mozHidden ? (n.hidden = "mozHidden", n.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (n.hidden = "webkitHidden", n.visibilityChange = "webkitvisibilitychange"), n.autoPlay = e.proxy(n.autoPlay, n), n.autoPlayClear = e.proxy(n.autoPlayClear, n), n.autoPlayIterator = e.proxy(n.autoPlayIterator, n), n.changeSlide = e.proxy(n.changeSlide, n), n.clickHandler = e.proxy(n.clickHandler, n), n.selectHandler = e.proxy(n.selectHandler, n), n.setPosition = e.proxy(n.setPosition, n), n.swipeHandler = e.proxy(n.swipeHandler, n), n.dragHandler = e.proxy(n.dragHandler, n), n.keyHandler = e.proxy(n.keyHandler, n), n.instanceUid = t++, n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, n.registerBreakpoints(), n.init(!0)
    }
    var t = 0;
    return i
  }(), i.prototype.activateADA = function() {
    var e = this;
    e.$slideTrack.find(".slick-active").attr({
      "aria-hidden": "false"
    }).find("a, input, button, select").attr({
      tabindex: "0"
    })
  }, i.prototype.addSlide = i.prototype.slickAdd = function(i, t, o) {
    var s = this;
    if ("boolean" == typeof t) o = t, t = null;
    else if (t < 0 || t >= s.slideCount) return !1;
    s.unload(), "number" == typeof t ? 0 === t && 0 === s.$slides.length ? e(i).appendTo(s.$slideTrack) : o ? e(i).insertBefore(s.$slides.eq(t)) : e(i).insertAfter(s.$slides.eq(t)) : o === !0 ? e(i).prependTo(s.$slideTrack) : e(i).appendTo(s.$slideTrack), s.$slides = s.$slideTrack.children(this.options.slide), s.$slideTrack.children(this.options.slide).detach(), s.$slideTrack.append(s.$slides), s.$slides.each(function(i, t) {
      e(t).attr("data-slick-index", i)
    }), s.$slidesCache = s.$slides, s.reinit()
  }, i.prototype.animateHeight = function() {
    var e = this;
    if (1 === e.options.slidesToShow && e.options.adaptiveHeight === !0 && e.options.vertical === !1) {
      var i = e.$slides.eq(e.currentSlide).outerHeight(!0);
      e.$list.animate({
        height: i
      }, e.options.speed)
    }
  }, i.prototype.animateSlide = function(i, t) {
    var o = {},
      s = this;
    s.animateHeight(), s.options.rtl === !0 && s.options.vertical === !1 && (i = -i), s.transformsEnabled === !1 ? s.options.vertical === !1 ? s.$slideTrack.animate({
      left: i
    }, s.options.speed, s.options.easing, t) : s.$slideTrack.animate({
      top: i
    }, s.options.speed, s.options.easing, t) : s.cssTransitions === !1 ? (s.options.rtl === !0 && (s.currentLeft = -s.currentLeft), e({
      animStart: s.currentLeft
    }).animate({
      animStart: i
    }, {
      duration: s.options.speed,
      easing: s.options.easing,
      step: function(e) {
        e = Math.ceil(e), s.options.vertical === !1 ? (o[s.animType] = "translate(" + e + "px, 0px)", s.$slideTrack.css(o)) : (o[s.animType] = "translate(0px," + e + "px)", s.$slideTrack.css(o))
      },
      complete: function() {
        t && t.call()
      }
    })) : (s.applyTransition(), i = Math.ceil(i), s.options.vertical === !1 ? o[s.animType] = "translate3d(" + i + "px, 0px, 0px)" : o[s.animType] = "translate3d(0px," + i + "px, 0px)", s.$slideTrack.css(o), t && setTimeout(function() {
      s.disableTransition(), t.call()
    }, s.options.speed))
  }, i.prototype.getNavTarget = function() {
    var i = this,
      t = i.options.asNavFor;
    return t && null !== t && (t = e(t).not(i.$slider)), t
  }, i.prototype.asNavFor = function(i) {
    var t = this,
      o = t.getNavTarget();
    null !== o && "object" == typeof o && o.each(function() {
      var t = e(this).slick("getSlick");
      t.unslicked || t.slideHandler(i, !0)
    })
  }, i.prototype.applyTransition = function(e) {
    var i = this,
      t = {};
    i.options.fade === !1 ? t[i.transitionType] = i.transformType + " " + i.options.speed + "ms " + i.options.cssEase : t[i.transitionType] = "opacity " + i.options.speed + "ms " + i.options.cssEase, i.options.fade === !1 ? i.$slideTrack.css(t) : i.$slides.eq(e).css(t)
  }, i.prototype.autoPlay = function() {
    var e = this;
    e.autoPlayClear(), e.slideCount > e.options.slidesToShow && (e.autoPlayTimer = setInterval(e.autoPlayIterator, e.options.autoplaySpeed))
  }, i.prototype.autoPlayClear = function() {
    var e = this;
    e.autoPlayTimer && clearInterval(e.autoPlayTimer)
  }, i.prototype.autoPlayIterator = function() {
    var e = this,
      i = e.currentSlide + e.options.slidesToScroll;
    e.paused || e.interrupted || e.focussed || (e.options.infinite === !1 && (1 === e.direction && e.currentSlide + 1 === e.slideCount - 1 ? e.direction = 0 : 0 === e.direction && (i = e.currentSlide - e.options.slidesToScroll, e.currentSlide - 1 === 0 && (e.direction = 1))), e.slideHandler(i))
  }, i.prototype.buildArrows = function() {
    var i = this;
    i.options.arrows === !0 && (i.$prevArrow = e(i.options.prevArrow).addClass("slick-arrow"), i.$nextArrow = e(i.options.nextArrow).addClass("slick-arrow"), i.slideCount > i.options.slidesToShow ? (i.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), i.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.prependTo(i.options.appendArrows), i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.appendTo(i.options.appendArrows), i.options.infinite !== !0 && i.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : i.$prevArrow.add(i.$nextArrow).addClass("slick-hidden").attr({
      "aria-disabled": "true",
      tabindex: "-1"
    }))
  }, i.prototype.buildDots = function() {
    var i, t, o = this;
    if (o.options.dots === !0 && o.slideCount > o.options.slidesToShow) {
      for (o.$slider.addClass("slick-dotted"), t = e("<ul />").addClass(o.options.dotsClass), i = 0; i <= o.getDotCount(); i += 1) t.append(e("<li />").append(o.options.customPaging.call(this, o, i)));
      o.$dots = t.appendTo(o.options.appendDots), o.$dots.find("li").first().addClass("slick-active")
    }
  }, i.prototype.buildOut = function() {
    var i = this;
    i.$slides = i.$slider.children(i.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), i.slideCount = i.$slides.length, i.$slides.each(function(i, t) {
      e(t).attr("data-slick-index", i).data("originalStyling", e(t).attr("style") || "")
    }), i.$slider.addClass("slick-slider"), i.$slideTrack = 0 === i.slideCount ? e('<div class="slick-track"/>').appendTo(i.$slider) : i.$slides.wrapAll('<div class="slick-track"/>').parent(), i.$list = i.$slideTrack.wrap('<div class="slick-list"/>').parent(), i.$slideTrack.css("opacity", 0), i.options.centerMode !== !0 && i.options.swipeToSlide !== !0 || (i.options.slidesToScroll = 1), e("img[data-lazy]", i.$slider).not("[src]").addClass("slick-loading"), i.setupInfinite(), i.buildArrows(), i.buildDots(), i.updateDots(), i.setSlideClasses("number" == typeof i.currentSlide ? i.currentSlide : 0), i.options.draggable === !0 && i.$list.addClass("draggable")
  }, i.prototype.buildRows = function() {
    var e, i, t, o, s, n, l, r = this;
    if (o = document.createDocumentFragment(), n = r.$slider.children(), r.options.rows > 0) {
      for (l = r.options.slidesPerRow * r.options.rows, s = Math.ceil(n.length / l), e = 0; e < s; e++) {
        var a = document.createElement("div");
        for (i = 0; i < r.options.rows; i++) {
          var d = document.createElement("div");
          for (t = 0; t < r.options.slidesPerRow; t++) {
            var c = e * l + (i * r.options.slidesPerRow + t);
            n.get(c) && d.appendChild(n.get(c))
          }
          a.appendChild(d)
        }
        o.appendChild(a)
      }
      r.$slider.empty().append(o), r.$slider.children().children().children().css({
        width: 100 / r.options.slidesPerRow + "%",
        display: "inline-block"
      })
    }
  }, i.prototype.checkResponsive = function(i, t) {
    var o, s, n, l = this,
      r = !1,
      a = l.$slider.width(),
      d = window.innerWidth || e(window).width();
    if ("window" === l.respondTo ? n = d : "slider" === l.respondTo ? n = a : "min" === l.respondTo && (n = Math.min(d, a)), l.options.responsive && l.options.responsive.length && null !== l.options.responsive) {
      s = null;
      for (o in l.breakpoints) l.breakpoints.hasOwnProperty(o) && (l.originalSettings.mobileFirst === !1 ? n < l.breakpoints[o] && (s = l.breakpoints[o]) : n > l.breakpoints[o] && (s = l.breakpoints[o]));
      null !== s ? null !== l.activeBreakpoint ? (s !== l.activeBreakpoint || t) && (l.activeBreakpoint = s, "unslick" === l.breakpointSettings[s] ? l.unslick(s) : (l.options = e.extend({}, l.originalSettings, l.breakpointSettings[s]), i === !0 && (l.currentSlide = l.options.initialSlide), l.refresh(i)), r = s) : (l.activeBreakpoint = s, "unslick" === l.breakpointSettings[s] ? l.unslick(s) : (l.options = e.extend({}, l.originalSettings, l.breakpointSettings[s]), i === !0 && (l.currentSlide = l.options.initialSlide), l.refresh(i)), r = s) : null !== l.activeBreakpoint && (l.activeBreakpoint = null, l.options = l.originalSettings, i === !0 && (l.currentSlide = l.options.initialSlide), l.refresh(i), r = s), i || r === !1 || l.$slider.trigger("breakpoint", [l, r])
    }
  }, i.prototype.changeSlide = function(i, t) {
    var o, s, n, l = this,
      r = e(i.currentTarget);
    switch (r.is("a") && i.preventDefault(), r.is("li") || (r = r.closest("li")), n = l.slideCount % l.options.slidesToScroll !== 0, o = n ? 0 : (l.slideCount - l.currentSlide) % l.options.slidesToScroll, i.data.message) {
      case "previous":
        s = 0 === o ? l.options.slidesToScroll : l.options.slidesToShow - o, l.slideCount > l.options.slidesToShow && l.slideHandler(l.currentSlide - s, !1, t);
        break;
      case "next":
        s = 0 === o ? l.options.slidesToScroll : o, l.slideCount > l.options.slidesToShow && l.slideHandler(l.currentSlide + s, !1, t);
        break;
      case "index":
        var a = 0 === i.data.index ? 0 : i.data.index || r.index() * l.options.slidesToScroll;
        l.slideHandler(l.checkNavigable(a), !1, t), r.children().trigger("focus");
        break;
      default:
        return
    }
  }, i.prototype.checkNavigable = function(e) {
    var i, t, o = this;
    if (i = o.getNavigableIndexes(), t = 0, e > i[i.length - 1]) e = i[i.length - 1];
    else
      for (var s in i) {
        if (e < i[s]) {
          e = t;
          break
        }
        t = i[s]
      }
    return e
  }, i.prototype.cleanUpEvents = function() {
    var i = this;
    i.options.dots && null !== i.$dots && (e("li", i.$dots).off("click.slick", i.changeSlide).off("mouseenter.slick", e.proxy(i.interrupt, i, !0)).off("mouseleave.slick", e.proxy(i.interrupt, i, !1)), i.options.accessibility === !0 && i.$dots.off("keydown.slick", i.keyHandler)), i.$slider.off("focus.slick blur.slick"), i.options.arrows === !0 && i.slideCount > i.options.slidesToShow && (i.$prevArrow && i.$prevArrow.off("click.slick", i.changeSlide), i.$nextArrow && i.$nextArrow.off("click.slick", i.changeSlide), i.options.accessibility === !0 && (i.$prevArrow && i.$prevArrow.off("keydown.slick", i.keyHandler), i.$nextArrow && i.$nextArrow.off("keydown.slick", i.keyHandler))), i.$list.off("touchstart.slick mousedown.slick", i.swipeHandler), i.$list.off("touchmove.slick mousemove.slick", i.swipeHandler), i.$list.off("touchend.slick mouseup.slick", i.swipeHandler), i.$list.off("touchcancel.slick mouseleave.slick", i.swipeHandler), i.$list.off("click.slick", i.clickHandler), e(document).off(i.visibilityChange, i.visibility), i.cleanUpSlideEvents(), i.options.accessibility === !0 && i.$list.off("keydown.slick", i.keyHandler), i.options.focusOnSelect === !0 && e(i.$slideTrack).children().off("click.slick", i.selectHandler), e(window).off("orientationchange.slick.slick-" + i.instanceUid, i.orientationChange), e(window).off("resize.slick.slick-" + i.instanceUid, i.resize), e("[draggable!=true]", i.$slideTrack).off("dragstart", i.preventDefault), e(window).off("load.slick.slick-" + i.instanceUid, i.setPosition)
  }, i.prototype.cleanUpSlideEvents = function() {
    var i = this;
    i.$list.off("mouseenter.slick", e.proxy(i.interrupt, i, !0)), i.$list.off("mouseleave.slick", e.proxy(i.interrupt, i, !1))
  }, i.prototype.cleanUpRows = function() {
    var e, i = this;
    i.options.rows > 0 && (e = i.$slides.children().children(), e.removeAttr("style"), i.$slider.empty().append(e))
  }, i.prototype.clickHandler = function(e) {
    var i = this;
    i.shouldClick === !1 && (e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault())
  }, i.prototype.destroy = function(i) {
    var t = this;
    t.autoPlayClear(), t.touchObject = {}, t.cleanUpEvents(), e(".slick-cloned", t.$slider).detach(), t.$dots && t.$dots.remove(), t.$prevArrow && t.$prevArrow.length && (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()), t.$nextArrow && t.$nextArrow.length && (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()), t.$slides && (t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
      e(this).attr("style", e(this).data("originalStyling"))
    }), t.$slideTrack.children(this.options.slide).detach(), t.$slideTrack.detach(), t.$list.detach(), t.$slider.append(t.$slides)), t.cleanUpRows(), t.$slider.removeClass("slick-slider"), t.$slider.removeClass("slick-initialized"), t.$slider.removeClass("slick-dotted"), t.unslicked = !0, i || t.$slider.trigger("destroy", [t])
  }, i.prototype.disableTransition = function(e) {
    var i = this,
      t = {};
    t[i.transitionType] = "", i.options.fade === !1 ? i.$slideTrack.css(t) : i.$slides.eq(e).css(t)
  }, i.prototype.fadeSlide = function(e, i) {
    var t = this;
    t.cssTransitions === !1 ? (t.$slides.eq(e).css({
      zIndex: t.options.zIndex
    }), t.$slides.eq(e).animate({
      opacity: 1
    }, t.options.speed, t.options.easing, i)) : (t.applyTransition(e), t.$slides.eq(e).css({
      opacity: 1,
      zIndex: t.options.zIndex
    }), i && setTimeout(function() {
      t.disableTransition(e), i.call()
    }, t.options.speed))
  }, i.prototype.fadeSlideOut = function(e) {
    var i = this;
    i.cssTransitions === !1 ? i.$slides.eq(e).animate({
      opacity: 0,
      zIndex: i.options.zIndex - 2
    }, i.options.speed, i.options.easing) : (i.applyTransition(e), i.$slides.eq(e).css({
      opacity: 0,
      zIndex: i.options.zIndex - 2
    }))
  }, i.prototype.filterSlides = i.prototype.slickFilter = function(e) {
    var i = this;
    null !== e && (i.$slidesCache = i.$slides, i.unload(), i.$slideTrack.children(this.options.slide).detach(), i.$slidesCache.filter(e).appendTo(i.$slideTrack), i.reinit())
  }, i.prototype.focusHandler = function() {
    var i = this;
    i.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function(t) {
      t.stopImmediatePropagation();
      var o = e(this);
      setTimeout(function() {
        i.options.pauseOnFocus && (i.focussed = o.is(":focus"), i.autoPlay())
      }, 0)
    })
  }, i.prototype.getCurrent = i.prototype.slickCurrentSlide = function() {
    var e = this;
    return e.currentSlide
  }, i.prototype.getDotCount = function() {
    var e = this,
      i = 0,
      t = 0,
      o = 0;
    if (e.options.infinite === !0)
      if (e.slideCount <= e.options.slidesToShow) ++o;
      else
        for (; i < e.slideCount;) ++o, i = t + e.options.slidesToScroll, t += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
    else if (e.options.centerMode === !0) o = e.slideCount;
    else if (e.options.asNavFor)
      for (; i < e.slideCount;) ++o, i = t + e.options.slidesToScroll, t += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
    else o = 1 + Math.ceil((e.slideCount - e.options.slidesToShow) / e.options.slidesToScroll);
    return o - 1
  }, i.prototype.getLeft = function(e) {
    var i, t, o, s, n = this,
      l = 0;
    return n.slideOffset = 0, t = n.$slides.first().outerHeight(!0), n.options.infinite === !0 ? (n.slideCount > n.options.slidesToShow && (n.slideOffset = n.slideWidth * n.options.slidesToShow * -1, s = -1, n.options.vertical === !0 && n.options.centerMode === !0 && (2 === n.options.slidesToShow ? s = -1.5 : 1 === n.options.slidesToShow && (s = -2)), l = t * n.options.slidesToShow * s), n.slideCount % n.options.slidesToScroll !== 0 && e + n.options.slidesToScroll > n.slideCount && n.slideCount > n.options.slidesToShow && (e > n.slideCount ? (n.slideOffset = (n.options.slidesToShow - (e - n.slideCount)) * n.slideWidth * -1, l = (n.options.slidesToShow - (e - n.slideCount)) * t * -1) : (n.slideOffset = n.slideCount % n.options.slidesToScroll * n.slideWidth * -1, l = n.slideCount % n.options.slidesToScroll * t * -1))) : e + n.options.slidesToShow > n.slideCount && (n.slideOffset = (e + n.options.slidesToShow - n.slideCount) * n.slideWidth, l = (e + n.options.slidesToShow - n.slideCount) * t), n.slideCount <= n.options.slidesToShow && (n.slideOffset = 0, l = 0), n.options.centerMode === !0 && n.slideCount <= n.options.slidesToShow ? n.slideOffset = n.slideWidth * Math.floor(n.options.slidesToShow) / 2 - n.slideWidth * n.slideCount / 2 : n.options.centerMode === !0 && n.options.infinite === !0 ? n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth : n.options.centerMode === !0 && (n.slideOffset = 0, n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2)), i = n.options.vertical === !1 ? e * n.slideWidth * -1 + n.slideOffset : e * t * -1 + l, n.options.variableWidth === !0 && (o = n.slideCount <= n.options.slidesToShow || n.options.infinite === !1 ? n.$slideTrack.children(".slick-slide").eq(e) : n.$slideTrack.children(".slick-slide").eq(e + n.options.slidesToShow), i = n.options.rtl === !0 ? o[0] ? (n.$slideTrack.width() - o[0].offsetLeft - o.width()) * -1 : 0 : o[0] ? o[0].offsetLeft * -1 : 0, n.options.centerMode === !0 && (o = n.slideCount <= n.options.slidesToShow || n.options.infinite === !1 ? n.$slideTrack.children(".slick-slide").eq(e) : n.$slideTrack.children(".slick-slide").eq(e + n.options.slidesToShow + 1), i = n.options.rtl === !0 ? o[0] ? (n.$slideTrack.width() - o[0].offsetLeft - o.width()) * -1 : 0 : o[0] ? o[0].offsetLeft * -1 : 0, i += (n.$list.width() - o.outerWidth()) / 2)), i
  }, i.prototype.getOption = i.prototype.slickGetOption = function(e) {
    var i = this;
    return i.options[e]
  }, i.prototype.getNavigableIndexes = function() {
    var e, i = this,
      t = 0,
      o = 0,
      s = [];
    for (i.options.infinite === !1 ? e = i.slideCount : (t = i.options.slidesToScroll * -1, o = i.options.slidesToScroll * -1, e = 2 * i.slideCount); t < e;) s.push(t), t = o + i.options.slidesToScroll, o += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
    return s
  }, i.prototype.getSlick = function() {
    return this
  }, i.prototype.getSlideCount = function() {
    var i, t, o, s = this;
    return o = s.options.centerMode === !0 ? s.slideWidth * Math.floor(s.options.slidesToShow / 2) : 0, s.options.swipeToSlide === !0 ? (s.$slideTrack.find(".slick-slide").each(function(i, n) {
      if (n.offsetLeft - o + e(n).outerWidth() / 2 > s.swipeLeft * -1) return t = n, !1
    }), i = Math.abs(e(t).attr("data-slick-index") - s.currentSlide) || 1) : s.options.slidesToScroll
  }, i.prototype.goTo = i.prototype.slickGoTo = function(e, i) {
    var t = this;
    t.changeSlide({
      data: {
        message: "index",
        index: parseInt(e)
      }
    }, i)
  }, i.prototype.init = function(i) {
    var t = this;
    e(t.$slider).hasClass("slick-initialized") || (e(t.$slider).addClass("slick-initialized"), t.buildRows(), t.buildOut(), t.setProps(), t.startLoad(), t.loadSlider(), t.initializeEvents(), t.updateArrows(), t.updateDots(), t.checkResponsive(!0), t.focusHandler()), i && t.$slider.trigger("init", [t]), t.options.accessibility === !0 && t.initADA(), t.options.autoplay && (t.paused = !1, t.autoPlay())
  }, i.prototype.initADA = function() {
    var i = this,
      t = Math.ceil(i.slideCount / i.options.slidesToShow),
      o = i.getNavigableIndexes().filter(function(e) {
        return e >= 0 && e < i.slideCount
      });
    i.$slides.add(i.$slideTrack.find(".slick-cloned")).attr({
      "aria-hidden": "true",
      tabindex: "-1"
    }).find("a, input, button, select").attr({
      tabindex: "-1"
    }), null !== i.$dots && (i.$slides.not(i.$slideTrack.find(".slick-cloned")).each(function(t) {
      var s = o.indexOf(t);
      if (e(this).attr({
          role: "tabpanel",
          id: "slick-slide" + i.instanceUid + t,
          tabindex: -1
        }), s !== -1) {
        var n = "slick-slide-control" + i.instanceUid + s;
        e("#" + n).length && e(this).attr({
          "aria-describedby": n
        })
      }
    }), i.$dots.attr("role", "tablist").find("li").each(function(s) {
      var n = o[s];
      e(this).attr({
        role: "presentation"
      }), e(this).find("button").first().attr({
        role: "tab",
        id: "slick-slide-control" + i.instanceUid + s,
        "aria-controls": "slick-slide" + i.instanceUid + n,
        "aria-label": s + 1 + " of " + t,
        "aria-selected": null,
        tabindex: "-1"
      })
    }).eq(i.currentSlide).find("button").attr({
      "aria-selected": "true",
      tabindex: "0"
    }).end());
    for (var s = i.currentSlide, n = s + i.options.slidesToShow; s < n; s++) i.options.focusOnChange ? i.$slides.eq(s).attr({
      tabindex: "0"
    }) : i.$slides.eq(s).removeAttr("tabindex");
    i.activateADA()
  }, i.prototype.initArrowEvents = function() {
    var e = this;
    e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && (e.$prevArrow.off("click.slick").on("click.slick", {
      message: "previous"
    }, e.changeSlide), e.$nextArrow.off("click.slick").on("click.slick", {
      message: "next"
    }, e.changeSlide), e.options.accessibility === !0 && (e.$prevArrow.on("keydown.slick", e.keyHandler), e.$nextArrow.on("keydown.slick", e.keyHandler)))
  }, i.prototype.initDotEvents = function() {
    var i = this;
    i.options.dots === !0 && i.slideCount > i.options.slidesToShow && (e("li", i.$dots).on("click.slick", {
      message: "index"
    }, i.changeSlide), i.options.accessibility === !0 && i.$dots.on("keydown.slick", i.keyHandler)), i.options.dots === !0 && i.options.pauseOnDotsHover === !0 && i.slideCount > i.options.slidesToShow && e("li", i.$dots).on("mouseenter.slick", e.proxy(i.interrupt, i, !0)).on("mouseleave.slick", e.proxy(i.interrupt, i, !1))
  }, i.prototype.initSlideEvents = function() {
    var i = this;
    i.options.pauseOnHover && (i.$list.on("mouseenter.slick", e.proxy(i.interrupt, i, !0)), i.$list.on("mouseleave.slick", e.proxy(i.interrupt, i, !1)))
  }, i.prototype.initializeEvents = function() {
    var i = this;
    i.initArrowEvents(), i.initDotEvents(), i.initSlideEvents(), i.$list.on("touchstart.slick mousedown.slick", {
      action: "start"
    }, i.swipeHandler), i.$list.on("touchmove.slick mousemove.slick", {
      action: "move"
    }, i.swipeHandler), i.$list.on("touchend.slick mouseup.slick", {
      action: "end"
    }, i.swipeHandler), i.$list.on("touchcancel.slick mouseleave.slick", {
      action: "end"
    }, i.swipeHandler), i.$list.on("click.slick", i.clickHandler), e(document).on(i.visibilityChange, e.proxy(i.visibility, i)), i.options.accessibility === !0 && i.$list.on("keydown.slick", i.keyHandler), i.options.focusOnSelect === !0 && e(i.$slideTrack).children().on("click.slick", i.selectHandler), e(window).on("orientationchange.slick.slick-" + i.instanceUid, e.proxy(i.orientationChange, i)), e(window).on("resize.slick.slick-" + i.instanceUid, e.proxy(i.resize, i)), e("[draggable!=true]", i.$slideTrack).on("dragstart", i.preventDefault), e(window).on("load.slick.slick-" + i.instanceUid, i.setPosition), e(i.setPosition)
  }, i.prototype.initUI = function() {
    var e = this;
    e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && (e.$prevArrow.show(), e.$nextArrow.show()), e.options.dots === !0 && e.slideCount > e.options.slidesToShow && e.$dots.show()
  }, i.prototype.keyHandler = function(e) {
    var i = this;
    e.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === e.keyCode && i.options.accessibility === !0 ? i.changeSlide({
      data: {
        message: i.options.rtl === !0 ? "next" : "previous"
      }
    }) : 39 === e.keyCode && i.options.accessibility === !0 && i.changeSlide({
      data: {
        message: i.options.rtl === !0 ? "previous" : "next"
      }
    }))
  }, i.prototype.lazyLoad = function() {
    function i(i) {
      e("img[data-lazy]", i).each(function() {
        var i = e(this),
          t = e(this).attr("data-lazy"),
          o = e(this).attr("data-srcset"),
          s = e(this).attr("data-sizes") || l.$slider.attr("data-sizes"),
          n = document.createElement("img");
        n.onload = function() {
          i.animate({
            opacity: 0
          }, 100, function() {
            o && (i.attr("srcset", o), s && i.attr("sizes", s)), i.attr("src", t).animate({
              opacity: 1
            }, 200, function() {
              i.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
            }), l.$slider.trigger("lazyLoaded", [l, i, t])
          })
        }, n.onerror = function() {
          i.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), l.$slider.trigger("lazyLoadError", [l, i, t])
        }, n.src = t
      })
    }
    var t, o, s, n, l = this;
    if (l.options.centerMode === !0 ? l.options.infinite === !0 ? (s = l.currentSlide + (l.options.slidesToShow / 2 + 1), n = s + l.options.slidesToShow + 2) : (s = Math.max(0, l.currentSlide - (l.options.slidesToShow / 2 + 1)), n = 2 + (l.options.slidesToShow / 2 + 1) + l.currentSlide) : (s = l.options.infinite ? l.options.slidesToShow + l.currentSlide : l.currentSlide, n = Math.ceil(s + l.options.slidesToShow), l.options.fade === !0 && (s > 0 && s--, n <= l.slideCount && n++)), t = l.$slider.find(".slick-slide").slice(s, n), "anticipated" === l.options.lazyLoad)
      for (var r = s - 1, a = n, d = l.$slider.find(".slick-slide"), c = 0; c < l.options.slidesToScroll; c++) r < 0 && (r = l.slideCount - 1), t = t.add(d.eq(r)), t = t.add(d.eq(a)), r--, a++;
    i(t), l.slideCount <= l.options.slidesToShow ? (o = l.$slider.find(".slick-slide"), i(o)) : l.currentSlide >= l.slideCount - l.options.slidesToShow ? (o = l.$slider.find(".slick-cloned").slice(0, l.options.slidesToShow), i(o)) : 0 === l.currentSlide && (o = l.$slider.find(".slick-cloned").slice(l.options.slidesToShow * -1), i(o))
  }, i.prototype.loadSlider = function() {
    var e = this;
    e.setPosition(), e.$slideTrack.css({
      opacity: 1
    }), e.$slider.removeClass("slick-loading"), e.initUI(), "progressive" === e.options.lazyLoad && e.progressiveLazyLoad()
  }, i.prototype.next = i.prototype.slickNext = function() {
    var e = this;
    e.changeSlide({
      data: {
        message: "next"
      }
    })
  }, i.prototype.orientationChange = function() {
    var e = this;
    e.checkResponsive(), e.setPosition()
  }, i.prototype.pause = i.prototype.slickPause = function() {
    var e = this;
    e.autoPlayClear(), e.paused = !0
  }, i.prototype.play = i.prototype.slickPlay = function() {
    var e = this;
    e.autoPlay(), e.options.autoplay = !0, e.paused = !1, e.focussed = !1, e.interrupted = !1
  }, i.prototype.postSlide = function(i) {
    var t = this;
    if (!t.unslicked && (t.$slider.trigger("afterChange", [t, i]), t.animating = !1, t.slideCount > t.options.slidesToShow && t.setPosition(), t.swipeLeft = null, t.options.autoplay && t.autoPlay(), t.options.accessibility === !0 && (t.initADA(), t.options.focusOnChange))) {
      var o = e(t.$slides.get(t.currentSlide));
      o.attr("tabindex", 0).focus()
    }
  }, i.prototype.prev = i.prototype.slickPrev = function() {
    var e = this;
    e.changeSlide({
      data: {
        message: "previous"
      }
    })
  }, i.prototype.preventDefault = function(e) {
    e.preventDefault()
  }, i.prototype.progressiveLazyLoad = function(i) {
    i = i || 1;
    var t, o, s, n, l, r = this,
      a = e("img[data-lazy]", r.$slider);
    a.length ? (t = a.first(), o = t.attr("data-lazy"), s = t.attr("data-srcset"), n = t.attr("data-sizes") || r.$slider.attr("data-sizes"), l = document.createElement("img"), l.onload = function() {
      s && (t.attr("srcset", s), n && t.attr("sizes", n)), t.attr("src", o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), r.options.adaptiveHeight === !0 && r.setPosition(), r.$slider.trigger("lazyLoaded", [r, t, o]), r.progressiveLazyLoad()
    }, l.onerror = function() {
      i < 3 ? setTimeout(function() {
        r.progressiveLazyLoad(i + 1)
      }, 500) : (t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), r.$slider.trigger("lazyLoadError", [r, t, o]), r.progressiveLazyLoad())
    }, l.src = o) : r.$slider.trigger("allImagesLoaded", [r])
  }, i.prototype.refresh = function(i) {
    var t, o, s = this;
    o = s.slideCount - s.options.slidesToShow, !s.options.infinite && s.currentSlide > o && (s.currentSlide = o), s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0), t = s.currentSlide, s.destroy(!0), e.extend(s, s.initials, {
      currentSlide: t
    }), s.init(), i || s.changeSlide({
      data: {
        message: "index",
        index: t
      }
    }, !1)
  }, i.prototype.registerBreakpoints = function() {
    var i, t, o, s = this,
      n = s.options.responsive || null;
    if ("array" === e.type(n) && n.length) {
      s.respondTo = s.options.respondTo || "window";
      for (i in n)
        if (o = s.breakpoints.length - 1, n.hasOwnProperty(i)) {
          for (t = n[i].breakpoint; o >= 0;) s.breakpoints[o] && s.breakpoints[o] === t && s.breakpoints.splice(o, 1), o--;
          s.breakpoints.push(t), s.breakpointSettings[t] = n[i].settings
        } s.breakpoints.sort(function(e, i) {
        return s.options.mobileFirst ? e - i : i - e
      })
    }
  }, i.prototype.reinit = function() {
    var i = this;
    i.$slides = i.$slideTrack.children(i.options.slide).addClass("slick-slide"), i.slideCount = i.$slides.length, i.currentSlide >= i.slideCount && 0 !== i.currentSlide && (i.currentSlide = i.currentSlide - i.options.slidesToScroll), i.slideCount <= i.options.slidesToShow && (i.currentSlide = 0), i.registerBreakpoints(), i.setProps(), i.setupInfinite(), i.buildArrows(), i.updateArrows(), i.initArrowEvents(), i.buildDots(), i.updateDots(), i.initDotEvents(), i.cleanUpSlideEvents(), i.initSlideEvents(), i.checkResponsive(!1, !0), i.options.focusOnSelect === !0 && e(i.$slideTrack).children().on("click.slick", i.selectHandler), i.setSlideClasses("number" == typeof i.currentSlide ? i.currentSlide : 0), i.setPosition(), i.focusHandler(), i.paused = !i.options.autoplay, i.autoPlay(), i.$slider.trigger("reInit", [i])
  }, i.prototype.resize = function() {
    var i = this;
    e(window).width() !== i.windowWidth && (clearTimeout(i.windowDelay), i.windowDelay = window.setTimeout(function() {
      i.windowWidth = e(window).width(), i.checkResponsive(), i.unslicked || i.setPosition()
    }, 50))
  }, i.prototype.removeSlide = i.prototype.slickRemove = function(e, i, t) {
    var o = this;
    return "boolean" == typeof e ? (i = e, e = i === !0 ? 0 : o.slideCount - 1) : e = i === !0 ? --e : e, !(o.slideCount < 1 || e < 0 || e > o.slideCount - 1) && (o.unload(), t === !0 ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(e).remove(), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slidesCache = o.$slides, void o.reinit())
  }, i.prototype.setCSS = function(e) {
    var i, t, o = this,
      s = {};
    o.options.rtl === !0 && (e = -e), i = "left" == o.positionProp ? Math.ceil(e) + "px" : "0px", t = "top" == o.positionProp ? Math.ceil(e) + "px" : "0px", s[o.positionProp] = e, o.transformsEnabled === !1 ? o.$slideTrack.css(s) : (s = {}, o.cssTransitions === !1 ? (s[o.animType] = "translate(" + i + ", " + t + ")", o.$slideTrack.css(s)) : (s[o.animType] = "translate3d(" + i + ", " + t + ", 0px)", o.$slideTrack.css(s)))
  }, i.prototype.setDimensions = function() {
    var e = this;
    e.options.vertical === !1 ? e.options.centerMode === !0 && e.$list.css({
      padding: "0px " + e.options.centerPadding
    }) : (e.$list.height(e.$slides.first().outerHeight(!0) * e.options.slidesToShow), e.options.centerMode === !0 && e.$list.css({
      padding: e.options.centerPadding + " 0px"
    })), e.listWidth = e.$list.width(), e.listHeight = e.$list.height(), e.options.vertical === !1 && e.options.variableWidth === !1 ? (e.slideWidth = Math.ceil(e.listWidth / e.options.slidesToShow), e.$slideTrack.width(Math.ceil(e.slideWidth * e.$slideTrack.children(".slick-slide").length))) : e.options.variableWidth === !0 ? e.$slideTrack.width(5e3 * e.slideCount) : (e.slideWidth = Math.ceil(e.listWidth), e.$slideTrack.height(Math.ceil(e.$slides.first().outerHeight(!0) * e.$slideTrack.children(".slick-slide").length)));
    var i = e.$slides.first().outerWidth(!0) - e.$slides.first().width();
    e.options.variableWidth === !1 && e.$slideTrack.children(".slick-slide").width(e.slideWidth - i)
  }, i.prototype.setFade = function() {
    var i, t = this;
    t.$slides.each(function(o, s) {
      i = t.slideWidth * o * -1, t.options.rtl === !0 ? e(s).css({
        position: "relative",
        right: i,
        top: 0,
        zIndex: t.options.zIndex - 2,
        opacity: 0
      }) : e(s).css({
        position: "relative",
        left: i,
        top: 0,
        zIndex: t.options.zIndex - 2,
        opacity: 0
      })
    }), t.$slides.eq(t.currentSlide).css({
      zIndex: t.options.zIndex - 1,
      opacity: 1
    })
  }, i.prototype.setHeight = function() {
    var e = this;
    if (1 === e.options.slidesToShow && e.options.adaptiveHeight === !0 && e.options.vertical === !1) {
      var i = e.$slides.eq(e.currentSlide).outerHeight(!0);
      e.$list.css("height", i)
    }
  }, i.prototype.setOption = i.prototype.slickSetOption = function() {
    var i, t, o, s, n, l = this,
      r = !1;
    if ("object" === e.type(arguments[0]) ? (o = arguments[0], r = arguments[1], n = "multiple") : "string" === e.type(arguments[0]) && (o = arguments[0], s = arguments[1], r = arguments[2], "responsive" === arguments[0] && "array" === e.type(arguments[1]) ? n = "responsive" : "undefined" != typeof arguments[1] && (n = "single")), "single" === n) l.options[o] = s;
    else if ("multiple" === n) e.each(o, function(e, i) {
      l.options[e] = i
    });
    else if ("responsive" === n)
      for (t in s)
        if ("array" !== e.type(l.options.responsive)) l.options.responsive = [s[t]];
        else {
          for (i = l.options.responsive.length - 1; i >= 0;) l.options.responsive[i].breakpoint === s[t].breakpoint && l.options.responsive.splice(i, 1), i--;
          l.options.responsive.push(s[t])
        } r && (l.unload(), l.reinit())
  }, i.prototype.setPosition = function() {
    var e = this;
    e.setDimensions(), e.setHeight(), e.options.fade === !1 ? e.setCSS(e.getLeft(e.currentSlide)) : e.setFade(), e.$slider.trigger("setPosition", [e])
  }, i.prototype.setProps = function() {
    var e = this,
      i = document.body.style;
    e.positionProp = e.options.vertical === !0 ? "top" : "left", "top" === e.positionProp ? e.$slider.addClass("slick-vertical") : e.$slider.removeClass("slick-vertical"),
      void 0 === i.WebkitTransition && void 0 === i.MozTransition && void 0 === i.msTransition || e.options.useCSS === !0 && (e.cssTransitions = !0), e.options.fade && ("number" == typeof e.options.zIndex ? e.options.zIndex < 3 && (e.options.zIndex = 3) : e.options.zIndex = e.defaults.zIndex), void 0 !== i.OTransform && (e.animType = "OTransform", e.transformType = "-o-transform", e.transitionType = "OTransition", void 0 === i.perspectiveProperty && void 0 === i.webkitPerspective && (e.animType = !1)), void 0 !== i.MozTransform && (e.animType = "MozTransform", e.transformType = "-moz-transform", e.transitionType = "MozTransition", void 0 === i.perspectiveProperty && void 0 === i.MozPerspective && (e.animType = !1)), void 0 !== i.webkitTransform && (e.animType = "webkitTransform", e.transformType = "-webkit-transform", e.transitionType = "webkitTransition", void 0 === i.perspectiveProperty && void 0 === i.webkitPerspective && (e.animType = !1)), void 0 !== i.msTransform && (e.animType = "msTransform", e.transformType = "-ms-transform", e.transitionType = "msTransition", void 0 === i.msTransform && (e.animType = !1)), void 0 !== i.transform && e.animType !== !1 && (e.animType = "transform", e.transformType = "transform", e.transitionType = "transition"), e.transformsEnabled = e.options.useTransform && null !== e.animType && e.animType !== !1
  }, i.prototype.setSlideClasses = function(e) {
    var i, t, o, s, n = this;
    if (t = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), n.$slides.eq(e).addClass("slick-current"), n.options.centerMode === !0) {
      var l = n.options.slidesToShow % 2 === 0 ? 1 : 0;
      i = Math.floor(n.options.slidesToShow / 2), n.options.infinite === !0 && (e >= i && e <= n.slideCount - 1 - i ? n.$slides.slice(e - i + l, e + i + 1).addClass("slick-active").attr("aria-hidden", "false") : (o = n.options.slidesToShow + e, t.slice(o - i + 1 + l, o + i + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === e ? t.eq(t.length - 1 - n.options.slidesToShow).addClass("slick-center") : e === n.slideCount - 1 && t.eq(n.options.slidesToShow).addClass("slick-center")), n.$slides.eq(e).addClass("slick-center")
    } else e >= 0 && e <= n.slideCount - n.options.slidesToShow ? n.$slides.slice(e, e + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : t.length <= n.options.slidesToShow ? t.addClass("slick-active").attr("aria-hidden", "false") : (s = n.slideCount % n.options.slidesToShow, o = n.options.infinite === !0 ? n.options.slidesToShow + e : e, n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - e < n.options.slidesToShow ? t.slice(o - (n.options.slidesToShow - s), o + s).addClass("slick-active").attr("aria-hidden", "false") : t.slice(o, o + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
    "ondemand" !== n.options.lazyLoad && "anticipated" !== n.options.lazyLoad || n.lazyLoad()
  }, i.prototype.setupInfinite = function() {
    var i, t, o, s = this;
    if (s.options.fade === !0 && (s.options.centerMode = !1), s.options.infinite === !0 && s.options.fade === !1 && (t = null, s.slideCount > s.options.slidesToShow)) {
      for (o = s.options.centerMode === !0 ? s.options.slidesToShow + 1 : s.options.slidesToShow, i = s.slideCount; i > s.slideCount - o; i -= 1) t = i - 1, e(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t - s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");
      for (i = 0; i < o + s.slideCount; i += 1) t = i, e(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t + s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");
      s.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
        e(this).attr("id", "")
      })
    }
  }, i.prototype.interrupt = function(e) {
    var i = this;
    e || i.autoPlay(), i.interrupted = e
  }, i.prototype.selectHandler = function(i) {
    var t = this,
      o = e(i.target).is(".slick-slide") ? e(i.target) : e(i.target).parents(".slick-slide"),
      s = parseInt(o.attr("data-slick-index"));
    return s || (s = 0), t.slideCount <= t.options.slidesToShow ? void t.slideHandler(s, !1, !0) : void t.slideHandler(s)
  }, i.prototype.slideHandler = function(e, i, t) {
    var o, s, n, l, r, a = null,
      d = this;
    if (i = i || !1, !(d.animating === !0 && d.options.waitForAnimate === !0 || d.options.fade === !0 && d.currentSlide === e)) return i === !1 && d.asNavFor(e), o = e, a = d.getLeft(o), l = d.getLeft(d.currentSlide), d.currentLeft = null === d.swipeLeft ? l : d.swipeLeft, d.options.infinite === !1 && d.options.centerMode === !1 && (e < 0 || e > d.getDotCount() * d.options.slidesToScroll) ? void(d.options.fade === !1 && (o = d.currentSlide, t !== !0 && d.slideCount > d.options.slidesToShow ? d.animateSlide(l, function() {
      d.postSlide(o)
    }) : d.postSlide(o))) : d.options.infinite === !1 && d.options.centerMode === !0 && (e < 0 || e > d.slideCount - d.options.slidesToScroll) ? void(d.options.fade === !1 && (o = d.currentSlide, t !== !0 && d.slideCount > d.options.slidesToShow ? d.animateSlide(l, function() {
      d.postSlide(o)
    }) : d.postSlide(o))) : (d.options.autoplay && clearInterval(d.autoPlayTimer), s = o < 0 ? d.slideCount % d.options.slidesToScroll !== 0 ? d.slideCount - d.slideCount % d.options.slidesToScroll : d.slideCount + o : o >= d.slideCount ? d.slideCount % d.options.slidesToScroll !== 0 ? 0 : o - d.slideCount : o, d.animating = !0, d.$slider.trigger("beforeChange", [d, d.currentSlide, s]), n = d.currentSlide, d.currentSlide = s, d.setSlideClasses(d.currentSlide), d.options.asNavFor && (r = d.getNavTarget(), r = r.slick("getSlick"), r.slideCount <= r.options.slidesToShow && r.setSlideClasses(d.currentSlide)), d.updateDots(), d.updateArrows(), d.options.fade === !0 ? (t !== !0 ? (d.fadeSlideOut(n), d.fadeSlide(s, function() {
      d.postSlide(s)
    })) : d.postSlide(s), void d.animateHeight()) : void(t !== !0 && d.slideCount > d.options.slidesToShow ? d.animateSlide(a, function() {
      d.postSlide(s)
    }) : d.postSlide(s)))
  }, i.prototype.startLoad = function() {
    var e = this;
    e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && (e.$prevArrow.hide(), e.$nextArrow.hide()), e.options.dots === !0 && e.slideCount > e.options.slidesToShow && e.$dots.hide(), e.$slider.addClass("slick-loading")
  }, i.prototype.swipeDirection = function() {
    var e, i, t, o, s = this;
    return e = s.touchObject.startX - s.touchObject.curX, i = s.touchObject.startY - s.touchObject.curY, t = Math.atan2(i, e), o = Math.round(180 * t / Math.PI), o < 0 && (o = 360 - Math.abs(o)), o <= 45 && o >= 0 ? s.options.rtl === !1 ? "left" : "right" : o <= 360 && o >= 315 ? s.options.rtl === !1 ? "left" : "right" : o >= 135 && o <= 225 ? s.options.rtl === !1 ? "right" : "left" : s.options.verticalSwiping === !0 ? o >= 35 && o <= 135 ? "down" : "up" : "vertical"
  }, i.prototype.swipeEnd = function(e) {
    var i, t, o = this;
    if (o.dragging = !1, o.swiping = !1, o.scrolling) return o.scrolling = !1, !1;
    if (o.interrupted = !1, o.shouldClick = !(o.touchObject.swipeLength > 10), void 0 === o.touchObject.curX) return !1;
    if (o.touchObject.edgeHit === !0 && o.$slider.trigger("edge", [o, o.swipeDirection()]), o.touchObject.swipeLength >= o.touchObject.minSwipe) {
      switch (t = o.swipeDirection()) {
        case "left":
        case "down":
          i = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount(), o.currentDirection = 0;
          break;
        case "right":
        case "up":
          i = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount(), o.currentDirection = 1
      }
      "vertical" != t && (o.slideHandler(i), o.touchObject = {}, o.$slider.trigger("swipe", [o, t]))
    } else o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide), o.touchObject = {})
  }, i.prototype.swipeHandler = function(e) {
    var i = this;
    if (!(i.options.swipe === !1 || "ontouchend" in document && i.options.swipe === !1 || i.options.draggable === !1 && e.type.indexOf("mouse") !== -1)) switch (i.touchObject.fingerCount = e.originalEvent && void 0 !== e.originalEvent.touches ? e.originalEvent.touches.length : 1, i.touchObject.minSwipe = i.listWidth / i.options.touchThreshold, i.options.verticalSwiping === !0 && (i.touchObject.minSwipe = i.listHeight / i.options.touchThreshold), e.data.action) {
      case "start":
        i.swipeStart(e);
        break;
      case "move":
        i.swipeMove(e);
        break;
      case "end":
        i.swipeEnd(e)
    }
  }, i.prototype.swipeMove = function(e) {
    var i, t, o, s, n, l, r = this;
    return n = void 0 !== e.originalEvent ? e.originalEvent.touches : null, !(!r.dragging || r.scrolling || n && 1 !== n.length) && (i = r.getLeft(r.currentSlide), r.touchObject.curX = void 0 !== n ? n[0].pageX : e.clientX, r.touchObject.curY = void 0 !== n ? n[0].pageY : e.clientY, r.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(r.touchObject.curX - r.touchObject.startX, 2))), l = Math.round(Math.sqrt(Math.pow(r.touchObject.curY - r.touchObject.startY, 2))), !r.options.verticalSwiping && !r.swiping && l > 4 ? (r.scrolling = !0, !1) : (r.options.verticalSwiping === !0 && (r.touchObject.swipeLength = l), t = r.swipeDirection(), void 0 !== e.originalEvent && r.touchObject.swipeLength > 4 && (r.swiping = !0, e.preventDefault()), s = (r.options.rtl === !1 ? 1 : -1) * (r.touchObject.curX > r.touchObject.startX ? 1 : -1), r.options.verticalSwiping === !0 && (s = r.touchObject.curY > r.touchObject.startY ? 1 : -1), o = r.touchObject.swipeLength, r.touchObject.edgeHit = !1, r.options.infinite === !1 && (0 === r.currentSlide && "right" === t || r.currentSlide >= r.getDotCount() && "left" === t) && (o = r.touchObject.swipeLength * r.options.edgeFriction, r.touchObject.edgeHit = !0), r.options.vertical === !1 ? r.swipeLeft = i + o * s : r.swipeLeft = i + o * (r.$list.height() / r.listWidth) * s, r.options.verticalSwiping === !0 && (r.swipeLeft = i + o * s), r.options.fade !== !0 && r.options.touchMove !== !1 && (r.animating === !0 ? (r.swipeLeft = null, !1) : void r.setCSS(r.swipeLeft))))
  }, i.prototype.swipeStart = function(e) {
    var i, t = this;
    return t.interrupted = !0, 1 !== t.touchObject.fingerCount || t.slideCount <= t.options.slidesToShow ? (t.touchObject = {}, !1) : (void 0 !== e.originalEvent && void 0 !== e.originalEvent.touches && (i = e.originalEvent.touches[0]), t.touchObject.startX = t.touchObject.curX = void 0 !== i ? i.pageX : e.clientX, t.touchObject.startY = t.touchObject.curY = void 0 !== i ? i.pageY : e.clientY, void(t.dragging = !0))
  }, i.prototype.unfilterSlides = i.prototype.slickUnfilter = function() {
    var e = this;
    null !== e.$slidesCache && (e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.appendTo(e.$slideTrack), e.reinit())
  }, i.prototype.unload = function() {
    var i = this;
    e(".slick-cloned", i.$slider).remove(), i.$dots && i.$dots.remove(), i.$prevArrow && i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.remove(), i.$nextArrow && i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.remove(), i.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
  }, i.prototype.unslick = function(e) {
    var i = this;
    i.$slider.trigger("unslick", [i, e]), i.destroy()
  }, i.prototype.updateArrows = function() {
    var e, i = this;
    e = Math.floor(i.options.slidesToShow / 2), i.options.arrows === !0 && i.slideCount > i.options.slidesToShow && !i.options.infinite && (i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === i.currentSlide ? (i.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - i.options.slidesToShow && i.options.centerMode === !1 ? (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - 1 && i.options.centerMode === !0 && (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
  }, i.prototype.updateDots = function() {
    var e = this;
    null !== e.$dots && (e.$dots.find("li").removeClass("slick-active").end(), e.$dots.find("li").eq(Math.floor(e.currentSlide / e.options.slidesToScroll)).addClass("slick-active"))
  }, i.prototype.visibility = function() {
    var e = this;
    e.options.autoplay && (document[e.hidden] ? e.interrupted = !0 : e.interrupted = !1)
  }, e.fn.slick = function() {
    var e, t, o = this,
      s = arguments[0],
      n = Array.prototype.slice.call(arguments, 1),
      l = o.length;
    for (e = 0; e < l; e++)
      if ("object" == typeof s || "undefined" == typeof s ? o[e].slick = new i(o[e], s) : t = o[e].slick[s].apply(o[e].slick, n), "undefined" != typeof t) return t;
    return o
  }
}),
function(e) {
  var i = {
      common: {
        init: function() {
          function i() {
            function i(i, t) {
              i.each(function() {
                var i, l = e(this).offset().top;
                i = l < s ? o : n - l, n > l && e(this).css({
                  transform: "translateY(-" + i / t + "%)"
                })
              })
            }
            var t = e(window),
              o = t.scrollTop(),
              s = t.height(),
              n = o + s,
              l = e(".parallax-decor");
            i(l, 45)
          }

          function t() {
            e(".vc_toggle_title").on("click", function() {
              var i = e(this),
                t = i.closest(".vc_toggle"),
                o = t.find(".vc_toggle_content");
              t.hasClass("vc_toggle_active") ? o.slideUp({
                duration: 300,
                complete: function() {
                  t.removeClass("vc_toggle_active")
                }
              }) : o.slideDown({
                duration: 300,
                complete: function() {
                  t.addClass("vc_toggle_active")
                }
              })
            })
          }
          var o = document.querySelector("body");
          e(window).load(function() {
            e(".pre-loader").fadeOut("slow")
          }), e(".back-link").on("click", function(e) {
            e.preventDefault(), history.back()
          }), e("#skip-to-content").click(function(i) {
            var t = "#" + this.href.split("#")[1];
            e(t).attr("tabindex", -1).on("blur focusout", function() {
              e(this).removeAttr("tabindex")
            }).focus()
          });
          var s = (function() {
              function e() {
                return window.pageYOffset || document.documentElement.scrollTop
              }

              function i() {
                var i = e();
                i > n ? o.classList.add("scroll-triggered") : o.classList.remove("scroll-triggered"), s = !1
              }

              function t() {
                window.addEventListener("load", i), window.addEventListener("scroll", function(e) {
                  s || (s = !0, i())
                }, !1)
              }
              var s = !1,
                n = 0;
              t()
            }(), document.querySelector("#mobile-nav")),
            n = document.querySelector("#mobile-nav-icon");
          if (n && n.addEventListener("click", function() {
              o.classList.toggle("mobile-nav-open")
            }), s && s.addEventListener("click", function(i) {
              i.target === this && (n.classList.toggle("opened"), e("#nav-toggle").prop("checked", !1))
            }), e(".open-popup-link").magnificPopup({
              type: "inline",
              midClick: !0
            }), e(".modal_video").magnificPopup({
              disableOn: 700,
              type: "iframe",
              mainClass: "mfp-fade",
              removalDelay: 160,
              preloader: !1,
              fixedContentPos: !1
            }), e(".video-modal").length) {
            var l = "&nbsp;",
              r = e(".video-modal"),
              a = r.data("caption");
            a && a.length && (l = r.data("caption")), e(".video-modal").magnificPopup({
              type: "iframe",
              iframe: {
                markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe><div class="mfp-title">' + l + "</div></div>"
              },
              callbacks: {
                markupParse: function(e, i, t) {
                  i.title = t.el.attr("title")
                }
              }
            })
          }
          var d = e("#main-content iframe");
          d.each(function() {
            e(this).attr("src").includes("youtube") && e(this).wrap('<div class="iframe-wrap"></div>')
          });
          var c = document.querySelector(".masthead"),
            p = document.querySelector(".placeholder-overlay");
          if (c && p) {
            var u = new Image;
            u.src = c.dataset.imageSrc, u.onload = function() {
              p.classList.add("fade-out"), c.style.backgroundImage = "url(" + u.src + ")"
            }
          }
          e('a[href*="#"]:not([href="#"])').click(function(i) {
            if (location.pathname.replace(/^\//, "") === this.pathname.replace(/^\//, "") && location.hostname === this.hostname) {
              var t = e(this.hash),
                o = this,
                s = e("header.banner"),
                n = e("#wpadminbar"),
                l = parseInt(s.outerHeight()) - parseInt(s.css("padding-top").replace("px", "")) + parseInt(n.outerHeight());
              t = t.length ? t : e("[name=" + this.hash.slice(1) + "]"), t.length && (e("html,body").animate({
                scrollTop: t.offset().top - l
              }, 500, function() {
                history.pushState ? history.pushState(null, null, o.hash) : location.hash = o.hash
              }), i.preventDefault())
            }
          });
          var h = e(".ticker");
          if (h.length && h.counterUp({
              time: 700
            }), e(".visceral-slider").length > 0) {
            var f = e(".visceral-slider > .wpb_column > .vc_column-inner > .wpb_wrapper");
            f.slick({
              slide: ".visceral-slider > .wpb_column > .vc_column-inner > .wpb_wrapper > *",
              autoplay: !1,
              autoplaySpeed: 4e3,
              infinite: !0,
              centerMode: !0,
              centerPadding: "0px",
              cssEase: "linear",
              slidesToShow: 1,
              slidesToScroll: 1,
              swipeToSlide: !0,
              dots: !0,
              arrows: !1,
              fade: !0,
              mobileFirst: !0,
              prevArrow: '<button type="button" class="slick-prev"><span class="icon icon-arrow-left"></span><span class="screen-reader-text">Previous</span></button>',
              nextArrow: '<button type="button" class="slick-next"><span class="icon icon-arrow-right"></span><span class="screen-reader-text">Next</span></button>'
            })
          }
          if (e(".img-hexagon--parallax").length > 0 && e(".img-hexagon--parallax").each(function() {
              e(this).append('<div class="parallax-decor"></div>')
            }), window.innerWidth > 768 && e(window).scroll(i), e(".sub-nav").length > 0) {
            var v = e(".sub-nav__menu a"),
              w = e("#main-content");
            v.each(function() {
              $path = e(this)[0].pathname, $path === window.location.pathname && e(this).addClass("active")
            }), v.click(function(o) {
              o.preventDefault();
              var s = e(this).attr("href"),
                n = e(this);
              e.ajax({
                url: s,
                beforeSend: function() {
                  w.addClass("loading"), e(".sub-nav__menu a").removeClass("active"), n.addClass("active")
                },
                success: function(o) {
                  o = e.parseHTML(o), ajaxReplacement = e(o).find("#main-content").contents(), w.empty(), w.html(ajaxReplacement), window.history.pushState("object or string", "Title", s), e(".img-hexagon--parallax").length > 0 && e(".img-hexagon--parallax").each(function() {
                    e(this).append('<div class="parallax-decor"></div>')
                  }), window.innerWidth > 768 && e(window).scroll(i), t()
                },
                complete: function() {
                  w.removeClass("loading")
                }
              })
            })
          }
        },
        finalize: function() {}
      },
      home: {
        init: function() {
          var i = e("#quotes-slider");
          i.slick({
            autoplay: !0,
            autoplaySpeed: 8e3,
            infinite: !0,
            centerMode: !0,
            centerPadding: "0px",
            slidesToShow: 1,
            slidesToScroll: 1,
            swipeToSlide: !0,
            dots: !0,
            arrows: !1,
            fade: !0,
            mobileFirst: !0
          });
          var t = e("#featured_posts_slider");
          t.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            swipeToSlide: !0,
            dots: !0,
            arrows: !1,
            fade: !0
          });
          var o = e("#bgndVideo");
          o.YTPlayer()
        },
        finalize: function() {}
      },
      who_we_are: {
        init: function() {
          e("#main-content").append('<div id="bio-modal" class="modal"><div id="hidden-scrollbar"><i id="modal-close" class="" title="Close">Close</i><div class="modal-content container"><div id="ajax-results"></div></div></div></div>');
          var i = document.getElementById("bio-modal"),
            t = e(".list-item-person");
          if (t.length) {
            var o = document.getElementById("hidden-scrollbar"),
              s = document.getElementById("modal-close"),
              n = e("#ajax-results"),
              l = {};
            if (s.onclick = function() {
                i.classList.remove("visible"), e("body").css({
                  overflow: "scroll"
                }), n.empty(), history.pushState("", document.title, window.location.pathname)
              }, window.onclick = function(e) {
                e.target === o && (i.classList.remove("visible"), n.empty(), history.pushState("", document.title, window.location.pathname))
              }, t.on("click", function(t) {
                t.preventDefault(), i.classList.add("visible"), e("body").css({
                  overflow: "hidden"
                });
                var o = this.dataset.slug,
                  s = e(this).attr("href");
                history.pushState(null, null, "#" + o), l[o] ? n.html(l[o]) : e.ajax({
                  url: s,
                  dataType: "html",
                  beforeSend: function() {
                    i.classList.add("loading")
                  },
                  complete: function() {
                    i.classList.remove("loading")
                  },
                  success: function(i) {
                    response = e(i).find("#main-content"), n.html(response), l[o] = response
                  }
                })
              }), window.location.hash) {
              var r = window.location.hash.slice(1),
                a = e("[data-slug='" + r + "']");
              if (a.length) {
                var d = e(a).attr("href");
                i.classList.add("visible"), e("body").css({
                  overflow: "hidden"
                }), e.ajax({
                  url: d,
                  dataType: "html",
                  success: function(i) {
                    response = e(i).find("#main-content"), n.html(response), l[r] = response
                  }
                })
              }
            }
          }
        }
      },
      single_fellow: {
        init: function() {
          var i = e("#fellow_highlight_slider");
          i.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            swipeToSlide: !0,
            dots: !0,
            arrows: !1,
            fade: !0
          })
        }
      },
      email_updates: {
        init: function() {
          function e() {
            var e = {};
            if (0 == location.search.length) return e;
            for (var i = location.search.substring(1).split("&"), t = 0; t < i.length; t++) {
              var o = i[t].split("=");
              e[decodeURIComponent(o[0])] = decodeURIComponent(o[1])
            }
            return e
          }
          var i = e();
          i.email && (document.getElementById("mce-EMAIL").value = i.email)
        }
      }
    },
    t = {
      fire: function(e, t, o) {
        var s, n = i;
        t = void 0 === t ? "init" : t, s = "" !== e, s = s && n[e], s = s && "function" == typeof n[e][t], s && n[e][t](o)
      },
      loadEvents: function() {
        t.fire("common"), e.each(document.body.className.replace(/-/g, "_").split(/\s+/), function(e, i) {
          t.fire(i), t.fire(i, "finalize")
        }), t.fire("common", "finalize")
      }
    };
  e(document).ready(t.loadEvents)
}(jQuery);
//# sourceMappingURL=main.js.map
