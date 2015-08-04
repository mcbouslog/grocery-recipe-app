(function() {
  "use strict";

  angular.module("app").controller("shopListCtrl", function($scope, $http) {

    $scope.setup = function() {
      $http.get('/api/v1/api_groceries.json').then(function(response) {
        $scope.groceries = response.data;
      });
      $http.get('/api/v1/api_ingredients/active.json').then(function(response) {
        $scope.userIngredients = response.data;
      });
    };

    window.scope = $scope;
  
  });

}());