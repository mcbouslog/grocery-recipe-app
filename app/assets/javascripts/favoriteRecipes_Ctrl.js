(function() {
  "use strict";

  angular.module("app").controller("favoriteRecipesCtrl", function($scope, $http) {

    $scope.setup = function() {
      $http.get('/api/v1/api_searches/favorite_recipes.json').then(function(response) {
        $scope.favoriteRecipes = response.data;
      });

    };

    window.scope = $scope;
  
  });

}());