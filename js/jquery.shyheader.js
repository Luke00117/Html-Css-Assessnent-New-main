document.addEventListener('DOMContentLoaded', function () {

    (function ($, window, document, undefined) {

        "use strict";

        $.shyheader = function (el, options) {
            var base = this;

            base.$el = $(el);
            base.el = el;

            base.$el.data('shyheader', base);

            var IS_SCROLLING = false;
            var SCROLL = 0;
            var OLD_OFFSET = 0;
            var CURRENT_OFFSET = 0;
            var DELTA = 5;
            var HEADER_HEIGHT = 0;
            var TRIGGER_POINT = 500;
            var BODY = "";
            var INITIAL_SCROLL_DONE = false;

            base.initialize = function () {
                base.options = $.extend({}, $.shyheader.defaultOptions, options);

                HEADER_HEIGHT = base.$el.outerHeight(true);

                if (base.options.offsetElementId) {
                    var offsetElement = document.getElementById(base.options.offsetElementId);
                    if (offsetElement) {
                        HEADER_HEIGHT = offsetElement.offsetHeight;
                        base.options.offsetContentFlag = true;
                        $("#content").css("padding-top", HEADER_HEIGHT + "px");
                    } else {
                        console.error("Element with ID " + base.options.offsetElementId + " not found.");
                    }
                }

                window.addEventListener("scroll", base.triggerScroll, false);
            };

            base.triggerScroll = function () {
                IS_SCROLLING = true;
                SCROLL = document.body.scrollTop || window.pageYOffset;

                if (!INITIAL_SCROLL_DONE) {
                    INITIAL_SCROLL_DONE = true;
                    return;
                }

                base.checkScrollPosition();
            };

            base.checkScrollPosition = function () {
                if (base.options.offsetContentFlag) {
                    if (SCROLL >= TRIGGER_POINT && SCROLL >= HEADER_HEIGHT) {
                        base.watch();
                    }
                } else {
                    if (SCROLL >= TRIGGER_POINT) {
                        base.watch();
                    }
                }
            };

            base.watch = function () {
                if (IS_SCROLLING) {
                    base.getDirection();
                    IS_SCROLLING = false;
                }
            };

            base.getDirection = function () {
                CURRENT_OFFSET = SCROLL;

                if (Math.abs(OLD_OFFSET - CURRENT_OFFSET) <= DELTA) {
                    return;
                }

                if (CURRENT_OFFSET > OLD_OFFSET) {
                    base.$el.addClass(base.options.classname);
                } else {
                    if (CURRENT_OFFSET + $(window).height() < $(document).height()) {
                        base.$el.removeClass(base.options.classname);
                    }
                }

                OLD_OFFSET = CURRENT_OFFSET;
            };

            base.initialize();
        };

        $.shyheader.defaultOptions = {
            classname: "is-watching",
            offsetElementId: null,
            offsetContentFlag: false
        };

        $.fn.shyheader = function (options) {
            return this.each(function () {
                var shyheader = new $.shyheader(this, options);
            });
        };

    }(jQuery, window, document));

    $("#shy-header").shyheader({
        classname: "is-watching",
        offsetElementId: 'shy-header'
    });

});