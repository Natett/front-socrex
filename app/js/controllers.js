var socrexControllers = angular.module('socrex.controllers', []);

socrexControllers.controller('listCtrl', ['$scope', 
function($scope) {
    $scope.rows = [['Listing1','www.google.com'],
                   ['Listing2','www.reddit.com'],
                   ['Listing3','www.espn.com',]];
    $scope.listing = ['*GREAT STUDIO* HARDWOOD FLOORS, CLOSET SPACE, H/HW INCLUDED *1/1/15* (Beacon Hill)','http://boston.craigslist.org/gbs/fee/4699511345.html', '$1500', 'http://images.craigslist.org/00U0U_kPv2pFmpzw0_600x450.jpg', '1BR', '1BD']
    $scope.temp = false;

    $scope.addRow = function(){
    $scope.temp = false;
    $scope.addName="";
    };

    $scope.deleteRow = function(row){
    $scope.rows.splice($scope.rows.indexOf(row),1);
    };

    $scope.plural = function (tab){
    return tab.length > 1 ? 's': ''; 
    };

    $scope.addTemp = function(){
    if($scope.temp) $scope.rows.pop(); 
    else if($scope.addName) $scope.temp = true;

    if($scope.addName) $scope.rows.push($scope.addName);
    else $scope.temp = false;
    };

    $scope.isTemp = function(i){
    return i==$scope.rows.length-1 && $scope.temp;
    };
    }]);

socrexControllers.controller('listCtrl2', ['$scope', 
function($scope) {
    $scope.rows = [['*GREAT STUDIO* HARDWOOD FLOORS, CLOSET SPACE, H/HW INCLUDED *1/1/15* (Beacon Hill)','http://boston.craigslist.org/gbs/fee/4699511345.html', '$1500', 'http://images.craigslist.org/00U0U_kPv2pFmpzw0_600x450.jpg', '1BR', '1BD'],
                   ['*GREAT STUDIO* HARDWOOD FLOORS, CLOSET SPACE, H/HW INCLUDED *1/1/15* (Beacon Hill)','http://boston.craigslist.org/gbs/fee/4699511345.html', '$1500', 'http://images.craigslist.org/00U0U_kPv2pFmpzw0_600x450.jpg', '1BR', '1BD'],
                   ['*GREAT STUDIO* HARDWOOD FLOORS, CLOSET SPACE, H/HW INCLUDED *1/1/15* (Beacon Hill)','http://boston.craigslist.org/gbs/fee/4699511345.html', '$1500', 'http://images.craigslist.org/00U0U_kPv2pFmpzw0_600x450.jpg', '1BR', '1BD']];
    $scope.temp = false;

    $scope.addRow = function(){
    $scope.temp = false;
    $scope.addName="";
    };

    $scope.deleteRow = function(row){
    $scope.rows.splice($scope.rows.indexOf(row),1);
    };

    $scope.plural = function (tab){
    return tab.length > 1 ? 's': ''; 
    };

    $scope.addTemp = function(){
    if($scope.temp) $scope.rows.pop(); 
    else if($scope.addName) $scope.temp = true;

    if($scope.addName) $scope.rows.push($scope.addName);
    else $scope.temp = false;
    };

    $scope.isTemp = function(i){
    return i==$scope.rows.length-1 && $scope.temp;
    };
    }]);