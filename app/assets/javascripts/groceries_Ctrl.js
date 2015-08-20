(function() {
  "use strict";

  angular.module("app").controller("groceriesCtrl", function($scope, $http) {

    $scope.setup = function() {
      $http.get('/api/v1/api_ingredients/search_all.json').then(function(response) {
        $scope.searchIngredients = response.data;
      });
      $http.get('/api/v1/api_ingredients/active.json').then(function(activeResponse) {
        $scope.user = activeResponse.data.user;
        if ($scope.user.user_id === false && localStorage.getItem('unregUser')) {
          $scope.groceries = JSON.parse(localStorage.getItem('lsGroceries'));
          $scope.userIngredients = JSON.parse(localStorage.getItem('lsActiveIngredients'));
        } else {
          $scope.userIngredients = activeResponse.data.active_ingredients || [];
          $http.get('/api/v1/api_groceries.json').then(function(response) {
            $scope.groceries = response.data;
          });
        };
      });
    };

    $scope.save = function() {
      if ($scope.user.user_id === false) {
        localStorage.setItem('unregUser', true);
        localStorage.setItem('lsGroceries', JSON.stringify($scope.groceries));
        localStorage.setItem('lsActiveIngredients', JSON.stringify($scope.userIngredients));
      } else {
        var userGroceries = {
          user_groceries: [],
          user_id: $scope.user.user_id
        };
        for (var i = 0; i < $scope.groceries.length; i++) {
          if ($scope.groceries[i].current_user === true) {
            userGroceries.user_groceries.push($scope.groceries[i].id);
          };
        };
        $http.post('/api/v1/api_groceries', userGroceries).then(function(response) {
        });

        var userSaveIngredients = {
          user_ingredients: [],
          user_id: $scope.user.user_id
        };
        for (var j = 0; j < $scope.userIngredients.length; j++) {
          if ($scope.userIngredients[j].current_user === true) {
            userSaveIngredients.user_ingredients.push($scope.userIngredients[j].description);
          };
        };
        $http.post('/api/v1/api_ingredients', userSaveIngredients).then(function(response) {
        });
      };
    };

    $scope.add = function(ingredient) {
      $scope.userIngredients.push({
        description: ingredient,
        current_user: true,
        groceries: [],
        id: undefined,
        shop_list: false
      });
      $scope.searchIngredient = null;
    };

    window.scope = $scope;
  
  });

}());