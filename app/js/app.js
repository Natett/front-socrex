'use strict';


// Declare app level module which depends on filters, and services
angular.module('socrex', [
  'ngRoute',
  'socrex.filters',
  'socrex.services',
  'socrex.directives',
  'socrex.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  
  $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'listCtrl'});
  
  //$routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'listCtrl2'});
  
  $routeProvider.when('/view2/:filterId', { templateUrl: 'partials/partial2.html', controller: 'listCtrl2'})
  
  //$routeProvider.otherwise({redirectTo: '/view2'});
  
}]);

