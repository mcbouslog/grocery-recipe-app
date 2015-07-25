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

      console.log(searchStringHash);

      $http.post('/recipes/search.json', searchStringHash).then(function(response) {
          $scope.searchResult = response.data;
      });

      console.log($scope.searchResult);

    };

    window.scope = $scope;
  
  });

}());