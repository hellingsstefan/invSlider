/* Inventis Content Slider
 * v1
 * Author: Stefan
 * http://inventis.be/
 */

(function ($, window, i) {

    $.fn.invSlider = function (options) {

        // Default settings
        var settings = $.extend({
            auto: true,             // Boolean: Animate automatically, true or false
            speed: 1000,            // Integer: Speed of the transition, in milliseconds
            timeout: 4000,          // Integer: Time between slide transitions, in milliseconds
            pager: false,           // Boolean: Show pager, true or false
            pagerContainer: '',     // Selector: Where auto generated pager should be appended to, default is after the slider
            prevControl: '',        // Selector: Declare previous slide trigger
            nextControl: '',        // Selector: Declare next slide trigger
            before: $.noop,         // Function: Before callback
            after: $.noop           // Function: After callback
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
            customControllers = new Array(settings.prevControl, settings.nextControl),

            // HELPERS
            $slide = $this.children(),
            length = $slide.length,
            fadeTime = settings.speed,
            waitTime = settings.timeout,
            currentIndex = 0,
            prevIndex = length > 1 ? length - 1 : 0,
            nextIndex = length > 1 ? currentIndex + 1 : 0,
            $pager = '',

            // METHODS:
            // Set Previous and Next slide index
            setPrevNextIndex = function () {
                prevIndex = currentIndex - 1 < 0 ? length - 1 : currentIndex - 1;
                nextIndex = currentIndex + 1 < length ? currentIndex + 1 : 0;
            },

            // Slide to
            slideTo = function (index) {
                settings.before(index); // Pass index for possible use in called function

                // If CSS3 transitions are supported
                if (supportsTransitions) {
                    $slide
                        .removeClass('inv-slider-visible')
                        .eq(index)
                        .addClass('inv-slider-visible');
                    
                    setTimeout(function () {
                        settings.after(index);
                    }, fadeTime);

                // If not, use jQuery fallback
                } else {
                    $slide
                        .stop()
                        .fadeOut(fadeTime, function () {
                            $(this).removeClass('inv-slider-visible');
                        })
                        .eq(index)
                        .fadeIn(fadeTime, function () {
                            $(this).addClass('inv-slider-visible');
                                    
                            settings.after(index); // Pass index for possible use in called function
                        });
                }
                
                currentIndex = index;
                setPrevNextIndex();
                if (settings.pager) {
                    updatePager(currentIndex);
                }
            },

            // Start cycle
            startCycle = function () {
                setInterval(function () {
                    // Clear the event queue
                    $slide.stop(true, true);

                    slideTo(nextIndex);
                }, waitTime);
            },

            // Update pager method only used if there is a pager
            updatePager = function (index) {
                $pager
                    .children()
                    .removeClass('inv-slider-pager-active')
                    .eq(index)
                    .addClass('inv-slider-pager-active');
            };

            // Give this slider the inv-slider css class
            $this
                .addClass('inv-slider');

            // Hide all slides, then show first one
            $slide
                .eq(0)
                .addClass('inv-slider-visible');

            // Only run if there's more than one slide
            if (length > 1 && settings.auto) {
                // Make sure the timeout is at least 100ms longer than the transition
                if (waitTime < fadeTime + 100) {
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

            if (settings.pager) {
                $pager = $('<ul class="inv-slider-pager">');
                var tabs = '';
                for ( var i = 1 ; i <= length ; i++ )  {
                    tabs += '<li><a href="#"><span>';
                    tabs += i;
                    tabs += '</span></a></li>';
                }
                $pager.append(tabs);

                // Set correct tab to active
                updatePager(currentIndex);

                if (settings.pagerContainer) {
                    $(settings.pagerContainer).append($pager);
                } else {
                    $this.after($pager);
                }

                // Bind keys of pager
                var keys = $pager.find('a');
                $(keys).each(function (index, el) {
                    // Bind event to selector
                    $(el).on(event_listener, function (e) {
                        e.preventDefault();
                        // Slide to prev/next slide
                        slideTo( (index) );
                    });
                });
            }

        });

    };

})(jQuery, this, 0);