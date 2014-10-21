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
  }).directive('dynamic3', function ($compile, $parse) {
  return {
    restrict: 'A',
    replace: true,
    link: function (scope, element, attr) {
      var slider = element.bxSlider({adaptiveHeight: true, responsive:false});
      
      attr.$observe('dynamic3', function(val) {
        element.html('');
        var directives = $parse(val)(scope);
        angular.forEach(directives, function(directive) {
          element.append($compile(directive)(scope));
          //slider.reloadSlider();
        });
        slider.reloadSlider();
      });
    }
  };
}).directive( 'simplepaginator', function() {
    var linkFn;
    
    var customOnPageClick = function(pageNumber, event){
        console.log("pageNumber");
        console.log(pageNumber);
        console.log("event");
        console.log(event);
    }
    
    linkFn = function( scope, element, attrs ) {
      element.pagination({
        items: 100,
        itemsOnPage: 10,
        cssStyle: 'light-theme',
        selectOnClick : false,
        hrefTextPrefix : "",
        onPageClick : customOnPageClick
      });
    }
  
    return {
      restrict: 'A',
      link: linkFn
    }
  }).directive( 'twbspagination', function() {
    var linkFn;
    
    
    linkFn = function( scope, element, attrs ) {
      element.twbsPagination({
        totalPages: 35,
        visiblePages: 7,
        onPageClick: function (event, page) {
          scope.$apply("clickedPaginationButton("+page+")");
        }
    });
    }
  
    return {
      restrict: 'A',
      link: linkFn
    }
  });
  