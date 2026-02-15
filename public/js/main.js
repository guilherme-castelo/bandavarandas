/*  ---------------------------------------------------
    Template Name: Dreams
    Description: Dreams wedding template
    Author: Colorib
    Author URI: https://colorlib.com/
    Version: 1.0
    Created: Colorib
---------------------------------------------------------  */

'use strict';

(function ($) {

    /*------------------
        Ao carregar o app (evento customizado)
    --------------------*/
    $(window).on('app:ready', function () {
        initPreloader();
        initHeroSlider();
        initSlickNav();
        initBackgrounds();
        initPortfolio();
        initPopups();
        initCounters();
    });

    /*------------------
        Preloader
    --------------------*/
    function initPreloader() {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");
    }

    /*------------------
        Background Set
    --------------------*/
    function initBackgrounds() {
        $('.set-bg').each(function () {
            var bg = $(this).data('setbg');
            if (bg) $(this).css('background-image', 'url(' + bg + ')');
        });
    }

    /*------------------
        Hero Slider
    --------------------*/
    function initHeroSlider() {
        if ($('.hero__slider').length > 0) {
            $('.hero__slider').owlCarousel({
                loop: true,
                dots: true,
                mouseDrag: false,
                animateOut: 'fadeOut',
                animateIn: 'fadeIn',
                items: 1,
                margin: 0,
                smartSpeed: 1200,
                autoHeight: false,
                autoplay: true,
            });

            var dot = $('.hero__slider .owl-dot');
            dot.each(function () {
                var index = $(this).index() + 1;
                if (index < 10) {
                    $(this).html('0').append(index);
                } else {
                    $(this).html(index);
                }
            });
        }
    }

    /*------------------
        Navigation
    --------------------*/
    function initSlickNav() {
        $(".mobile-menu").slicknav({
            prependTo: '#mobile-menu-wrap',
            allowParentLinks: true
        });
    }

    /*------------------
        Portfolio Logic
    --------------------*/
    function initPortfolio() {
        // Masonry
        if ($('.work__gallery').length > 0) {
            $('.work__gallery').masonry({
                itemSelector: '.work__item',
                columnWidth: '.grid-sizer',
                gutter: 10
            });
        }

        // Filter & MixItUp
        $('.portfolio__filter li').on('click', function () {
            $('.portfolio__filter li').removeClass('active');
            $(this).addClass('active');

            // Logic for custom pagination or filtering if needed
            // But MixItUp handles filtering.
        });

        if ($('.portfolio__gallery').length > 0) {
            var containerEl = document.querySelector('.portfolio__gallery');
            var mixer = mixitup(containerEl, {
                load: {
                    filter: '.mix' // Ensure this matches default filter
                },
                animation: {
                    duration: 400   // shorter duration for snappier feel
                }
            });
        }
    }

    /*------------------
        Popups
    --------------------*/
    function initPopups() {
        $('.video-popup').magnificPopup({
            type: 'iframe'
        });

        // Generic image popup class
        $('.image-popup').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0, 2]
            },
            mainClass: 'mfp-fade',
            removalDelay: 300,
            closeOnContentClick: true,
            closeBtnInside: false,
            zoom: {
                enabled: true,
                duration: 300
            }
        });
    }

    /*------------------
        Counter
    --------------------*/
    function initCounters() {
        $('.counter_num').each(function () {
            $(this).prop('Counter', 0).animate({
                Counter: $(this).text()
            }, {
                duration: 4000,
                easing: 'swing',
                step: function (now) {
                    $(this).text(Math.ceil(now));
                }
            });
        });
    }

})(jQuery);