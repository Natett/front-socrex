function ctrl($scope){
  $scope.rows = [['Listing1','www.google.com'],
                ['Listing2','www.reddit.com'],
                ['Listing3','www.espn.com',]];
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
  
}