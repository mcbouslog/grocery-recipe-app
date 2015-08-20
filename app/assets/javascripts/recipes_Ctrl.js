(function() {
  "use strict";

  angular.module("app").controller("recipesCtrl", function($scope, $http) {

    $scope.setup = function() {
      $http.get('/api/v1/api_ingredients/active.json').then(function(ingredientResponse) {
        $scope.user = ingredientResponse.data.user;
        if ($scope.user.user_id === false && localStorage.getItem('unregUser')) {
          $scope.groceries = JSON.parse(localStorage.getItem('lsGroceries'));
          $scope.activeIngredients = JSON.parse(localStorage.getItem('lsActiveIngredients'));
          $scope.allOptionBuild($scope.groceries, $scope.activeIngredients);
        } else {
          $scope.activeIngredients = ingredientResponse.data.active_ingredients;
          $http.get('/api/v1/api_groceries.json').then(function(groceryResponse) {
            $scope.groceries = groceryResponse.data;
            $scope.allOptionBuild($scope.groceries, $scope.activeIngredients);
          });
          $http.get('/api/v1/api_searches/min_fav_recipes.json').then(function(favResponse) {
            $scope.favoriteRecipes = favResponse.data;
          });
        };
      });
    };

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
              if ($scope.cuisines.indexOf(matches[att].attributes.cuisine[cuis],0) == -1) {
                $scope.cuisines.push(matches[att].attributes.cuisine[cuis]);
              };
            };
          };
          if (matches[att].attributes.course !== undefined) {
            for (var cour = 0; cour < matches[att].attributes.course.length; cour++) {
              if ($scope.courses.indexOf(matches[att].attributes.course[cour],0) == -1) {
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
        var sum = 0;
        var average = 0;
        for (var m = 0; m < array.length; m++) {
          sum = sum + array[m];
          average = sum / array.length;
        }; 
        return average;
      };          
      $scope.matchScore = ($scope.multiply($scope.scoreArray) * 100).toFixed(0);
      return $scope.matchScore;
    };
    
    $scope.matchFavoriteCheck = function(match) {
      if ($scope.user.user_id !== false) {
        for (var fav = 0; fav < $scope.favoriteRecipes.length; fav++) {
          if (match.id === $scope.favoriteRecipes[fav]) {
            return "fa fa-heart red";
          };
        };
        return "fa fa-heart-o red";
      };
    };
    
    $scope.matchTime = function(match) {
        $scope.matchMinutes = match.totalTimeInSeconds / 60;
        return $scope.matchMinutes;
      };
    $scope.matchAttributes = function(matches) {
      for (var n = 0; n < matches.length; n++) {
        matches[n].unMatchIngCount = $scope.matchCount(matches[n]);
        matches[n].matchScore = parseInt($scope.matchScoreCalc(matches[n]));
        matches[n].favoriteStatus = $scope.matchFavoriteCheck(matches[n]);
      };
    };
    // *** MATCH ATTRIBUTES END ***

    // *** INGREDIENT MODAL STARTS ***
    $scope.modalInfo = function(match) {
      $scope.modalIngredients = match.ingredients;
      for (var modalIngs = 0; modalIngs < match.ingredients.length; modalIngs++) {
        if ($scope.itemMatch(match.ingredients[modalIngs], $scope.activeIngredients) === false) {
          var modalIngredient = {
            description: match.ingredients[modalIngs],
            shop_list: false,
            current_user: false,
            ingredients: [match.ingredients[modalIngs]]
          };
          $scope.activeIngredients.push(modalIngredient);
        };
      };
    };
    $scope.saveShopList = function() {
      var shopListIngredients = {
        shop_list_ingredients: [],
        user_id: $scope.user.user_id
      };
      for (var sling = 0; sling < $scope.activeIngredients.length; sling++) {
        if ($scope.activeIngredients[sling].shop_list === true) {
          shopListIngredients.shop_list_ingredients.push($scope.activeIngredients[sling].description);
        };
      };
      $http.post('/api/v1/api_ingredients/shop_list', shopListIngredients).then(function(response) {
      });
      var shopListGroceries = {
        shop_list_groceries: [],
        user_id: $scope.user.user_id
      };
      for (var slgroc = 0; slgroc < $scope.groceries.length; slgroc++) {
        if ($scope.groceries[slgroc].shop_list === true) {
          shopListGroceries.shop_list_groceries.push($scope.groceries[slgroc].id);
        };
      };
      $http.post('/api/v1/api_groceries/shop_list', shopListGroceries).then(function(response) {
      });
    };
    // *** INGREDIENT MODAL ENDS ***

    // *** RECIPE MODAL STARTS ***
    $scope.modalRecipe = function(match) {
      $scope.recipeName = match.recipeName;
      var recipeIdHash = {};
      recipeIdHash.recipeId = match.id;
      $http.post('/api/v1/api_searches/recipe.json',recipeIdHash).then(function(recipeResponse) {
        $scope.recipe = recipeResponse["data"];
        $scope.recipeAttribution = $scope.recipe.attribution.html;
        $scope.recipeSourceUrl = $scope.recipe.source.sourceRecipeUrl;
        $scope.recipeIngs = $scope.recipe.ingredientLines;
        $scope.recipe.favoriteStatus = match.favoriteStatus;
      });
    };
    // *** RECIPE MODALS ENDS ***

    $scope.changeFavorite = function(match) {
      if (match.favoriteStatus === "fa fa-heart-o red") {
        var favoriteIdHash = {
          fav_recipe_id: match.id,
          fav_action: "create",
          user_id: $scope.user.user_id
        };
        $http.post('/api/v1/api_searches/favorite_recipes.json',favoriteIdHash).then(function(response) {
          match.favoriteStatus = "fa fa-heart red";
          return;
        });
      };
      if (match.favoriteStatus === "fa fa-heart red") {
        var favoriteIdHash = {
          fav_recipe_id: match.id,
          fav_action: "destroy",
          user_id: $scope.user.user_id
        };
        $http.post('/api/v1/api_searches/favorite_recipes.json',favoriteIdHash).then(function(response) {
          match.favoriteStatus = "fa fa-heart-o red";
          return;
        });
      };
    };

    $scope.changeRecipeFavorite = function(recipe) {
      for (var recFav = 0; recFav < $scope.matches.length; recFav++) {
        if (recipe.id === $scope.matches[recFav].id) {
          $scope.changeFavorite($scope.matches[recFav]);
        };
      };
      if (recipe.favoriteStatus === "fa fa-heart-o red") {
        recipe.favoriteStatus = "fa fa-heart red";
        return;
      };
      if (recipe.favoriteStatus === "fa fa-heart red") {
        recipe.favoriteStatus = "fa fa-heart-o red";
        return;
      };
    };

    window.scope = $scope;
  
  });

}());