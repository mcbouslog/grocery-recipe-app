(function() {
  "use strict";

  angular.module("app").controller("recipesCtrl", function($scope, $http) {

    $scope.setup = function() {
      $http.get('/api/v1/api_groceries.json').then(function(response) {
        $scope.groceries = response.data;
      });
    };

    $scope.recipeSearch = function(ingredientOne, ingredientTwo, ingredientThree, searchTerm) {

      var searchStringVar = ""

      if (ingredientOne !== undefined && ingredientOne.length !== 0) {
        searchStringVar = searchStringVar.concat(ingredientOne);
      }
      if (ingredientTwo !== undefined && ingredientTwo.length !== 0) {
        searchStringVar = searchStringVar.concat("+",ingredientTwo);
      }
      if (ingredientThree !== undefined && ingredientThree.length !== 0) {
        searchStringVar = searchStringVar.concat("+",ingredientThree);
      }
      if (searchTerm !== undefined && searchTerm.length !== 0) {
        searchStringVar = searchStringVar.concat("+",searchTerm);
      };
      
      var searchStringHash = {
        searchString: searchStringVar.replace(/ /g,"+")
      };

      $http.get('/recipes/search', searchStringHash);

      console.log(searchStringHash);

    };

    window.scope = $scope;
  
  });

}());