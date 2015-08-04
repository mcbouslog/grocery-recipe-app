(function() {
  "use strict";

  angular.module("app").controller("shopListCtrl", function($scope, $http) {

    $scope.setup = function() {
      $http.get('/api/v1/api_groceries/minimal.json').then(function(response) {
        $scope.groceries = response.data;
      });
      $http.get('/api/v1/api_ingredients/active.json').then(function(response) {
        $scope.activeIngredients = response.data;
      });
    };

    $scope.toggle = function(grocery) {
      if (grocery.current_user = true) {
        return "true";
      } else {
        return "false";
      };
    };

    window.scope = $scope;
  
  });

}());