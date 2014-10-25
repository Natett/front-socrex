var socrexControllers = angular.module('socrex.controllers', []);

socrexControllers.controller('listCtrl', ['$scope' , '$http', '$location', '$rootScope', '$routeParams' ,
    function($scope,$http, $location,$rootScope, $routeParams) {
        
        $scope.directives3 = [];
        
        $scope.addPictureToSlider = function(pictureUrl) {
            var directive = '<li><img src="'+pictureUrl+'" /></li>';
            $scope.directives3.push(directive);
        }
        
        $scope.addPictureArrayToSlider = function(pictureUrlArray) {
            for (var i = 0; i < pictureUrlArray.length; i++) {
                $scope.addPictureToSlider(pictureUrlArray[i]);
            }
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
                $rootScope.selectedListing = data.Data;
                // add pictures to slider
                $scope.addPictureArrayToSlider($rootScope.selectedListing.pictures);
                // reload slider styles
                $scope.$broadcast('reload-slider')
            });
                
            responsePromise.error(function(data, status, headers, config) {
                alert("AJAX failed!");
            });
        }
        
        $scope.onClickOriginalListingButton = function(){
            $scope.openOriginalListingTab();
            $scope.saveClickOnDB($routeParams.listingId,$rootScope.userId ,"originallisting");
        }
        
        $scope.onClickContact = function(){
            angular.element('#contactdialog').dialog( "open" );
            $scope.saveClickOnDB($routeParams.listingId,$rootScope.userId ,"sendemail");
        }
        
        $scope.onClickVerifyAvailability = function(){
            angular.element('#verifyavailabilitydialog').dialog( "open" );
            $scope.saveClickOnDB($routeParams.listingId,$rootScope.userId ,"verifyavailability");
        }
        
        $scope.onClickExpertReview = function(){
            angular.element('#expertreviewdialog').dialog( "open" );
            $scope.saveClickOnDB($routeParams.listingId,$rootScope.userId ,"expertreview");
        }
        
        $scope.onClickTour = function(){
            angular.element('#tourdialog').dialog( "open" );
            $scope.saveClickOnDB($routeParams.listingId,$rootScope.userId ,"virtualtour");
        }
        
        $scope.openOriginalListingTab = function(){
            window.open($rootScope.selectedListing.url,'_blank');
        }
        
        $scope.redirecToListingList = function(){
            $location.path( "/listings/filter/"+$rootScope.currentListingFilter, false );
        }
        
        $scope.validateSelectedListing = function(){
            // always call listing detail from server to get images
            //if($rootScope.selectedListing == null){
                $scope.getDetailedListing($routeParams.listingId)
            //}
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
        
        $rootScope.selectedListingCity = {};
        
        $scope.filterId = $routeParams.filterId;
        
        $scope.isTableVisibleFlag = false;
        
        $scope.isLoadingListingsFlag = true;
        
        $scope.noListingFoundFlag = false;
        
        $scope.unexpectedErrorFlag = false;
        
        $scope.rows = [];
        
        $scope.rows2 = [];
        
        $rootScope.selectedListing = null;
                       
        $scope.temp = false;
        
        $scope.totalPages = 0;
        
        $scope.totalListings = 0;
        
        $rootScope.reloadMap = false;
        
        $rootScope.currentListedListings = [];
        
        
        
        $scope.hideTable = function(){
            $scope.rows2.length = 0;
            $scope.updateIsTableVisibleFlag(false);
        }
        
        $scope.showTable = function(){
            $scope.updateIsTableVisibleFlag(true);
            $scope.updateLoadingListingsFlag(false);
            $scope.updateNoListingFoundFlag(false);
        }

        
        $scope.updateIsTableVisibleFlag = function(value){
            $scope.isTableVisibleFlag = value;
        }
        
        $scope.updateLoadingListingsFlag = function(value){
            $scope.isLoadingListingsFlag = value;
        }
        
        $scope.updateNoListingFoundFlag = function(value){
            $scope.noListingFoundFlag = value;
        }
        
        $scope.updateUnexpectedErrorFlag = function(value){
            $scope.unexpectedErrorFlag = value;
        }
        
        
        
        
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
            return tab > 1 ? 's': ''; 
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
        
        $scope.clickedPaginationButton = function(pageNumber) {
            
            $scope.filterListings(pageNumber,10);
            
            /*
    		$scope.saveClickOnDB(listingId,$rootScope.userId ,"listingdetails")
    		    
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
            });*/
        }
        
        
        
        $scope.onTableRowHover = function(id) {
            //console.log("onTableRowHover");
            
            var coordPoint = {'id' : id}
            $rootScope.selectedListingCity = coordPoint;
            
        }
        
        $scope.getDetailedListing = function(listingId) {
            // dummy filters
    		//var listingId = '542c3f86b43c2c00029a8211';
    		$scope.saveClickOnDB(listingId,$rootScope.userId ,"listingdetails")
    		    
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
                $scope.updateLoadingListingsFlag(false);
                $scope.updateUnexpectedErrorFlag(true);
            });
        }
        
        $scope.redirecToListingDetail = function(){
            $location.path( "/listing/" + $rootScope.selectedListing._id.$oid, false );
        }
        
        $scope.filterListings = function(currentPage, numberOfItems) {
		    // dummy filters
            // must be bery carefull with the filters value structure, it has to start with single couotes, and de inner quotes be double
            // otherwise there would be an error in python decoding  
		    //var filters = {'filters':'{"bedroom":2}'};
		    var filters = {'id':$scope.filterId, 'currentPage' : currentPage , 'itemsOnPage': numberOfItems };
		    // clean current listing list
		    $scope.hideTable();
		    $scope.updateLoadingListingsFlag(true);
		    // do call to server to retrieve listings list
            var responsePromise = $http({
		        //url: 'http://127.0.0.1:5000/listings/filter', 
                url: 'http://byopapp-api-stage.herokuapp.com/listings/filter',
                method: 'POST',
		        data: $.param(filters),
		        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });

            responsePromise.success(function(data, status, headers, config) {
                $rootScope.currentListingFilter = $scope.filterId;
                $rootScope.currentListedListings = data.Data.Listings;
                $scope.rows2 = data.Data.Listings;
                $rootScope.userId = data.Data.Email
                $scope.showTable();
                if($scope.totalPages != data.Data.TotalPages){
                    $scope.totalPages = data.Data.TotalPages;
                    //$scope.totalPages = 6;
                }
                
                if($scope.totalListings != data.Data.Total){
                    $scope.totalListings = data.Data.Total;
                    //$scope.totalPages = 6;
                }
                
                $rootScope.reloadMap = true;
                //$scope.setRandomStarRating($scope.rows2);
                
            });
            
            
            
            responsePromise.error(function(data, status, headers, config) {
                $scope.updateLoadingListingsFlag(false);
                $scope.updateUnexpectedErrorFlag(true);
            });
        }
        
        // from here: http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
        $scope.getRandomInt = function(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        
        $scope.setRandomStarRating = function(listingsArray){
            for (var i = 0; i < listingsArray.length; i++) {
                listingsArray[i].relevance = $scope.getRandomInt(0,20);
            }
        }
        
        $scope.init = function(){
            // Do the first call to server
            $scope.filterListings(1,10);
            // init rating 
            $scope.initRating();
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
        
        $scope.init();
        
    }
]);

socrexControllers.controller('MapCtrl', ['$scope' , '$rootScope', function ($scope, $rootScope) {

    $scope.isReadyMapFlag = false;
    $scope.loadingMapFlag = true;
    $scope.normalIcon = null;
    $scope.selectedIcon = null;
    $scope.latlngList = [];
    $scope.bounds = new google.maps.LatLngBounds();
    
    var mapOptions = {
        zoom: 12,
        center: new google.maps.LatLng(42.3432, -71.082866),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    }
    
    
    $rootScope.$watch( 'reloadMap',
        function(newValue, oldValue){
            $scope.refreshMap();
            $rootScope.reloadMap = false;   
            /*
            if(oldValue == false && newValue == true){
                google.maps.event.trigger($scope.map, 'resize');
                $rootScope.reloadMap = false;    
            }*/
            
        }
    );
    
    $rootScope.$watch( 'selectedListingCity',
        function(newValue, oldValue){
            if('id' in newValue){
                //console.log(newValue);
                //console.log(oldValue);
                
                for (var i = 0; i < $scope.markers.length; i++) {
                    var currentMarker = $scope.markers[i]['marker']
                    if($scope.normalIcon == null){
                        $scope.normalIcon = currentMarker.getIcon();
                    }
                    
                    if($scope.markers[i]['listingId'] == newValue['id']){
                        currentMarker.setAnimation(google.maps.Animation.BOUNCE);
                    }else{
                        currentMarker.setAnimation(null);
                    }
                }
            }
        }
    );
    
    $rootScope.$watch( 'currentListedListings',
        function(newValue, oldValue){
            
            
            
            
            
            
            $scope.deleteMarkers();
            $scope.latlngList.length = 0;
            $scope.bounds = new google.maps.LatLngBounds();
            
            for (var i = 0; i < $rootScope.currentListedListings.length; i++) {
                
                var newPoint = { 'id': $rootScope.currentListedListings[i]._id.$oid, 'latitude' : $rootScope.currentListedListings[i].latitude , 'longitude': $rootScope.currentListedListings[i].longitude};
                var newGoogleMapsPoint = new google.maps.LatLng($rootScope.currentListedListings[i].latitude,$rootScope.currentListedListings[i].longitude);
                $scope.latlngList.push(newGoogleMapsPoint);
                $scope.bounds.extend(newGoogleMapsPoint);
                $scope.createMarker(newPoint);    
            }
            
            /*
            $scope.bounds = new google.maps.LatLngBounds();
            
            for (var i = 0; i < $scope.latlngList.length; i++) {
                $scope.bounds.extend($scope.latlngList[i]);
            }*/
            
            // TODO: center de map once all the markers are identifyed
            var boundsCenter = $scope.bounds.getCenter();
            $scope.centerPoint = boundsCenter;
            //var newCenter = new google.maps.LatLng(42.3432, -71.082866);
            
            //$scope.map.setCenter(newCenter); //or use custom center
            //$scope.map.panTo(newCenter); //or use custom center
            
            //$scope.refreshMap();
            
            /*
            if('latitude' in newValue){
                //console.log(newValue);
                //console.log(oldValue);
            
                var newPoint = new google.maps.LatLng(newValue.latitude,newValue.longitude);
            
                $scope.clearMarkers();
                $scope.createMarker(newValue);
                //$scope.map.setCenter(newPoint);
                // with animation
                $scope.map.panTo(newPoint);
            }else{
                google.maps.event.trigger($scope.map, 'resize');
            }*/
        }
    );

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    
    google.maps.event.addListener($scope.map, 'tilesloaded', function(){
        $scope.isReadyMapFlag = true;
        $scope.loadingMapFlag = false;
        $scope.refreshMap();
        // do something only the first time the map is loaded
    });

    $scope.markers = [];
    
    var infoWindow = new google.maps.InfoWindow();
    
    $scope.createMarker = function (info){
        
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.latitude, info.longitude),
            title: info.city
        });
        
        //marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';
        
        /*
        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
            infoWindow.open($scope.map, marker);
        });*/
        
        //$scope.markers.push(marker);
        $scope.markers.push({'listingId':info.id , 'marker':marker});
        
    }  

    $scope.openInfoWindow = function(e, selectedMarker){
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }
    
    // Sets the map on all markers in the array.
    $scope.setAllMap = function setAllMap(map) {
      for (var i = 0; i < $scope.markers.length; i++) {
        $scope.markers[i]['marker'].setMap(map);
      }
    }
    
    // Removes the markers from the array
    $scope.clearMarkersArray = function () {
      $scope.markers.length = 0;
    }

    // Removes the markers from the map, but keeps them in the array.
    $scope.clearMarkers = function () {
      $scope.setAllMap(null);
    }
    
    // Shows any markers currently in the array.
    $scope.showMarkers = function () {
      $scope.setAllMap(map);
    }
    
    // Deletes all markers in the array by removing references to them.
    $scope.deleteMarkers = function() {
      $scope.clearMarkers();
      $scope.markers = [];
    }
    
    // this is because the google api bug: http://stackoverflow.com/questions/15748374/assistance-needed-map-does-not-load-properly-in-jquery-ui-tabs-not-a-duplica    
    $scope.refreshMap = function(){
        //var newCenter = new google.maps.LatLng(42.3432, -71.082866);
        var newCenter = $scope.centerPoint;
        $scope.map.setCenter(newCenter); //or use custom center
        google.maps.event.trigger($scope.map, 'resize'); 
    }

}]);

socrexControllers.controller('preferencesFormController', ['$scope' , '$rootScope', function ($scope, $rootScope) {

    // zero based index
  this.showQuestionIndex = 0;
  // array of questions
  this.questionsArray = ['One','Two','Three'];
  
  this.isShownQuestionNumber = function(questionNumber){
      var returnValue = false;
      
      if (this.questionsArray[this.showQuestionIndex] === questionNumber){
          returnValue = true;
      }
      
      return returnValue;
  }
  
  this.onClickNextButton = function(){
      this.increaseShowQuestionIndex();
  }
  
  this.onClickPreviousButton = function(){
      this.decreaseShowQuestionIndex();
  }
  
  this.increaseShowQuestionIndex = function(){
      if(this.validateIncreaseShowQuestionIndex()){
          this.showQuestionIndex++;
      }
  }
  
  this.decreaseShowQuestionIndex = function(){
      if(this.validateDecreaseShowQuestionIndex()){
          this.showQuestionIndex--;
      }
  }
  
  this.validateIncreaseShowQuestionIndex = function(){
      var returnValue = false;
      if(this.showQuestionIndex < this.questionsArray.length - 1){
          returnValue = true;
      }
      return returnValue;
  }
  
  this.validateDecreaseShowQuestionIndex = function(){
      var returnValue = false;
      if(this.showQuestionIndex > 0){
          returnValue = true;
      }
      return returnValue;
  }

}]);