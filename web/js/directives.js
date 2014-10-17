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
  }).directive( 'slidesjs', function() {
    var linkFn;
    linkFn = function( scope, element, attrs ) {
      var sliderConfig = {
        width: 940,
        height: 528
      };
      
      element.slidesjs(sliderConfig);
      
    }
  
    return {
      restrict: 'A',
      link: linkFn
    }
  });
  