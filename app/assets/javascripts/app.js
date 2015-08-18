(function() {
  "use strict";

  angular
    .module("app", ['ngSanitize']);

    // .factory('store',['$window', function($window){
    //   return {
    //     setLocal: function( key, value ){
    //       try{
    //         if( $window.Storage ){
    //           $window.localStorage.setItem(key, value);
    //           return true;
    //         } else {
    //           return false;
    //         }
    //       } catch( error ){
    //         console.error( error, error.message );
    //       }
    //     },
    //     getLocal: function( key ){
    //       try{
    //         if( $window.Storage ){
    //           return $window.localStorage.setItem( key );
    //         } else {
    //           return false;
    //         }
    //       } catch( error ){
    //         console.error( error, error.message );
    //       }
    //     },
    //   };
    // }]);

}());