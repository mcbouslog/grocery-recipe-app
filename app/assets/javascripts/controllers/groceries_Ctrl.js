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

    $scope.save = function() {
      var userGroceries = {
        user_groceries: $scope.groceries.filter(function(g) {return g.current_user;}).map(function(g) {return g.id}),
        user_id: $scope.user.user_id
      };
      Groceries.create(userGroceries);
      var userSaveIngredients = {
        user_ingredients: $scope.userIngredients.filter(function(i) {return i.current_user}).map(function(i) {return i.description}),
        user_id: $scope.user.user_id
      };
      Ingredients.create(userSaveIngredients);
    };

    $scope.addIngredient = function(ingredient) {
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
