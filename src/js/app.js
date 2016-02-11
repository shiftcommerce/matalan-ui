var $body = $('body');
// console.log($body);



// ===========================
// Deckard (x-browser detection)
// ===========================
require("lodash");
// ===========================
// Deckard end
// ===========================



// ===========================
// Examples
// ===========================

// console.warn('Module 0');
// var module0 = require("./examples/module0");
// console.log( module0('Hello') );


// console.warn('Module 1');
// var module1 = require("./examples/module1");
// console.log('module1', module1);
// module1.incrementCounter();
// console.log(module1.incrementCounter());
// module1.multiply();
// console.log('x', module1.show());


// console.warn('Module 2');
// var module2 = require("./examples/module2");
// console.log('myPublicVar is ', module2().myPublicVar);
// module2().myPublicFunction('bar');


// ===========================
// deckard - xBrowser detections
// ===========================
require("./vendors/deckard");
// ===========================
// .. end
// ===========================



// ===========================
// custom setup detection for mobile or tablet
// - could be modified to work with deckard above
// ===========================
window.isMobileOrTablet = window.matchMedia("only screen and (max-width: 1025px)").matches;

$(document).ready(function() {
  $(window).on('resize', _.debounce(function() {
    window.isMobileOrTablet = window.matchMedia("only screen and (max-width: 1025px)").matches;
  }, 250));
});

console.log('isMobileOrTablet', window.isMobileOrTablet);

// true | false
// example simple throttled check
// $(window).on('resize', _.debounce(function() {
//   console.log('isMobileOrTablet', window.isMobileOrTablet)
// }));

// ===========================
// end setup detection for mobile or tablet
// ===========================



// ===========================
// pointer events polyfill
// ===========================


require("pepjs");
// pepjs added to bring some sensibility to ios touch events. to investigate buggy ipad behaviour yet.

// cross touch / mouse events are now available via
// pointermove:   pointer moves, similar to touchmove or mousemove.
// pointerdown:   pointer is activated, or a device button held.
// pointerup:     pointer is deactivated, or a device button released.
// pointerover:   pointer has moved onto an element.
// pointerout:    pointer is no longer on an element it once was.
// pointerenter:  pointer enters the bounding box of an element.
// pointerleave:  pointer leaves the bounding box of an element.
// pointercancel: pointer will no longer generate events.
//
// $('body').on('pointerdown', function(e){
//   alert(e.target);
// })

// ===========================
// end pointer events polyfill
// ===========================



// ===========================
// Tether
// http://github.hubspot.com/tether/
// ===========================

// current tooltip dependency checks for window.tether so we require it there
window.Tether = require("tether");

var tether;

var tetherTarget = $('.checkout-bag');
var tetherElement = $('.o-minibag-contain');

$('#minibag-contain').on('shown.bs.modal', function(e) {

  if (!window.isMobileOrTablet) {
    // for minibag click shower
    tether = new Tether({
      element: tetherElement,
      target: tetherTarget,
      attachment: 'top right',
      targetAttachment: 'bottom right'
    });
    tether.position();
  }
});

$('#minibag-contain').on('hidden.bs.modal', function(e) {
  if (tether !== undefined) {
    tether.disable();
  }

  $('#minibag-contain').attr('style', '');

});



// ===========================
// Tether end
// ===========================



// require("./modules/validation-tooltip");




// ===========================
// Common JS functions
// ===========================
require("./modules/general");
require("./dev/misc-dev");
require("./dev/pdp-dev");
require("./dev/mini-mybag-dev");
require("./dev/dev-dev");
require("./modules/star-ratings");
require("./modules/sizeguide.js");

// ===========================
// Common JS end
// ===========================


// ===========================
// Dropdown load - no init required
// ===========================
require("./modules/dropdown");
// ===========================
// Dropdown end
// ===========================



require("./vendors/jquery.scrollto");


if ($body.hasClass('page--storefinder')) {
  require("./modules/google-maps-init");
}



// ===========================
// Tabs
// ===========================

require("./modules/tabs-init");




// ===========================
// Tabs end
// ===========================




// ===========================
// accordion
// ===========================
require("./modules/collapse");

// open specific item example
// todo - currently issues with pre opening tabs this way - to investigate
// $('#collapseThree').collapse('show');

// open collapse examples
$(document).ready(function() {





  // $(window).on('resize', _.debounce(function() {
  //   if (!window.isMobileOrTablet) {
  //     //   // on resize, open if desktop
  //     //   $("#accordion2 [role='tabpanel']").each(function() {
  //     //     $(this).collapse('show');
  //     //   });

  //     // } else {
  //     //   // on resize, close if not desktop
  //     //   $("#accordion2 [role='tabpanel']").each(function() {
  //     //     $(this).collapse('hide');
  //     //   });

  //   }
  // }, 250));

  var pageBody = $('body');

  if (pageBody.hasClass('page--checkout-1')) {
    $('#billingAddressAccord').collapse('show');
  }

  if (pageBody.hasClass('page--checkout-2')) {
    $('#deliveryAddressAccord').collapse('show');
  }

  if (pageBody.hasClass('page--checkout-3')) {
    $('#deliveryMethodAccord').collapse('show');
  }


});


// ===========================
// accordion end
// ===========================





// ===========================
// Megamenu init
// ===========================
function megamenuInit() {
  var accessibleMegaMenu = require("./modules/menu-accessible");
  var parentNavMenu = $('[data-app="accessible-navmenu"]');

  parentNavMenu.accessibleMegaMenu({
    /* prefix for generated unique id attributes, which are required to indicate aria-owns, aria-controls and aria-labelledby */
    uuidPrefix: "accessible-menu",
    menuClass: "c-navbar",
    topNavItemClass: "navbar__top-item",
    panelClass: "sub-nav",
    panelGroupClass: "sub-nav-group",
    hoverClass: "hover",
    focusClass: "focus",
    openClass: "open"
  });
}


if (!window.isMobileOrTablet) {
  megamenuInit();
}


// ===========================
// Megamenu end
// ===========================

if (window.isMobileOrTablet) {
  require("./modules/off-canvas");
}


// modal temp


var BootstrapDialog = require("./vendors/bs-dialog");

$("[data-myacc='address-delete']").on('click', function(e) {

  var addressRef = $(this).parent().next('h5').text();

  BootstrapDialog.show({
    title: 'Confirm Delete',
    message: 'Are you sure you want to delete ' + addressRef + '?',
    closable: true,
    buttons: [{
      label: 'Cancel',
      cssClass: 'c-btn c-btn-primary',
      action: function(dialogRef) {
        dialogRef.close();
      }
    }, {
      id: 'delete-' + addressRef,
      label: 'Delete ' + addressRef,
      cssClass: 'c-btn c-btn-secondary',
      action: function(dialogRef) {
        dialogRef.close();
      }
    }]
  });

});



// ===========================
// Bootstrap components init
// ===========================

var Tooltip = require("./vendors/bootstrap/tooltip");
// console.warn(Tooltip.VERSION);


$(function() {
  $('[data-toggle="tooltip"]').tooltip();
})


require("./vendors/bootstrap/popover");

$(function() {
  $('[data-toggle="popover"]').popover();
});
var charLength = 0;
var showPopover = function() {
    $(this).val('');
    $(this).popover('show');
  },
  hidePopover = function() {
    charLength = 0;
    $(this).popover('hide');
  };

function wheretoplace() {
  var offset = $("#target").offset();
  if (width < 1000) return 'top';
  return 'right';
}

$('[data-validation="password"]').popover({
    trigger: 'manual',
    html: true,
    placement: function(context, source) {
      var offset = ($(window).width() - ($(source).offset().left + $(source).outerWidth()));
      console.log(offset);
      if (offset < 300) return 'top';
      return 'right';
    },
    content: function(context, source) {
      var thisId = $(source).attr('id');
      console.log(thisId);
      return "<p><strong>Passwords must use 3 of the below:</strong></p><ul class='o-list__validation'><li class='pass-check-1'>Must be 8 to 32 characters</li><li class='pass-check-2'>Must container upper and lowercase letters</li><li class='pass-check-3'>Must contain at least 1 number</li><li class='pass-check-4'>Must contain at least 1 special character</li></ul>"
    }
  })
  .focus(showPopover)
  .blur(hidePopover)
  .keyup(function() {

    if (this.value.length >= 8 && this.value.length <= 32) {
      $('.pass-check-1').addClass('success');
    } else {
      $('.pass-check-1').removeClass('success');
    }

    /*contains lowercase and uppercase characters*/
    if (this.value.match(/[a-z]+/) && this.value.match(/[A-Z]+/)) {
      $('.pass-check-2').addClass('success');
    } else {
      $('.pass-check-2').removeClass('success');
    }

    /*contains digits*/
    if (this.value.match(/[0-9]+/)) {
      $('.pass-check-3').addClass('success');
    } else {
      $('.pass-check-3').removeClass('success');
    }

    if (this.value.match(/[$£&+,:;=?@#|'<>.^*()%!-]+/)) {
      $('.pass-check-4').addClass('success');
    } else {
      $('.pass-check-4').removeClass('success');
    }

  });

$('[data-validation="password-confirm"]').popover({
    trigger: 'manual',
    html: true,
    placement: function(context, source) {
      var offset = ($(window).width() - ($(source).offset().left + $(source).outerWidth()));
      console.log(offset);
      if (offset < 300) return 'top';
      return 'right';
    },
    content: function(context, source) {
      return "<p><strong>Passwords must correctly match:</strong></p><ul class='o-list__validation'><li class='pass-confirm-check-1'>Passwords match</li></ul>"
    }
  })
  .focus(showPopover)
  .blur(hidePopover)
  .keyup(function() {
    var password = $('[data-validation="password"]').val();
    var confirmPassword = $('[data-validation="password-confirm"').val();

    if (password === confirmPassword && this.value.length >= 8) {
      $('.pass-confirm-check-1').addClass('success');
    } else {
      $('.pass-confirm-check-1').removeClass('success');
    }

  });



// ===========================
// Bootstrap components end
// ===========================




// ===========================
// SelectBox init
// ===========================
var selectBox = require("./modules/selectbox");

$('select').selectBox({
  mobile: false,
  loopOptions: true
});




// ===========================

// SelectBox End
// ===========================


// ===========================
// Sticky Headers
// ===========================

// currently rewriting - ih 04/02/16
require("./modules/sticky-headers");

// =========================
// Sticky Headers End
// ===========================


// ===========================
// Slick Slider initialisation
// ===========================
var slick = require("./vendors/slick");


$('.o-section-department__slick').slick({
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 3,
  responsive: [{
    breakpoint: 1024,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 2
    }
  }, {
    breakpoint: 768,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1
    }
  }]
});

$('.o-product-suite__slick').slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1
});


var PhotoSwipe = require("./vendors/photoswipe");
var PhotoSwipeUI_Default = require("./vendors/photoswipe-ui");



$('.o-product__slider').slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  centerMode: true,
  centerPadding: '40px'
});

var initPhotoSwipeFromDOM = function(gallerySelector) {

  // parse slide data (url, title, size ...) from DOM elements
  // (children of gallerySelector)
  var parseThumbnailElements = function(el) {
    var thumbElements = el.childNodes,
      numNodes = thumbElements.length,
      items = [],
      figureEl,
      linkEl,
      size,
      item;

    for (var i = 0; i < numNodes; i++) {
      figureEl = thumbElements[i]; // <figure> element

      // include only element nodes
      if (figureEl.nodeType !== 1) {
        continue;
      }
      linkEl = figureEl.children[0]; // <a> element
      size = linkEl.getAttribute('data-size').split('x');

      // create slide object
      item = {
        src: linkEl.getAttribute('href'),
        w: parseInt(size[0], 10),
        h: parseInt(size[1], 10)
      };


      if (figureEl.children.length > 1) {
        // <figcaption> content
        item.title = figureEl.children[1].innerHTML;
      }

      if (linkEl.children.length > 0) {
        // <img> thumbnail element, retrieving thumbnail url
        item.msrc = linkEl.children[0].getAttribute('src');
      }

      item.el = figureEl; // save link to element for getThumbBoundsFn
      items.push(item);
    }

    return items;
  };

  // find nearest parent element
  var closest = function closest(el, fn) {
    return el && (fn(el) ? el : closest(el.parentNode, fn));
  };

  // triggers when user clicks on thumbnail
  var onThumbnailsClick = function(e) {
    e = e || window.event;
    e.preventDefault ? e.preventDefault() : e.returnValue = false;

    var eTarget = e.target || e.srcElement;

    // find root element of slide
    var clickedListItem = closest(eTarget, function(el) {
      return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
    });

    if (!clickedListItem) {
      return;
    }

    // find index of clicked item by looping through all child nodes
    // alternatively, you may define index via data- attribute
    var clickedGallery = clickedListItem.parentNode,
      childNodes = clickedListItem.parentNode.childNodes,
      numChildNodes = childNodes.length,
      nodeIndex = 0,
      index;

    for (var i = 0; i < numChildNodes; i++) {
      if (childNodes[i].nodeType !== 1) {
        continue;
      }

      if (childNodes[i] === clickedListItem) {
        index = nodeIndex;
        break;
      }
      nodeIndex++;
    }



    if (index >= 0) {
      // open PhotoSwipe if valid index found
      openPhotoSwipe(index, clickedGallery);
    }
    return false;
  };

  // parse picture index and gallery index from URL (#&pid=1&gid=2)

  var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
    var pswpElement = document.querySelectorAll('.pswp')[0],
      gallery,
      options,
      items;

    items = parseThumbnailElements(galleryElement);

    // define options (if needed)
    options = {
      //             loop:false,
      // define gallery index (for URL)
      galleryUID: galleryElement.getAttribute('data-pswp-uid'),

      getThumbBoundsFn: function(index) {
        // See Options -> getThumbBoundsFn section of documentation for more info
        var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
          pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
          rect = thumbnail.getBoundingClientRect();

        return {
          x: rect.left,
          y: rect.top + pageYScroll,
          w: rect.width
        };
      },
      bgOpacity: 0.7,
      disableAnimation: true,
      hideAnimationDuration: 0,
      showAnimationDuration: 0,
      zoomTo: 3

    };

    // PhotoSwipe opened from URL
    if (fromURL) {
      if (options.galleryPIDs) {
        // parse real index when custom PIDs are used
        // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
        for (var j = 0; j < items.length; j++) {
          if (items[j].pid == index) {
            options.index = j;
            break;
          }
        }
      } else {
        // in URL indexes start from 1
        options.index = parseInt(index, 10) - 1;
      }
    } else {
      options.index = parseInt(index, 10);
    }

    // exit if index not found
    if (isNaN(options.index)) {
      return;
    }

    if (disableAnimation) {
      options.showAnimationDuration = 0;
    }

    // Pass data to PhotoSwipe and initialize it
    gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
    //zoomed in image on initialisation
    // gallery.zoomTo(1, {
    //         x: gallery.viewportSize.x / 2,
    //         y: gallery.viewportSize.y / 2
    //     }, 0, false, function(now) {
    //       $('.pswp--zoom-allowed').addClass('pswp--zoomed-in');
    //     });

    // gallery.listen('afterChange', function(e) {
    //     gallery.zoomTo(1, {
    //         x: gallery.viewportSize.x / 2,
    //         y: gallery.viewportSize.y / 2
    //     }, 0, false, function(now) {
    //       $('.pswp--zoom-allowed').addClass('pswp--zoomed-in');
    //     });

    // });
    var psIndex = gallery.getCurrentIndex();
    var psIndexSlick = psIndex - 1;
  };


  // loop through all gallery elements and bind events
  var galleryElements = document.querySelectorAll(gallerySelector);

  for (var i = 0, l = galleryElements.length; i < l; i++) {
    galleryElements[i].setAttribute('data-pswp-uid', i + 1);
    galleryElements[i].onclick = onThumbnailsClick;

  }
};

// execute above function
initPhotoSwipeFromDOM('.product-images');
// ===========================
// PhotoSwipe End
// ===========================


// ===========================
// Range Slider init
// ===========================
(function() {
  if ($("#filters--range").length) {
    var noUiSlider = require("./modules/nouislider");

    var slider = document.getElementById('filters--range');
    var sliderValues = [
      document.getElementById('slider-value-lower'),
      document.getElementById('slider-value-upper')
    ];

    noUiSlider.create(slider, {
      start: [20, 80],
      connect: true,
      range: {
        'min': 0,
        'max': 100
      }
    });
    slider.noUiSlider.on('update', function(values, handle) {
      sliderValues[handle].innerHTML = '£' + Math.round(values[handle]).toFixed(0);
    });
  }
})();
// ===========================
// Range Slider End
// ===========================



// Self Initialising...
require("./modules/minibag");

require("./modules/filters");

require("./modules/scroll-lock");
// Self Initialising end


// ===========================
// Misc rules to tidy
// ===========================

require('./modules/address-lookup');




(function() {
  // header - show mobile search input field
  $('.header--mobile-search').on('click', function() {
    $(this).toggleClass('active');
    $('.header--search-bar').toggleClass('active').find('input').focus();
  });
})();

(function() {
  // search results layout switch
  $('.js-results-tight').on('click', function(e) {
    e.preventDefault();
    if (!$(this).hasClass('active')) {

      $(this).addClass('active')
        .siblings().removeClass('active')
        .closest('.search-results__main')
        .removeClass('search-results__wide')
        .addClass('search-results__tight');
    }
  });
  // search results layout switch cont.
  $('.js-results-wide').on('click', function(e) {
    e.preventDefault();
    if (!$(this).hasClass('active')) {

      $(this).addClass('active')
        .siblings().removeClass('active')
        .closest('.search-results__main')
        .removeClass('search-results__tight')
        .addClass('search-results__wide');
    }
  });
})();

(function() {
  // global alert event
  $(".global-test").click(function() {
    $(".c-alert-global").toggleClass("active");
  });
})();



// (function() {

//     // filter collapse / expand
//     var toggleFilterCollapse = function(target) {
//         $(target).toggleClass('collapse');
//         // console.log($(target));
//         $(target).find('.icon').toggleClass("icon-plus icon-minus");
//     };

//     $('body').on('click', '.filter--title', function() {
//         toggleFilterCollapse($(this));
//     });
//     // console.log(isMobileOrTablet);
//     if (!window.isMobileOrTablet) {
//         toggleFilterCollapse('.filter--title');
//     }
// })();


// syntax highlighter
// hljs.configure({
//   useBR: false,
//   fixMarkup: true
// });
// hljs.initHighlighting();


// Filters Show more
(function() {
  $('body').on('click', '.filters--show-more', function() {
    $(this).hide();
    $(this).parent().find('label').css('display', 'block');
  });
})();



// bugherd
// (function(d, t) {
//   var bh = d.createElement(t),
//   s = d.getElementsByTagName(t)[0];
//   bh.type = 'text/javascript';
//   bh.src = '//www.bugherd.com/sidebarv2.js?apikey=uswxmej5ryhotdtsi4yw9g';
//   s.parentNode.insertBefore(bh, s);
// })(document, 'script');
