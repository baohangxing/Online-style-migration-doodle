$(function () {
    "use strict"
     //animation scroll js

 $('nav a').on('click', function () {
  if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
          $('html, body').animate({
              scrollTop: target.offset().top - 50
          }, 1000);
          return false;
      }
  }
});

    //About part slider
   

    $('.slider_about').slick({
        arrows: false,
        dots: true,
        autoplay: true,
        autoplaySpeed: 2000,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,

        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
    },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
    },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
    }

  ]

    });

  //   ////doodle slider js
  //
  //   $('.course-slider').slick({
  //       infinite: true,
  //       prevArrow: '<i class="fa fa-angle-left doodle-left_arrow"></i>',
  //       nextArrow: '<i class="fa fa-angle-right doodle-right_arrow"></i>',
  //       slidesToShow: 1,
  //       centerMode: false,
  //       centerPadding: false,
  //       slidesToScroll: 1,
  //       autoplay: false,
  //       autoplaySpeed: 2000,
  //       speed: 1000,
  //
  //       responsive: [
  //           {
  //               breakpoint: 1024,
  //               settings: {
  //                   slidesToShow: 1,
  //                   slidesToScroll: 1,
  //                   infinite: true,
  //                   dots: true
  //               }
  //   },
  //           {
  //               breakpoint: 600,
  //               settings: {
  //                   slidesToShow: 1,
  //                   slidesToScroll: 1
  //               }
  //   },
  //           {
  //               breakpoint: 480,
  //               settings: {
  //                   slidesToShow: 1,
  //                   slidesToScroll: 1
  //               }
  //   }
  //
  // ]
  //
  //   });


    /// steps slider js

    $('.test_full_slider').slick({
        arrows: true,
        dots: false,
        autoplay: false,
        autoplaySpeed: 2000,
        prevArrow: '<i class="fa fa-angle-left test-left_arrow"></i>',
        nextArrow: '<i class="fa fa-angle-right test-right_arrow"></i>',
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
    },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
    },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
    }

  ]

    });


    /// back to top
    var bTtop=$(".back_to_top");
    $(window).on('scroll', function(){
         var baktop = $(window).scrollTop();
        
        if(baktop >200){
            bTtop.fadeIn(1000);
            
        }
        else{
           bTtop.fadeOut(500);
        }
        
    });
    
    bTtop.on('click', function(){
        $('html, body').animate({
            scrollTop:0,
        }, 1000)
        
    });

    // go home
    var gohome=$(".home");
    gohome.on('click', function(){
        $('html, body').animate({
            scrollTop:0,
        }, 1000)

    });

    // go about
    var goabout=$(".about");
    goabout.on('click', function(){
        $('html, body').animate({
            scrollTop:700,
        }, 1000)

    });

    // go steps
    var gosteps=$(".steps");
    gosteps.on('click', function(){
        $('html, body').animate({
            scrollTop:1530,
        }, 1000)

    });

    // stciky menu
	var nav=$(".navbar");
    $(window).scroll(function(){
        
        var fixmenu = $(this).scrollTop();

        if(fixmenu > 185){
            nav.addClass("menu_fix");
        }
        else{
            nav.removeClass("menu_fix");
        }  
        
    });

    
    /// =============about part page js start here ==========
    
    // venobox video js
    
    $('.venobox').venobox({
        framewidth: '650px',        
        frameheight: '400px',
        paddingTop:'500px'
    }); 
    


});
