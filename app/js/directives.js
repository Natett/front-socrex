'use strict';

/* Directives */


angular.module('socrex.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]).directive( 'rating', function() {
    var linkFn;
    linkFn = function( scope, element, attrs ) {
      angular.element( '.basic_rating' ).jRating({
	      step:true,
	      length : 5, // nb of stars
	      showRateInfo:false,
	      canRateAgain : true,
	      nbRates : 1000,
	      decimalLength:0 // number of decimal in the rate
	    });
      
    }
  
    return {
      restrict: 'A',
      link: linkFn
    }
  });
  