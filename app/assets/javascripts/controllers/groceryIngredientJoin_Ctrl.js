(function() {
  "use strict";

  angular.module("app").controller("groceryIngredientJoinCtrl", function($scope, $http) {

    $scope.setup = function() {
      $http.get('/api/v1/api_groceries.json').then(function(response) {
        $scope.groceries = response.data;
      });

      $http.get('/api/v1/api_ingredients/join.json').then(function(response) {
        $scope.ingredients = response.data;
      });      

    };

    $scope.ingredientEdits = [];
    $scope.groceryEdits = [];

    $scope.addIngredient = function(ingredient) {
      $scope.ingredientEdits.push(ingredient);
      var ingIndex = $scope.ingredients.indexOf(ingredient);
      $scope.ingredients.splice(ingIndex, 1);
    };

    $scope.removeIngredient = function(index) {
      $scope.ingredients.push($scope.ingredientEdits[index]);
      $scope.ingredientEdits.splice(index, 1);
    };

    $scope.addGrocery = function(grocery) {
      $scope.groceryEdits.push({
        groceryId: grocery.id,
        description: grocery.description
      });
    };

    $scope.removeGrocery = function(index) {
      $scope.groceryEdits.splice(index, 1);
    };

    $scope.join = function() {
      var ingredientIds = [];
      for (var i = 0; i < $scope.ingredientEdits.length; i++) {
        ingredientIds.push($scope.ingredientEdits[i]["id"]);
      };
      
      var groceryIds = [];
      for (var j = 0; j < $scope.groceryEdits.length; j++) {
        groceryIds.push($scope.groceryEdits[j]["groceryId"]);
      };

      var joinHash = {
        ingredient_ids: ingredientIds,
        grocery_ids: groceryIds
      };
      $http.post('/grocery_ingredient_joins', joinHash).then(function(response) {
        $scope.groceryEdits = [];
        $scope.ingredientEdits = [];
      });
    };

    window.scope = $scope;
  
  });

}());