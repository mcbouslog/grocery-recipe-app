(function() {
  "use strict";

  angular.module("app").controller("recipesCtrl", function($scope, $http) {

    $scope.setup = function() {
      $http.get('/api/v1/api_groceries.json').then(function(response) {
        
        $scope.groceries = response.data;

        $scope.userIngredients = {};
        for (var i = 0; i < $scope.groceries.length; i++) {
          if ($scope.groceries[i].current_user === true) {
            for (var j = 0; j < $scope.groceries[i].ingredients.length; j++) {
              $scope.userIngredients[$scope.groceries[i].ingredients[j].ingredient_description] = $scope.groceries[i].description;
            };
          };
        };

        console.log($scope.userIngredients);

      });
    };

    $scope.recipeSearch = function(ingredientOne, ingredientTwo, ingredientThree, searchTerm) {

      var searchStringVar = "";

      if (ingredientOne !== undefined && ingredientOne.length !== 0) {
        searchStringVar = searchStringVar.concat(ingredientOne);
      };
      if (ingredientTwo !== undefined && ingredientTwo.length !== 0) {
        searchStringVar = searchStringVar.concat("+",ingredientTwo);
      };
      if (ingredientThree !== undefined && ingredientThree.length !== 0) {
        searchStringVar = searchStringVar.concat("+",ingredientThree);
      };
      if (searchTerm !== undefined && searchTerm.length !== 0) {
        searchStringVar = searchStringVar.concat("+",searchTerm);
      };
      
      var searchStringHash = {
        searchString: searchStringVar.replace(/ /g,"+")
      };

      $http.post('/api/v1/api_searches.json', searchStringHash).then(function(response) {
          
          $scope.searchResults = response.data;
          
          $scope.matches = $scope.searchResults["matches"];

          $scope.matchCount = function(match) {
            $scope.matchIngCount = 0;
            for (var k = 0; k < match["ingredients"].length; k++) {
              if ($scope.userIngredients[match["ingredients"][k]]) {
                $scope.matchIngCount++;
              };
            };
            $scope.unMatchIngCount = match["ingredients"].length - $scope.matchIngCount;
            return $scope.unMatchIngCount;
            console.log(match["ingredients"]);
            console.log($scope.userIngredients);
          };

      });

    };

    window.scope = $scope;
  
  });

}());