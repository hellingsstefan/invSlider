#invSlider plugin
----

##This plugin requires:
- [jQuery](http://api.jquery.com/)
- [Modernizr (with -touch and -csstransition options)](http://modernizr.com/download/#-csstransitions-touch)
- The invSlider CSS file

##Features:
- Performant: Uses css transitions
- jQuery fallback for bad/old browsers
- Multiple instances possible
- Set Custom controllers if so desired
- Easy to use

##Basic usage:
###Include the required scripts:
```html
<!-- invSlider css -->
<link rel="stylesheet" href="css/main.css" />

<!-- jQuery -->
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script>window.jQuery || document.write('<script src="/assets/default/js/vendor/jquery-1.9.1.min.js">\x3C/script>')</script>

<!-- invSlider -->
<script src="js/invSlider.min.js"></script>
```

###HTML Markup
```html
    <div class="my-slider">
        
        <div>
            [...]
        </div>

        <section>
            [...]
        </section>

        <img src="http://placehold.it/200x80" width="200" height="80" alt="Placeholder image">

    </div>
```

The HTML markup does not realy matter, every direct child inside the slider becomes a slide.


###jQuery:
```javascript
$('.my-slider').invSlider();
```

##Options:
```javascript
$('.my-slider').invSlider({
    auto: true,             // Animate automatically, true or false
    speed: 1000,            // Speed of the transition, in milliseconds (Be sure your css has the same value)
    timeout: 4000,          // Time between slide transitions, in milliseconds
    pager: false,           // Show pager, true or false
    pagerContainer: '',     // Where auto generated pager should be appended to, default is after the slider
    prevControl: '',        // Declare previous slide trigger
    nextControl: '',        // Declare next slide trigger
    before: $.noop,         // Before callback
    after: $.noop           // After callback
});
```