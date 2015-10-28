(function() {
  "use strict";

  angular.module("app").controller("groceriesCtrl", function(Groceries, Ingredients, $scope) {

    Groceries.all().success(function(data) {
      $scope.groceries = data;
    });

    Ingredients.find().success(function(data) {
      $scope.userIngredients = data.active_ingredients;
      $scope.user = data.user;
    });

    $scope.ingredientSearchAll = function() {
      Ingredients.all().success(function(data) {
        $scope.searchIngredients = data;
      });
    };

    $scope.filterCurrentUser = function(item) {
      return item.current_user;
    };

    $scope.mapId = function(item) {
      return item.id;
    };

    $scope.save = function() {
      var userGroceries = {
        user_groceries: $scope.groceries.filter($scope.filterCurrentUser).map($scope.mapId),
        user_id: $scope.user.user_id
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