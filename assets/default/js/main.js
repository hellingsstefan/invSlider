/*jslint vars: true, devel: true */
/*global $: false */

$(document).ready(function(){

    // var event_listener = Modernizr.touch ? 'touchstart' : 'click';

    // Content Slider
    $('.inv-slider').invSlider({ 
        auto: false,
        pager: true,
        pagerContainer: '#pagerContainer'
    }).addClass('chainabilityMaintained');
    
    $('.inv-slider2').invSlider({
        auto: true,
        pager: true,
        prevControl: '.prev',
        nextControl: '.next'
    });

});