(function() {
  "use strict";

  angular.module("app").controller("recipesCtrl", function($scope, $http) {

    $scope.setup = function() {
      $scope.allOptions = [];
      $http.get('/api/v1/api_ingredients/recipe_search.json').then(function(ingredientResponse) {
        $scope.activeIngredients = ingredientResponse.data;
        for (var i = 0; i < $scope.activeIngredients.length; i++) {
          $scope.activeIngredients[i].ingredients = [$scope.activeIngredients[i].description];
          $scope.allOptions.push($scope.activeIngredients[i]);
        };
      });
      $http.get('/api/v1/api_groceries.json').then(function(groceryResponse) {
        $scope.groceries = groceryResponse.data;
        for (var j = 0; j < $scope.groceries.length; j++) {
          $scope.allOptions.push($scope.groceries[j]);
        };  
      });
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

      $http.post('/api/v1/api_searches.json',searchQuery).then(function(matchResponse) {          
        $scope.searchResults = matchResponse.data;
        $scope.attribution = $scope.searchResults.attribution.html;
        $scope.matches = $scope.searchResults.matches;
        $scope.matchAttributes($scope.matches);
        $scope.filterCuisineCourse($scope.matches);
      });
    };

    $scope.itemMatch = function(ingredient, array) {
      for (var arrayItem = 0; arrayItem < array.length; arrayItem++) {
        for (var itemIng = 0; itemIng < array[arrayItem].ingredients.length; itemIng++) {
          if (ingredient === array[arrayItem].ingredients[itemIng]) {
            return array[arrayItem];
          };
        };
      };
      return false;
    };

    // *** FILTERS START ***
    $scope.filterTimeOption = {
      filterTimeValue: false
    };
    $scope.filterTime = function(entry) {
      if($scope.filterTimeOption.filterTimeValue) {
        return (entry.totalTimeInSeconds <= parseInt($scope.filterTimeOption.filterTimeValue)) ? true: false;
      };          
      return true;
    };
    $scope.filterScoreOption = {
      filterScoreValue: false
    };
    $scope.filterScore = function(entry) {
      if($scope.filterScoreOption.filterScoreValue) {
        return (entry.matchScore >= parseInt($scope.filterScoreOption.filterScoreValue)) ? true: false;
      };          
      return true;
    };
    $scope.filterUnIngOption = {
      filterUnIngValue: false
    };
    $scope.filterUnIng = function(entry) {
      if($scope.filterUnIngOption.filterUnIngValue) {
        return (entry.unMatchIngCount <= parseInt($scope.filterUnIngOption.filterUnIngValue)) ? true: false;
      };          
      return true;
    };    
    $scope.filterRatingOption = {
      filterRatingValue: false
    };
    $scope.filterRating = function(entry) {
      if($scope.filterRatingOption.filterRatingValue) {
        return (entry.rating >= parseInt($scope.filterRatingOption.filterRatingValue)) ? true: false;
      };          
      return true;
    };
    $scope.filterCuisineCourse = function(matches) {        
      $scope.cuisines = [];
      $scope.courses = [];          
      for (var att = 0; att < matches.length; att++) {
        if (matches[att].attributes !== undefined) {
          if (matches[att].attributes.cuisine !== undefined) {
            for (var cuis = 0; cuis < matches[att].attributes.cuisine.length; cuis++) {
              if ($scope.cuisines.indexOf(matches[att].attributes.cuisine[cuis]) == -1) {
                $scope.cuisines.push(matches[att].attributes.cuisine[cuis]);
              };
            };
          };
          if (matches[att].attributes.course !== undefined) {
            for (var cour = 0; cour < matches[att].attributes.course.length; cour++) {
              if ($scope.courses.indexOf(matches[att].attributes.course[cour]) == -1) {
                $scope.courses.push(matches[att].attributes.course[cour]);
              };
            };
          };
        };
      };
    };  
    // *** FILTERS END ***

    // *** MATCH ATTRIBUTES START ***
    $scope.matchCount = function(match) {
      $scope.matchIngCount = 0;
      for (var k = 0; k < match.ingredients.length; k++) {
        if ($scope.itemMatch(match.ingredients[k], $scope.allOptions).current_user) {
          $scope.matchIngCount++;
        };
      };
      $scope.unMatchIngCount = match.ingredients.length - $scope.matchIngCount;
      return $scope.unMatchIngCount;
    };
    $scope.matchScoreCalc = function(match) {
      $scope.scoreArray = [];
      for (var l = 0; l < match.ingredients.length; l++) {
        if ($scope.itemMatch(match.ingredients[l], $scope.allOptions).current_user) {
          $scope.scoreArray.push(1);
        } else if ($scope.itemMatch(match.ingredients[l], $scope.groceries)) {
          $scope.scoreArray.push(parseFloat($scope.itemMatch(match.ingredients[l], $scope.groceries).score_factor));
        } else {
          $scope.scoreArray.push(0.75);
        };
      };          
      $scope.multiply = function(array) {
        var sum = 1;
        for (var m = 0; m < array.length; m++) {
          sum = sum * array[m];
        }; 
        return sum;
      };          
      $scope.matchScore = ($scope.multiply($scope.scoreArray) * 100).toFixed(0);
      return $scope.matchScore;
    };
    $scope.matchTime = function(match) {
        $scope.matchMinutes = match.totalTimeInSeconds / 60;
        return $scope.matchMinutes;
      };
    $scope.matchAttributes = function(matches) {
      for (var n = 0; n < matches.length; n++) {
        matches[n].unMatchIngCount = $scope.matchCount(matches[n]);
        matches[n].matchScore = parseInt($scope.matchScoreCalc(matches[n]));
      };
    };
    // *** MATCH ATTRIBUTES END ***

    // *** MODALS STARTS ***
    $scope.modalInfo = function(match) {
      $scope.modalIngredients = match.ingredients;
    };
    $scope.modalRecipe = function(match) {
      $scope.recipeName = match.recipeName;
      var recipeIdHash = {};
      recipeIdHash.recipeId = match.id;
      console.log(recipeIdHash);
      $http.post('/api/v1/api_searches/recipe.json',recipeIdHash).then(function(recipeResponse) {
        $scope.recipe = recipeResponse["data"];
        $scope.recipeIngs = $scope.recipe.ingredientLines;
      });
    };
    // *** MODALS ENDS ***

    window.scope = $scope;
  
  });

}());