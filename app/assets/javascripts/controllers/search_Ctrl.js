(function() {
  "use strict";

  angular.module("app").controller("searchCtrl", function(Groceries, Ingredients, RecipeSearches, $scope, $location, $anchorScroll) {

    Groceries.all().success(function(data) {
      $scope.groceries = data;
      Ingredients.find().success(function(data) {
	      $scope.activeIngredients = data.active_ingredients;
	      $scope.user = data.user;
	      $scope.allOptionBuild($scope.groceries, $scope.activeIngredients);
	    });
    });
    
    $scope.allOptionBuild = function(groceries, activeIngredients) {
      $scope.allOptions = [];
      for (var i = 0; i < activeIngredients.length; i++) {
        activeIngredients[i].ingredients = [activeIngredients[i].description];
        activeIngredients[i].recipeVisible = false;
        $scope.allOptions.push(activeIngredients[i]);
      };  
      for (var j = 0; j < groceries.length; j++) {
        $scope.allOptions.push(groceries[j]);
      };
    };

    $scope.searchStringify = function(optionOne, optionTwo, optionThree, searchTerm) {
      var searchStringVar = "";
      if (optionOne !== undefined && optionOne.length !== 0) {
        searchStringVar = searchStringVar.concat(optionOne);
      };
      if (optionTwo !== undefined && optionTwo.length !== 0) {
        searchStringVar = searchStringVar.concat("+",optionTwo);
      };
      if (optionThree !== undefined && optionThree.length !== 0) {
        searchStringVar = searchStringVar.concat("+",optionThree);
      };
      if (searchTerm !== undefined && searchTerm.length !== 0) {
        searchStringVar = searchStringVar.concat("+",searchTerm);
      };      
      var searchStringHash = {
        searchString: searchStringVar.replace(/ /g,"+")
      };
      return searchStringHash;
    };

    $scope.recipeSearch = function(optionOne, optionTwo, optionThree, searchTerm) {
      $scope.showResults = true;

      var searchQuery = $scope.searchStringify(optionOne, optionTwo, optionThree, searchTerm);

      RecipeSearches.create(searchQuery).success(function(matchResponse) {
				$scope.searchResults = matchResponse.data;
        $scope.attribution = $scope.searchResults.attribution.html;
        $scope.matches = $scope.searchResults.matches;
        $scope.matchAttributes($scope.matches);
        $scope.filterCuisineCourse($scope.matches);
      });
    };

    $scope.gotoResults = function() {
      $location.hash('results');
      $anchorScroll();
    };

    window.scope = $scope;
  
  });

}());