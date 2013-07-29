/* Inventis Content Slider
 * v1
 * Author: Stefan
 * http://inventis.be/
 */

(function ($, window, i) {

    $.fn.invSlider = function (options) {

        var test = 0;

        // Default settings
        var settings = $.extend({
            auto: true,                             // Boolean: Animate automatically, true or false
            speed: 1000,                            // Integer: Speed of the transition, in milliseconds
            timeout: 4000,                          // Integer: Time between slide transitions, in milliseconds
            pager: false,                           // Boolean: Show pager, true or false
            pause: false,                           // Boolean: Pause on hover, true or false
            pagerContainer: '',                     // Selector: Where auto generated pager should be appended to, default is after the slider
            prevControl: '',                        // Selector: Declare previous slide trigger
            nextControl: '',                        // Selector: Declare next slide trigger
            transitionClass: 'inv-slider-visible',  // Selector: Declare a css transition class to use (default 'inv-slider-visible')
            prevClass: '',                          // Selector: Declare a css transition class to for previous item
            nextClass: '',                          // Selector: Declare a css transition class to for next
            before: $.noop,                         // Function: Before callback
            after: $.noop                           // Function: After callback
        }, options);

        // Check if Modernizr plugin is installed
        if (typeof Modernizr != 'undefined') {
            // Detect transition & touch support
            // Make sure Modernizr has -touch and -csstransitions in it!
            var supportsTransitions = Modernizr.csstransitions,
                event_listener = Modernizr.touch ? 'touchstart' : 'click';
        } else {
            console.log('Modernizr plugin missing!');
            var supportsTransitions = false,
                event_listener = 'click';
        }

        return this.each( function () {

            var $this = $(this), // This slider

            // LOCAL VARIABLES
            prefix = 'inv-slider',
            customControllers = new Array(settings.prevControl, settings.nextControl),

            // HELPERS
            $slide = $this.children(),
            length = $slide.length,
            currentIndex = 0,
            prevIndex = length > 1 ? length - 1 : 0,
            nextIndex = length > 1 ? currentIndex + 1 : 0,
            $pager = $('<ul class="'+prefix+'-pager">'),
            rotate,

            // METHODS:
            // Set Previous and Next slide index
            setPrevNextIndex = function (index) {
                prevIndex = index - 1 < 0 ? length - 1 : index - 1;
                nextIndex = index + 1 < length ? index + 1 : 0;
            },

            // Slide to
            slideTo = function (index) {
                settings.before(index); // Pass index for possible use in called function

                currentIndex = index;
                setPrevNextIndex(index);

                // If CSS3 transitions are supported
                if (supportsTransitions) {
                    $slide
                        .removeClass(settings.transitionClass + ' ' + settings.prevClass + ' ' + settings.nextClass)
                        .eq(index)
                        .addClass(settings.transitionClass)
                        .end()
                        .eq(prevIndex)
                        .addClass(settings.prevClass)
                        .end()
                        .eq(nextIndex)
                        .addClass(settings.nextClass);

                    setTimeout(function () {
                        settings.after(index);
                    }, settings.speed);

                // If not, use jQuery fallback
                } else {
                    $slide
                        .stop()
                        .fadeOut(settings.speed, function () {
                            $(this).removeClass(settings.transitionClass);
                        })
                        .eq(index)
                        .fadeIn(settings.speed, function () {
                            $(this).addClass(settings.transitionClass);
                                    
                            settings.after(index); // Pass index for possible use in called function
                        });
                }
                
                if (settings.pager) {
                    updatePager(index);
                }
            },

            // Start cycle
            startCycle = function () {
                rotate = setInterval(function () {
                    // Clear the event queue
                    $slide.stop(true, true);

                    slideTo(nextIndex);
                }, settings.timeout);
            },

            // Restarting cycle
            restartCycle = function () {
                if (settings.auto) {
                    // Stop
                    clearInterval(rotate);
                    // Restart
                    startCycle();
                }
            };

            // Update pager method only used if there is a pager
            updatePager = function (index) {
                $pager
                    .parents('li')
                    .removeClass(prefix+'-pager-active')
                    .eq(index)
                    .addClass(prefix+'-pager-active');
            };

            // Give this slider the inv-slider css class
            $this
                .addClass(prefix);

            // Hide all slides, then show first one
            $slide
                .eq(0)
                .addClass(settings.transitionClass)
                .end()
                .eq(prevIndex)
                .addClass(settings.prevClass)
                .end()
                .eq(nextIndex)
                .addClass(settings.nextClass);

            // Only run if there's more than one slide
            if (length > 1 && settings.auto) {
                // Make sure the timeout is at least 100ms longer than the transition
                if (settings.timeout < settings.speed + 100) {
                    return;
                }
                // Init cycle
                startCycle();
            }

            // Bind custom controllers (prev, next)
            $(customControllers).each(function (index, el) {
                // Bind event to selector
                $(el).on(event_listener, function (e) {
                    e.preventDefault();
                    // Slide to prev/next slide
                    slideTo( (index === 0 ? prevIndex : nextIndex) );
                });
            });

            // Generate pager
            if (settings.pager) {
                var tabs = '';
                for ( var i = 1 ; i <= length ; i++ )  {
                    tabs += '<li><a href="#"><span>' + i + '</span></a></li>';
                }
                $pager.append(tabs);

                // Bind keys of pager
                var keys = $pager.find('a');
                $(keys).each(function (index, el) {
                    // Bind event to selector
                    $(el).on(event_listener, function (e) {
                        e.preventDefault();
                        // Slide to
                        slideTo( index );
                    });
                });

                // Set correct tab to active
                updatePager(currentIndex);
                
                if (settings.pagerContainer) {
                    $(settings.pagerContainer).append($pager);
                } else {
                    $this.after($pager);
                }
            }

            // Pause on hover
            if (settings.pause) {
                $this.hover(function () {
                    clearInterval(rotate);
                }, function () {
                    restartCycle();
                });
            }

        });

    };

})(jQuery, this, 0);