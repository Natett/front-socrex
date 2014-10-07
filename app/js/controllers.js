var socrexControllers = angular.module('socrex.controllers', []);

socrexControllers.controller('listCtrl', ['$scope' , '$http', '$rootScope',
    function($scope,$http,$rootScope) {
        
    }
]);

socrexControllers.controller('listCtrl2', ['$scope' , '$http', '$location', '$rootScope',
    function($scope,$http,$location, $rootScope) {
        $scope.rows = [];
        
        $scope.rows2 = [];
        
        $rootScope.selectedListing = {};
                       
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
        
        $scope.getDetailedListing = function(listingId) {
            // dummy filters
    		//var listingId = '542c3f86b43c2c00029a8211';
    		    
            var responsePromise = $http({
    		    //url: 'http://127.0.0.1:5000/listings/filter', 
                url: 'http://byopapp-api-stage.herokuapp.com/listings/' + listingId,
                method: 'GET',
    		    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
    
            responsePromise.success(function(data, status, headers, config) {
                //$scope.rows2 = data.Data;
                $rootScope.selectedListing = data.Data;
                //$rootScope.selectedListing['price'] = 3000;
                $scope.redirecToListingDetail();
            });
                
            responsePromise.error(function(data, status, headers, config) {
                alert("AJAX failed!");
            });
        }
        
        $scope.redirecToListingDetail = function(){
            $location.path( "/view1", false );
        }
        
        $scope.redirecToListingList = function(){
            $location.path( "/view2", false );
        }
        
        $scope.filterListings = function(item, event) {
		    // dummy filters
            // must be bery carefull with the filters value structure, it has to start with single couotes, and de inner quotes be double
            // otherwise there would be an error in python decoding  
		    var filters = {'filters':'{"bedroom":2}'};
		    
            var responsePromise = $http({
		        //url: 'http://127.0.0.1:5000/listings/filter', 
                url: 'http://byopapp-api-stage.herokuapp.com/listings/filter',
                method: 'POST',
		        data: $.param(filters),
		        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });

            responsePromise.success(function(data, status, headers, config) {
                $scope.rows2 = data.Data.Listings;
                console.log($scope.rows2);
            });
            
            responsePromise.error(function(data, status, headers, config) {
                alert("AJAX failed!");
            });
        }
        
        // Do the first call
        $scope.filterListings();
    }
]);