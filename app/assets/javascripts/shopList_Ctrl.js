(function() {
  "use strict";

  angular.module("app").controller("shopListCtrl", function($scope, $http) {

    $scope.setup = function() {
      $http.get('/api/v1/api_groceries/minimal.json').then(function(response) {
        $scope.groceries = response.data;
      });
      $http.get('/api/v1/api_ingredients/active.json').then(function(response) {
        $scope.activeIngredients = response.data.active_ingredients;
        $scope.user = response.data.user;
      });
    };

    $scope.shopToStock = function() {
      for (var i = 0; i < $scope.groceries.length; i++) {
        if ($scope.groceries[i].shop_list) {
          $scope.groceries[i].current_user = true;
        };
      };
      for (var j = 0; j < $scope.activeIngredients.length; j++) {
        if ($scope.activeIngredients[j].shop_list) {
          $scope.activeIngredients[j].current_user = true;
        };
      };
    };

    $scope.shopClear = function () {
      for (var k = 0; k < $scope.groceries.length; k++) {
        if ($scope.groceries[k].shop_list) {
          $scope.groceries[k].shop_list = false;
        };
      };
      for (var l = 0; l < $scope.activeIngredients.length; l++) {
        if ($scope.activeIngredients[l].shop_list) {
          $scope.activeIngredients[l].shop_list = false;
        };
      };
    };

    $scope.saveList = function() {
      var userGroceries = {
        user_groceries: [],
        user_id: $scope.user.user_id
      };
      for (var m = 0; m < $scope.groceries.length; m++) {
        if ($scope.groceries[m].current_user === true) {
          userGroceries.user_groceries.push($scope.groceries[m].id);
        };
      };
      $http.post('/api/v1/api_groceries', userGroceries).then(function(response) {
      });

      var userSaveIngredients = {
        user_ingredients: [],
        user_id: $scope.user.user_id
      };
      for (var n = 0; n < $scope.activeIngredients.length; n++) {
        if ($scope.activeIngredients[n].current_user === true) {
          userSaveIngredients.user_ingredients.push($scope.activeIngredients[n].description);
        };
      };
      $http.post('/api/v1/api_ingredients', userSaveIngredients).then(function(response) {
      });
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

    window.scope = $scope;
  
  });

}());