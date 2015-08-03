(function() {
  "use strict";

  angular.module("app").controller("recipesCtrl", function($scope, $http) {

    $scope.setup = function() {
      $http.get('/api/v1/api_groceries.json').then(function(response) {
        $scope.groceries = response.data;
        $http.get('/api/v1/api_ingredients/recipe_search.json').then(function(response) {
          $scope.activeIngredients = response.data;
          $scope.allOptions = [];
          for (var i = 0; i < $scope.activeIngredients.length; i++) {
            $scope.activeIngredients[i].ingredients = [$scope.activeIngredients[i].description];
            $scope.allOptions.push($scope.activeIngredients[i]);
          };
          for (var j = 0; j < $scope.groceries.length; j++) {
            $scope.allOptions.push($scope.groceries[j]);
          };
          $scope.showResults = false;
        });
      });
    };

    $scope.recipeSearch = function(optionOne, optionTwo, optionThree, searchTerm) {
      $scope.showResults = true;

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
      $http.post('/api/v1/api_searches.json', searchStringHash).then(function(response) {          
        $scope.searchResults = response.data;
        $scope.attribution = $scope.searchResults.attribution.html;
        $scope.matches = $scope.searchResults.matches;
        // SEARCH ENDS ******

        $scope.itemMatch = function(ingredient) {
          for (var allOpt = 0; allOpt < $scope.allOptions.length; allOpt++) {
            for (var optIng = 0; optIng < $scope.allOptions[allOpt].ingredients.length; optIng++) {
              if (ingredient === $scope.allOptions[allOpt].ingredients[optIng]) {
                $scope.item = $scope.allOptions[allOpt];
              };
            };
          };
          return $scope.item;
        };

        // FILTERS START ******
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
        $scope.filterCuisineCourse($scope.matches);

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
        // FILTERS END ******

        // MATCH ATTRIBUTES START******
        
        $scope.matchTime = function(match) {
          $scope.matchMinutes = match.totalTimeInSeconds / 60;
          return $scope.matchMinutes;
        };

        $scope.matchCount = function(match) {
          $scope.matchIngCount = 0;
          for (var k = 0; k < match.ingredients.length; k++) {
            if ($scope.itemMatch(match.ingredients[k]).current_user) {
              $scope.matchIngCount++;
            };
          };
          $scope.unMatchIngCount = match.ingredients.length - $scope.matchIngCount;
          return $scope.unMatchIngCount;
        };

        $scope.matchScoreCalc = function(match) {
          $scope.scoreArray = [];
          for (var l = 0; l < match.ingredients.length; l++) {
            if ($scope.itemMatch(match.ingredients[l]).current_user) {
              $scope.scoreArray.push(1);
            } else if ($scope.itemMatch(match.ingredients[l]).score_factor) {
              $scope.scoreArray.push(parseFloat($scope.itemMatch(match.ingredients[l]).score_factor));
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

        $scope.matchAttributes = function(matches) {
          for (var n = 0; n < matches.length; n++) {
            matches[n].unMatchIngCount = $scope.matchCount(matches[n]);
            matches[n].matchScore = parseInt($scope.matchScoreCalc(matches[n]));
          };
        };
        $scope.matchAttributes($scope.matches);

        // MATCH ATTRIBUTES END ******
      });
      // API-SEARCH THEN ENDS******
    };

    // MODAL STARTS******
    $scope.modalInfo = function(match) {
      $scope.modalIngredients = match.ingredients;
    };

    $scope.modalFormat = function(item) {
      if ($scope.ingredients[item]) {
        if ($scope.ingredients[item].current_user) {
          return true;
        };
      } else if ($scope.groceries[item]) {
        if ($scope.groceries[item].current_user) {
          return true;
        };
      } else {
        return false;
      };
    };
    // MODAL ENDS******

    window.scope = $scope;
  
  });

}());