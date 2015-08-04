(function() {
  "use strict";

  angular.module("app").controller("groceriesCtrl", function($scope, $http) {

    $scope.setup = function() {
      $http.get('/api/v1/api_groceries/minimal.json').then(function(response) {
        $scope.groceries = response.data;
      });
      $http.get('/api/v1/api_ingredients/active.json').then(function(response) {
        $scope.userIngredients = response.data;
      });      
      $http.get('/api/v1/api_ingredients/search_all.json').then(function(response) {
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

      var userSaveIngredients = {
        user_ingredients: []
      };
      for (var j = 0; j < $scope.userIngredients.length; j++) {
        if ($scope.userIngredients[j].current_user === true) {
          userSaveIngredients.user_ingredients.push($scope.userIngredients[j].description);
        };
      };
      $http.post('/api/v1/api_ingredients', userSaveIngredients).then(function(response) {
      });
    };

    $scope.add = function(ingredient) {
      $scope.userIngredients.push({
        description: ingredient,
        current_user: true
      });
      $scope.searchIngredient = null;
    };

    window.scope = $scope;
  
  });

}());