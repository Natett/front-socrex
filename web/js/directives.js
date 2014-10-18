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
      element.bxSlider({adaptiveHeight: false, responsive:false});
    }
  
    return {
      restrict: 'A',
      replace: true,
      template: '<li ng-repeat="picture in selectedListing.pictures">' +
                     '<img ng-src="{{picture}}" alt="" />' +
                   '</li>',
      link: linkFn
    }
  }).directive('startslider',function() {
    return {
       restrict: 'A',
       replace: true,
       template: '<ul class="bxslider">' +
                   '<li ng-repeat="picture in selectedListing.pictures">' +
                     '<img ng-src="{{picture.src}}" alt="" />' +
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
});;
  