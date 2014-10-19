'use strict';

/* Directives */


angular.module('socrex.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]).directive( 'jqueryuidialog', function() {
    var linkFn;
    linkFn = function( scope, element, attrs ) {
      var dialogConfig = {
        autoOpen: false,
        height: 350,
        width: 350,
        modal: true
      };
      
      element.dialog(dialogConfig);
    }
  
    return {
      restrict: 'A',
      link: linkFn
    }
  }).directive( 'bxslider', function() {
    var linkFn;
    linkFn = function( scope, element, attrs ) {
      var slider = element.bxSlider({adaptiveHeight: false, responsive:false});
      
      scope.$on('reload-slider', function() {
                slider.reloadSlider();
            });
    }
  
    return {
      restrict: 'A',
      //template: '<li><img src="http://images.craigslist.org/00V0V_7KrsygPW5pf_600x450.jpg" /></li>',
      template:   '<li ng-repeat="picture in pictures">' +
                     '<img ng-src="{{picture}}" alt="" />' +
                   '</li>',
      link: linkFn
    }
  }).directive( 'bxslider2', function() {
    var linkFn;
    linkFn = function( scope, element, attrs ) {
      var slider = element.bxSlider({adaptiveHeight: false, responsive:false});
      
      attrs.$observe('bxslider2', function(val) {
        bxslider2.html('');
        var directives = $parse(val)(scope);
        angular.forEach(directives, function(directive) {
          element.append($compile(directive)(scope));
        });
      });
      
      scope.$on('reload-slider', function() {
                slider.reloadSlider();
            });
    }
  
    return {
      restrict: 'A',
      //template: '<li><img src="http://images.craigslist.org/00V0V_7KrsygPW5pf_600x450.jpg" /></li>',
      template:   '<li ng-repeat="picture in pictures">' +
                     '<img ng-src="{{picture}}" alt="" />' +
                   '</li>',
      link: linkFn
    }
  }).directive('startslider',function() {
    return {
       restrict: 'A',
       replace: true,
       template: '<ul class="bxslider">' +
                   '<li ng-repeat="picture in pictures">' +
                     '<img ng-src="{{picture}}" alt="" />' +
                   '</li>' +
                  '</ul>',
       link: function(scope, elm, attrs) {
          elm.ready(function() {    
               $("." + $(elm[0]).attr('class')).bxSlider({
                    mode: 'fade',
                    autoControls: true,
                    slideWidth: 360,
                    slideHeight:600
            });

          });
      }
    };
}).directive('dynamic2', function ($compile, $parse) {
  return {
    restrict: 'A',
    replace: true,
    link: function (scope, element, attr) {
      attr.$observe('dynamic2', function(val) {
        element.html('');
        var directives = $parse(val)(scope);
        angular.forEach(directives, function(directive) {
          element.append($compile(directive)(scope));
        });
      });
    }
  };
}).directive('dynamic3', function ($compile, $parse) {
  return {
    restrict: 'A',
    replace: true,
    link: function (scope, element, attr) {
      var slider = element.bxSlider({adaptiveHeight: false, responsive:false});
      
      attr.$observe('dynamic3', function(val) {
        element.html('');
        var directives = $parse(val)(scope);
        angular.forEach(directives, function(directive) {
          element.append($compile(directive)(scope));
          //slider.reloadSlider();
        });
      });
      
      scope.$on('reload-slider', function() {
                slider.reloadSlider();
      });
    }
  };
}).directive('dynamic', function ($compile, $parse) {
  return {
    restrict: 'A',
    replace: true,
    link: function (scope, element, attr) {
      attr.$observe('dynamic', function(val) {
        element.html('');
        var directives = $parse(val)(scope);
        angular.forEach(directives, function(directive) {
          element.append($compile(directive)(scope));
        });
      });
    }
  };
});
  