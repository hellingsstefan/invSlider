/* MAIN.JS */
/*jslint vars: true, devel: true */
/*global $: false */

$(document).ready(function(){

    // Content Slider
    $('.inv-slider').invSlider({ 
        auto: false,
        pager: true,
        prevControl: '#prev',
        nextControl: '#next',
        pagerContainer: '#pager-container, .pager'
    }).addClass('chainabilityMaintained');

    $('.img-slider').invSlider({
        pause: true
    });

    $('.img-slider2').invSlider({
        transitionClass: 'inv-slider-custom',
        prevClass: 'inv-slider-prev',
        nextClass: 'inv-slider-next'
    });

});