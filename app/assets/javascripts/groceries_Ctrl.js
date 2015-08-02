(function() {
  "use strict";

  angular.module("app").controller("groceriesCtrl", function($scope, $http) {

    $scope.setup = function() {
      $http.get('/api/v1/api_groceries.json').then(function(response) {
        $scope.groceries = response.data;
      });
      $http.get('/api/v1/api_ingredients/user_ingredients.json').then(function(response) {
        $scope.userIngredients = response.data;
      });
      $http.get('/api/v1/api_ingredients/search.json').then(function(response) {
        $scope.searchIngredients = response.data;
      });
    };

    $scope.save = function() {
      var userGroceries = {
        user_groceries: []
      };
      for (var i = 0; i < $scope.groceries.length; i++) {
        if ($scope.groceries[i].current_user === true) {
          userGroceries.user_groceries.push($scope.groceries[i].id);
        };
      };
      $http.post('/api/v1/api_groceries', userGroceries).then(function(response) {
      });
    };

    $scope.add = function(ingredient) {
      
    };

    window.scope = $scope;
  
  });

}());