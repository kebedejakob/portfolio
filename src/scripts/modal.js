/**
 *  This file is part of the boilerplate. You do NOT need to understand this. In time, you will.
 */

$(document).ready(function() {
  // MODAL
  var modalText = {
    webshop: {
      title: 'WEBSHOP',
      tag: 'ECOMMERCE PLATFORM',
      detail:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis velit neque, lobortis quis justo non, tempus blandit tortor. Maecenas consectetur suscipit mauris ac tristique.',
      link: 'https://www.academy.techover.nu'
    },
   'spotify-clone': {
      title: 'Spotify Clone',
      tag: 'MUSIC PLATFORM',
      detail:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis velit neque, lobortis quis justo non, tempus blandit tortor. Maecenas consectetur suscipit mauris ac tristique.',
      link: 'https://www.academy.techover.nu'
    },
    dashboard: {
      title: 'Dashboard',
      tag: 'A ONE-PAGE DASHBOARD',
      detail:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis velit neque, lobortis quis justo non, tempus blandit tortor. Maecenas consectetur suscipit mauris ac tristique.',
      link: 'https://www.academy.techover.nu'
    },
    'klarna-checkout': {
      title: 'Klarna Checkout',
      tag: 'ECOMMERCE CHECKOUT',
      detail:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis velit neque, lobortis quis justo non, tempus blandit tortor. Maecenas consectetur suscipit mauris ac tristique.'
    },
    'powur-count': {
      title: 'Powur Count',
      tag: 'SHOWING REAL DATA',
      detail:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis velit neque, lobortis quis justo non, tempus blandit tortor. Maecenas consectetur suscipit mauris ac tristique.',
      link: 'https://www.academy.techover.nu'
    },
  };

  $('#gallery .button').on('click', function() {
    fillModal(this.id);
    $('.modal-wrap').addClass('visible');
  });

  $('.close').on('click', function() {
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  $('.mask').on('click', function() {
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  var carousel = $('#carousel'),
    slideWidth = 700,
    threshold = slideWidth / 3,
    dragStart,
    dragEnd;

  setDimensions();

  $('#next').click(function() {
    shiftSlide(-1);
  });
  $('#prev').click(function() {
    shiftSlide(1);
  });

  carousel.on('mousedown', function() {
    if (carousel.hasClass('transition')) return;
    dragStart = event.pageX;
    $(this).on('mousemove', function() {
      dragEnd = event.pageX;
      $(this).css('transform', 'translateX(' + dragPos() + 'px)');
    });
    $(document).on('mouseup', function() {
      if (dragPos() > threshold) {
        return shiftSlide(1);
      }
      if (dragPos() < -threshold) {
        return shiftSlide(-1);
      }
      shiftSlide(0);
    });
  });

  function setDimensions() {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      slideWidth = $(window).innerWidth();
    }
    $('.carousel-wrap, .slide').css('width', slideWidth);
    $('.modal').css('max-width', slideWidth);
    $('#carousel').css('left', slideWidth * -1);
  }

  function dragPos() {
    return dragEnd - dragStart;
  }

  function shiftSlide(direction) {
    if (carousel.hasClass('transition')) return;
    dragEnd = dragStart;
    $(document).off('mouseup');
    carousel
      .off('mousemove')
      .addClass('transition')
      .css('transform', 'translateX(' + direction * slideWidth + 'px)');
    setTimeout(function() {
      if (direction === 1) {
        $('.slide:first').before($('.slide:last'));
      } else if (direction === -1) {
        $('.slide:last').after($('.slide:first'));
      }
      carousel.removeClass('transition');
      carousel.css('transform', 'translateX(0px)');
    }, 700);
  }

  function fillModal(id) {
    $('#modal .title').text(modalText[id].title);
    $('#modal .detail').text(modalText[id].detail);
    $('#modal .tag').text(modalText[id].tag);
    if (modalText[id].link)
      $('#modal .button')
        .addClass('visible')
        .parent()
        .attr('href', modalText[id].link);

    $.each($('#modal li'), function(index, value) {
      $(this).text(modalText[id].bullets[index]);
    });
    $.each($('#modal .slide'), function(index, value) {
      let start=1;
      $(this).css({
        background:
          "url('img/slides/" + id + '-' + index + ".png') center center/cover",
        backgroundSize: 'cover'
      });
      start++;
    });
  }
});
