// (function() {

//   var miniBagControl = $('.js-minibag, .js-minibag--view');
//   var miniBagClose = $('.o-minibag--close');
//   var miniBagAll = $('.o-minibag');
//   var clickCatcher = '<div id="js-clickcatcher-minibag" class="js-clickcatcher"></div>';
//   var miniBagActive = false;


//   function closeMiniBag(scope) {
//     $('html').removeClass("body--modal-open minibag--modal-open");
//     $(scope).parent().removeClass("open");
//     $('#js-clickcatcher-minibag').remove();
//     miniBagActive = false;
//   }

//   function openMiniBag(scope) {
//     if (!miniBagActive) {
//       $('html').addClass("body--modal-open minibag--modal-open");
//       $(scope).parent().addClass("open");
//       $('body').append(clickCatcher);
//       miniBagActive = true;
//     };
//   }



//   function delayWithClear(el, func) {
//     var timer;
//     var delay = 250;

//     $(el).hover(function() {
//       timer = setTimeout(function() {
//       // if (!window.isMobileOrTablet.matches) {
//         func(el);
//       // }
//       }, delay);
//     }, function() {
//       clearTimeout(timer);
//     });
//   }

//   delayWithClear(miniBagControl, openMiniBag);

//   // miniBagControl.on('click', function() {
//   //   if (window.isMobileOrTablet.matches) {
//   //     openMiniBag(miniBagControl);
//   //   }
//   // });

//   // miniBagClose.on('click', function(e) {
//   //   closeMiniBag(miniBagControl);
//   // });


//   $('body').on('mouseover', '#js-clickcatcher-minibag', function() {
//     console.log('mouseover minibag catcher');
//     if (!window.isMobileOrTablet.matches) {
//       delayWithClear($('#js-clickcatcher-minibag'), closeMiniBag(miniBagControl));

//       // closeMiniBag(miniBagControl);
//     }
//   });

//   $('body').on('touchstart', '#js-clickcatcher-minibag', function() {
//     console.log('touch minibag catcher');
//     if (window.isMobileOrTablet.matches) {
//       closeMiniBag(miniBagControl);
//     }
//   });

//   $('.modal-backdrop.in').on('mouseover', function() {console.log('x')});

//   $('body').on('click', '.modal-backdrop', function() {
//     console.log('click modal backdrop');
//   });




//   // $(document).ready(function() {
//   //   $(window).on('resize', _.debounce(function() {
//   //     if (miniBagActive === true) {
//   //       closeMiniBag(miniBagControl);
//   //     }
//   //   }, 250));
//   // });

// })();
