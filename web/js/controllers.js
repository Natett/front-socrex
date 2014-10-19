var socrexControllers = angular.module('socrex.controllers', []);

socrexControllers.controller('listCtrl', ['$scope' , '$http', '$location', '$rootScope', '$routeParams' ,
    function($scope,$http, $location,$rootScope, $routeParams) {
        $scope.pictures = ["http://images.craigslist.org/00V0V_7KrsygPW5pf_600x450.jpg", "http://images.craigslist.org/00G0G_3yEtFrm5hOJ_600x450.jpg"];
        $scope.directives = ['<one/>', '<two/>'];
        $scope.add = function(directive) {
            $scope.directives.push(directive);
        }
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
                $scope.pictures.push("http://images.craigslist.org/00G0G_3yEtFrm5hOJ_600x450.jpg");
                /*
                // clear array
                $scope.pictures.length = 0;
                // add images to array
                for (var i = 0; i < $rootScope.selectedListing.pictures.length; i++) {
                    $scope.pictures.push($rootScope.selectedListing.pictures[i]);
                }*/
                
                //$scope.pictures = $rootScope.selectedListing.pictures;
                $scope.$broadcast('reload-slider')
                $scope.$apply();
            });
                
            responsePromise.error(function(data, status, headers, config) {
                alert("AJAX failed!");
            });
        }
        
        $scope.onClickOriginalListingButton = function(){
            $scope.openOriginalListingTab();
        }
        
        $scope.onClickContact = function(){
            angular.element('#contactdialog').dialog( "open" );
            $scope.saveClickOnDB($routeParams.listingId,"jhon@socrex.com","sendemail")
        }
        
        $scope.onClickVerifyAvailability = function(){
            angular.element('#verifyavailabilitydialog').dialog( "open" );
            $scope.saveClickOnDB($routeParams.listingId,"jhon@socrex.com","verifyavailability")
        }
        
        $scope.onClickExpertReview = function(){
            angular.element('#expertreviewdialog').dialog( "open" );
            $scope.saveClickOnDB($routeParams.listingId,"jhon@socrex.com","expertreview")
        }
        
        $scope.onClickTour = function(){
            angular.element('#tourdialog').dialog( "open" );
            $scope.saveClickOnDB($routeParams.listingId,"jhon@socrex.com","virtualtour")
        }
        
        $scope.openOriginalListingTab = function(){
            window.open($rootScope.selectedListing.url,'_blank');
        }
        
        $scope.redirecToListingList = function(){
            $location.path( "/listings/filter/"+$rootScope.currentListingFilter, false );
        }
        
        $scope.validateSelectedListing = function(){
            if($rootScope.selectedListing == null){
                $scope.getDetailedListing($routeParams.listingId)
            }
        }
        
        $scope.saveClickOnDB = function(listingid,useremail, option) {
            // dummy filters
    		//var listingId = '542c3f86b43c2c00029a8211';
    		    
            var responsePromise = $http({
    		    //url: 'http://127.0.0.1:5000/listings/filter', 
                url: 'http://byopapp-api-stage.herokuapp.com/listing/'+listingid+'/user/'+useremail+'/'+option,
                method: 'POST',
    		    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
        }
        
        $scope.validateSelectedListing();
        
    }
]);

socrexControllers.controller('listCtrl2', ['$scope' , '$http', '$location', '$rootScope', '$routeParams',
    function($scope,$http,$location, $rootScope, $routeParams) {
        
        $scope.filterId = $routeParams.filterId;
        
        $scope.rows = [];
        
        $scope.rows2 = [];
        
        $rootScope.selectedListing = null;
                       
        $scope.temp = false;
        
        $scope.initRating = function(){
            
        }
    
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
            $location.path( "/listing/" + $rootScope.selectedListing._id.$oid, false );
        }
        
        $scope.filterListings = function(item, event) {
		    // dummy filters
            // must be bery carefull with the filters value structure, it has to start with single couotes, and de inner quotes be double
            // otherwise there would be an error in python decoding  
		    //var filters = {'filters':'{"bedroom":2}'};
		    var filters = {'id':$scope.filterId};
		    
            var responsePromise = $http({
		        //url: 'http://127.0.0.1:5000/listings/filter', 
                url: 'http://byopapp-api-stage.herokuapp.com/listings/filter',
                method: 'POST',
		        data: $.param(filters),
		        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });

            responsePromise.success(function(data, status, headers, config) {
                $rootScope.currentListingFilter = $scope.filterId;
                $scope.rows2 = data.Data.Listings;
                console.log($scope.rows2);
            });
            
            responsePromise.error(function(data, status, headers, config) {
                alert("AJAX failed!");
            });
        }
        
        $scope.init = function(){
            // Do the first call to server
            $scope.filterListings();
            // init rating 
            $scope.initRating();
        }
        
        $scope.init();
        
    }
]);