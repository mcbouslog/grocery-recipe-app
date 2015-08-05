(function() {
  "use strict";

  angular.module("app").controller("favoriteRecipesCtrl", function($scope, $http) {

    $scope.setup = function() {
      $scope.allOptions = [];
      $http.get('/api/v1/api_searches/favorite_recipes.json').then(function(response) {
        $scope.favoriteRecipes = response.data;
        $scope.recipeAttributes($scope.favoriteRecipes);
        $scope.filterCuisineCourse($scope.favoriteRecipes);
      });
      $http.get('/api/v1/api_ingredients/active.json').then(function(ingredientResponse) {
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
    $scope.filterCuisineCourse = function(favoriteRecipes) {        
      $scope.cuisines = [];
      $scope.courses = [];          
      for (var att = 0; att < favoriteRecipes.length; att++) {
        if (favoriteRecipes[att].attributes !== undefined) {
          if (favoriteRecipes[att].attributes.cuisine !== undefined) {
            for (var cuis = 0; cuis < favoriteRecipes[att].attributes.cuisine.length; cuis++) {
              if ($scope.cuisines.indexOf(favoriteRecipes[att].attributes.cuisine[cuis],0) == -1) {
                $scope.cuisines.push(favoriteRecipes[att].attributes.cuisine[cuis]);
              };
            };
          };
          if (favoriteRecipes[att].attributes.course !== undefined) {
            for (var cour = 0; cour < favoriteRecipes[att].attributes.course.length; cour++) {
              if ($scope.courses.indexOf(favoriteRecipes[att].attributes.course[cour],0) == -1) {
                $scope.courses.push(favoriteRecipes[att].attributes.course[cour]);
              };
            };
          };
        };
      };
    };  
    // *** FILTERS END ***

    // *** MATCH ATTRIBUTES START ***
    // $scope.matchCount = function(recipe) {
    //   $scope.matchIngCount = 0;
    //   for (var k = 0; k < match.ingredients.length; k++) {
    //     if ($scope.itemMatch(match.ingredients[k], $scope.allOptions).current_user) {
    //       $scope.matchIngCount++;
    //     };
    //   };
    //   $scope.unMatchIngCount = match.ingredients.length - $scope.matchIngCount;
    //   return $scope.unMatchIngCount;
    // };
    // $scope.matchScoreCalc = function(match) {
    //   $scope.scoreArray = [];
    //   for (var l = 0; l < match.ingredients.length; l++) {
    //     if ($scope.itemMatch(match.ingredients[l], $scope.allOptions).current_user) {
    //       $scope.scoreArray.push(1);
    //     } else if ($scope.itemMatch(match.ingredients[l], $scope.groceries)) {
    //       $scope.scoreArray.push(parseFloat($scope.itemMatch(match.ingredients[l], $scope.groceries).score_factor));
    //     } else {
    //       $scope.scoreArray.push(0.75);
    //     };
    //   };          
    //   $scope.multiply = function(array) {
    //     var sum = 0;
    //     var average = 0;
    //     for (var m = 0; m < array.length; m++) {
    //       sum = sum + array[m];
    //       average = sum / array.length;
    //     }; 
    //     return average;
    //   };          
    //   $scope.matchScore = ($scope.multiply($scope.scoreArray) * 100).toFixed(0);
    //   return $scope.matchScore;
    // };
    
    $scope.recipeAttributes = function(favoriteRecipes) {
      for (var n = 0; n < favoriteRecipes.length; n++) {
        // favoriteRecipes[n].unMatchIngCount = $scope.recipeCount(favoriteRecipes[n]);
        // favoriteRecipes[n].matchScore = parseInt($scope.recipeScoreCalc(favoriteRecipes[n]));
        favoriteRecipes[n].favoriteStatus = "fa fa-heart red";
      };
    };
    // *** MATCH ATTRIBUTES END ***

    $scope.changeRecipeFavorite = function(recipe) {
      if (recipe.favoriteStatus === "fa fa-heart-o red") {
        var favoriteIdHash = {
          fav_recipe_id: recipe.id,
          fav_action: "create",
          
        };
        $http.post('/api/v1/api_searches/favorite_recipes.json',favoriteIdHash).then(function(response) {
          recipe.favoriteStatus = "fa fa-heart red";
          return;
        });
      };
      if (recipe.favoriteStatus === "fa fa-heart red") {
        var favoriteIdHash = {
          fav_recipe_id: recipe.id,
          fav_action: "destroy"
        };
        $http.post('/api/v1/api_searches/favorite_recipes.json',favoriteIdHash).then(function(response) {
          recipe.favoriteStatus = "fa fa-heart-o red";
          return;
        });
      };
    };

    window.scope = $scope;
  
  });

}());