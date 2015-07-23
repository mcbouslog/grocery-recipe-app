(function() {
  "use strict";

  angular.module("app").controller("groceriesCtrl", function($scope, $http) {

    $scope.setup = function() {
      $http.get("/api/v1/api_groceries.json").then(function(response) {
        $scope.groceries = response.data;
        console.log($scope.groceries[0])
      });
    }

    window.scope = $scope;
  
  });

}());