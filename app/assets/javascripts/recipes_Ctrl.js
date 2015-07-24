(function() {
  "use strict";

  angular.module("app").controller("recipesCtrl", function($scope, $http) {

    $scope.setup = function() {
      $http.get("/api/v1/api_groceries.json").then(function(response) {
        $scope.groceries = response.data;
      });
      
      $scope.searchOptions = $scope.groceries;
      
      var none = {
        description: "none",
        current_user: true
      };

      $scope.searchOptions.unshift(none);
    };

    window.scope = $scope;
  
  });

}());