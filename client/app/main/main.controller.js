'use strict';

angular.module('sharingsmilesinApp')
  .controller('MainCtrl', function ($scope, $http) {
    (function($) {

  skel
    .breakpoints({
      xlarge: '(max-width: 1680px)',
      large: '(max-width: 1280px)',
      medium: '(max-width: 980px)',
      small: '(max-width: 736px)',
      xsmall: '(max-width: 480px)'
    });

  $(function() {

    var $window = $(window),
      $body = $('body');

    // Disable animations/transitions until the page has loaded.
      $body.addClass('is-loading');

      $window.on('load', function() {
        window.setTimeout(function() {
          $body.removeClass('is-loading');
        }, 100);
      });

    // Fix: Placeholder polyfill.
      $('form').placeholder();

    // Prioritize "important" elements on medium.
      skel.on('+medium -medium', function() {
        $.prioritize(
          '.important\\28 medium\\29',
          skel.breakpoint('medium').active
        );
      });

    // Nav.
      $('#nav')
        .append('<a href="#nav" class="close"></a>')
        .appendTo($body)
        .panel({
          delay: 500,
          hideOnClick: true,
          hideOnSwipe: true,
          resetScroll: true,
          resetForms: true,
          side: 'right'
        });

  });

})(jQuery);
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };
  });
