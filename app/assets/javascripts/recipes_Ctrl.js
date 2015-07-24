(function() {
  "use strict";

  angular.module("app").controller("recipesCtrl", function($scope, $http) {

    $scope.setup = function() {
      $http.get("/api/v1/api_groceries.json").then(function(response) {
        $scope.groceries = response.data;
      });
    };

    $scope.recipeSearch = function(ingredientOne, ingredientTwo, ingredientThree, searchTerm) {

      var searchString = ""

      if (ingredientOne !== undefined && ingredientOne.length !== 0) {
        searchString = searchString.concat(ingredientOne);
      }
      if (ingredientTwo !== undefined && ingredientTwo.length !== 0) {
        searchString = searchString.concat("+",ingredientTwo);
      }
      if (ingredientThree !== undefined && ingredientThree.length !== 0) {
        searchString = searchString.concat("+",ingredientThree);
      }
      if (searchTerm !== undefined && searchTerm.length !== 0) {
        searchString = searchString.concat("+",searchTerm);
      };
      
      searchString = searchString.replace(/ /g,"+");

      console.log(searchString);

      $http.get("#{ENV['API_SEARCH_URL']}_app_id=#{ENV['API_ID']}&_app_key=#{ENV['API_KEY']}&q=.json", searchString).then(function(response) {
        $scope.searchResults = response.data;
      })

      console.log($scope.searchResults.length)

      searchString = null

    }

    window.scope = $scope;
  
  });

}());