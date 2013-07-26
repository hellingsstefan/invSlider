/* Inventis Content Slider */
/* Author: Stefan */
    
// // Overwrite default settings with new settings
// var settings = $.extend({
//     auto: false
// }, options);

;(function( $ ) {
    
    // Create the defaults once
    var pluginName = 'invSlider',
        defaults = {
            propertyName: 'value',
            currentSlide: 0
        };

    // The plugin constructor
    function Plugin( element, options ) {

        this.element = element;
        this._defaults = defaults;
        this._name = pluginName;

        // Set variables before anything else
        slider                  = $(this.element),
        slider.slide            = slider.children(),
        slider.numberOfSlides   = $(slider.slide).length;
    
        // Set current slide
        this.setCurrent();
        $(slider.slide).addClass('inv-slide');
        // this.init( options );

        // Add class to element
        this.element.addClass('inv-slider');

        // If no options are given, stop here
        if ( options.length === 0 ) {
            return;
        }
        
        // Method calling logic
        // Check if options is a method,
        // else check if options are settings
        if ( this[options[0]] ) {
            // Call the function with the remaining parameters
            this[options[0]]( Array.prototype.slice.call( options, 1 ) );
        } else if ( typeof( options[0] ) === 'object' || !options ) {
            // Extend the defaults with these options
            this._defaults = $.extend( defaults, options[0] );
        } else {
            var msg = 'Method ' + options[0] + ' does not exist in jQuery.' + pluginName + '. '+
                      'Please set a correct method or specify the correct settings.';

            alert( msg );
        }
    }

    // All methods
    Plugin.prototype = {

        init: function( options ) {
            console.log('init fired');

            // Set variables before anything else
            slider                  = $(this.element),
            slider.slide            = slider.children(),
            slider.numberOfSlides   = $(slider.slide).length;
        
            // Set current slide
            this.setCurrent();
            $(slider.slide).addClass('inv-slide');
        },

        setCurrent: function( current ) {
            console.log('setCurrent fired');
            console.log('recieving '+current);

            // Set default parameters
            current = typeof current !== 'undefined' ? current : defaults.currentSlide;
            slider.currentSlide = current;
            console.log('setting current slide to: ');
            console.log(slider.currentSlide);

            // Remove 'current' from other slides
            $(slider.slide).each(function(){
                $(this).removeClass('current')
            });
            // Give current slide the class 'current'
            $(slider.slide[current]).addClass('current');
            this.setPrevNext();
        },

        setPrevNext: function() {
            console.log('setPrevNext fired');
            
            // Check if the currentSlide isn't set to high/low
            if ( slider.currentSlide > slider.numberOfSlides  || slider.currentSlide < 0 ) {
                var msg = 'The current slide is set out of range! There are only '+slider.numberOfSlides+' '+
                          'slides and you set the current slide to '+slider.currentSlide+'. '+
                          'Please set a value within the correct range!';

                alert( msg );
            } else {
                // Calculate the next and previous slide
                slider.prevSlide = ( (slider.currentSlide-1) < 0 ? slider.numberOfSlides : slider.currentSlide-1 );
                slider.nextSlide = ( (slider.currentSlide+1) > slider.numberOfSlides-1 ? 0 : slider.currentSlide+1 );
                console.log('prev slide: '+slider.prevSlide);
                console.log('next slide: '+slider.nextSlide);
            }
        },

        showNextSlide: function() {
            console.log('showNextSlide fired');

            $(slider.slide[slider.currentSlide]).removeClass('current');
            $(slider.slide[slider.nextSlide]).addClass('current');
            console.log('Sending '+slider.nextSlide+' to setCurrent');
            this.setCurrent(slider.nextSlide);
        }
    };

    // Plugin wrapper around the constructor
    $.fn[pluginName] = function () {
        //new Plugin(this, arguments);
        $.data(this, "plugin_" + pluginName, new Plugin( this, arguments ));
        
        // Return the element to maintain jQuery chainability
        return this;
    };

})( jQuery );